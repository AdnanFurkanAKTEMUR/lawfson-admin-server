import { Context } from "@contextTypes/contextTypes";
import { Category } from "@entities/Category";

const CategoryResolver = {
  Query: {
    getCategory: async (_parent: any, args: any, _context: Context, _info: any): Promise<Category | null> => {
      const { id } = args.input;
      try {
        const category = await Category.findOne({
          where: { id },
          relations: ["products"],
        });
        return category;
      } catch (e) {
        throw new Error(e);
      }
    },
    getCategoryWithSubcategories: async (_parent: any, args: any, _context: Context, _info: any): Promise<Category | null> => {
      const { id } = args.input;

      try {
        const category = await Category.findOne({
          where: { id: id },
          relations: ["subcategories", "subcategories.products", "products"],
        });
        return category;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
  Mutation: {
    createCategory: async (_parent: any, args: any, _context: Context, _info: any): Promise<Category | null> => {
      const { categoryName, parentCategoryId } = args.input;
      try {
        let parentCategory = null;
        if (parentCategoryId) {
          parentCategory = await Category.findOne({ where: { id: parentCategoryId } });
        }
        const newCategory = Category.create({
          categoryName: categoryName,
        });

        if (parentCategory) {
          newCategory.parentCategory = parentCategory;
        }
        await newCategory.save();
        return newCategory;
      } catch (e) {
        throw new Error(e);
      }
    },
    updateCategory: async (_parent: any, args: any, _context: Context, _info: any): Promise<Category | null> => {
      const { id, categoryName, parentCategoryId } = args.input;
      try {
        let parentCategory = null;
        if (parentCategoryId) {
          parentCategory = await Category.findOne({ where: { id: parentCategoryId } });
        }
        const category = await Category.findOne({ where: { id: id } });
        if (!category) throw new Error("cannot find category");
        if (categoryName) {
          category.categoryName = categoryName;
        }
        if (parentCategory) {
          category.parentCategory = parentCategory;
        }
        await category.save();
        return category;
      } catch (e) {
        throw new Error(e);
      }
    },
    deleteCategory: async (_parent: any, args: any, _context: Context, _info: any) => {
      const { id } = args.input;
      try {
        const category = await Category.findOne({ where: { id: id }, relations: ["subcategories", "products"] });
        if (!category) throw new Error("cannot find category");
        if (category.subcategories && category.subcategories.length > 0) {
          throw new Error("Bu kategori alt kategorilere sahip olduğu için silinemez");
        }

        if (category.products && category.products.length > 0) {
          throw new Error("Bu kategori ürünlere sahip olduğu için silinemez");
        }
        await Category.remove(category);
        return { msg: "Kategori silindi!", status: true };
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};

export default CategoryResolver;
