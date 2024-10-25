import { Context } from "@contextTypes/contextTypes";
import { Category } from "@entities/Category";
import { IsNull } from "typeorm";
import { categoryLeafs } from "./categoryReady";

const CategoryResolver = {
  Query: {
    categoryGetAll: async (_parent: any, _args: any, _context: Context, _info: any): Promise<Category[] | null> => {
      try {
        const cats = await Category.find();
        return cats;
      } catch (e) {
        throw new Error(e);
      }
    },
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
    categoryLeafs: async (_parent: any, _args: any, context: Context, _info: any) => {
      const { user } = context;
      console.log(user);
      // kategori eklenmesi extreme bir durum olduğu için her sorguda dbyi yormaya gerek yok.
      //bi kere çalıştırılıp sonuç alınıp artık her defasında o sonuç dönecek
      //yeni kategori eklendiğinde yorum satırları kaldırılıp sonuç alınıp o sonuç categoryReady yapıştıralacak 
      //eskisi silinecek
      // sonra tekrar yorum satırı ordan almaya devam
      try {
        // const categories = await Category.find({
        //   relations: ["parentCategory", "subcategories"],
        // });

        // // Sadece en alt seviyedeki kategorileri filtrele
        // const leafCategories = categories.filter((category) => !category.subcategories || category.subcategories.length === 0);

        // const addFullCategoryName = async (category: Category): Promise<string> => {
        //   let name = category.categoryName;
        //   let parent = category.parentCategory;

        //   // Parent bilgilerini alana kadar döngüde ilerleyin
        //   while (parent) {
        //     name = `${parent.categoryName} / ${name}`;

        //     // Her bir parent kategori için ilişkiyi yeniden yükleyin ve await ifadesini doğru şekilde kullanın
        //     const parentCategoryData = await Category.findOne({
        //       where: { id: parent.id },
        //       relations: ["parentCategory"],
        //     });

        //     // Yeni parent kategori bilgisine geç
        //     parent = parentCategoryData ? parentCategoryData.parentCategory : undefined;
        //   }
        //   return name;
        // };

        // // Her bir en alt kategoriye `fullPathName` ekle
        // const result = await Promise.all(
        //   leafCategories.map(async (category) => {
        //     return {
        //       ...category,
        //       fullPathName: await addFullCategoryName(category),
        //     };
        //   })
        // );
        // return result
        return categoryLeafs;
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
    getAllCategoryTree: async (_parent: any, _args: any, _context: Context, _info: any): Promise<Category[] | null> => {
      try {
        const categoryTree = await Category.find({
          where: { parentCategory: IsNull() },
          relations: ["subcategories", "subcategories.subcategories", "subcategories.subcategories.subcategories", "subcategories.subcategories.subcategories.subcategories"],
        });
        if (!categoryTree) {
          throw new Error("No category found");
        }

        return categoryTree;
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
