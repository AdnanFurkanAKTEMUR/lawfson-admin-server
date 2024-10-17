import { Context } from "@contextTypes/contextTypes";
import { Category } from "@entities/Category";
import { Product } from "@entities/Product";
import getAllSubcategoryIds from "@helpers/getSubcategoriesIds";
import { In } from "typeorm";

const ProductResolver = {
  Query: {
    getProduct: async (_parent: any, args: any, context: Context, _info: any): Promise<Product | null> => {
      const { id } = args.input;
      const { user } = context;
      console.log(user, "user");
      try {
        const product = await Product.findOne({
          where: { id },
          relations: ["category"],
        });
        return product;
      } catch (e) {
        throw new Error(e);
      }
    },
    getProductOfCategory: async (_parent: any, args: any, _context: Context, _info: any): Promise<Product[] | null> => {
      const { categoryId } = args.input;
      try {
        const category = await Category.findOne({
          where: { id: categoryId },
          relations: ["subcategories", "subcategories.subcategories"],
        });
        if (!category) {
          throw new Error("Category not found");
        }
        const categoryIds = getAllSubcategoryIds(category);
        const products = await Product.find({
          where: {
            category: In(categoryIds),
          },
        });
        return products;
      } catch (e) {
        throw new Error(e);
      }
    },
    productsOfCompany: async (_parent: any, args: any, _context: Context, _info: any): Promise<Product[] | null> => {
      const { companyId } = args.input;
      try {
        const products = await Product.find({ where: { company: companyId } });

        return products;
      } catch (e) {
        throw new Error(e);
      }
    },
  },

  Mutation: {
    createProduct: async (_parent: any, args: any, _context: Context, _info: any): Promise<Product | null> => {
      const { productName, categoryId } = args.input;
      try {
        let category = null;
        if (categoryId) {
          category = await Category.findOne({ where: { id: categoryId } });
        }
        const product = Product.create({
          productName: productName,
        });
        if (category) {
          product.category = category;
        }
        await product.save();
        return product;
      } catch (e) {
        throw new Error(e);
      }
    },
    updateProduct: async (_parent: any, args: any, _context: Context, _info: any): Promise<Product | null> => {
      const { id, productName, categoryId } = args.input;
      try {
        const product = await Product.findOne({ where: { id: id } });
        if (!product) throw new Error("Ürün bulunamadı!");
        if (categoryId && product.category?.id != categoryId) {
          const category = await Category.findOne({ where: { id: categoryId } });
          if (!category) throw new Error("Kategori Bulunamadı!");
          product.category = category;
        }
        if (productName && product.productName != productName) {
          product.productName = productName;
        }
        await product.save();

        return product;
      } catch (e) {
        throw new Error(e);
      }
    },
    deleteProduct: async (_parent: any, args: any, _context: Context, _info: any) => {
      const { id } = args.input;
      try {
        const product = await Product.findOne({ where: { id } });
        if (!product) throw new Error("Ürün bulunamadı!");

        await product.remove();

        return { status: true, msg: "Ürün Başarı ile silindi!" };
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};

export default ProductResolver;
