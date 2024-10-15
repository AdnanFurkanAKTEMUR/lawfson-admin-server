"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Category_1 = require("../../entities/Category");
const CategoryResolver = {
    Query: {
        getCategory: async (_parent, args, _context, _info) => {
            const { id } = args.input;
            try {
                const category = await Category_1.Category.findOne({
                    where: { id },
                    relations: ["products"],
                });
                return category;
            }
            catch (e) {
                throw new Error(e);
            }
        },
        getCategoryWithSubcategories: async (_parent, args, _context, _info) => {
            const { id } = args.input;
            try {
                const category = await Category_1.Category.findOne({
                    where: { id: id },
                    relations: ["subcategories", "subcategories.products", "products"],
                });
                return category;
            }
            catch (e) {
                throw new Error(e);
            }
        },
    },
    Mutation: {
        createCategory: async (_parent, args, _context, _info) => {
            const { categoryName, parentCategoryId } = args.input;
            try {
                let parentCategory = null;
                if (parentCategoryId) {
                    parentCategory = await Category_1.Category.findOne({ where: { id: parentCategoryId } });
                }
                const newCategory = Category_1.Category.create({
                    categoryName: categoryName,
                });
                if (parentCategory) {
                    newCategory.parentCategory = parentCategory;
                }
                await newCategory.save();
                return newCategory;
            }
            catch (e) {
                throw new Error(e);
            }
        },
        updateCategory: async (_parent, args, _context, _info) => {
            const { id, categoryName, parentCategoryId } = args.input;
            try {
                let parentCategory = null;
                if (parentCategoryId) {
                    parentCategory = await Category_1.Category.findOne({ where: { id: parentCategoryId } });
                }
                const category = await Category_1.Category.findOne({ where: { id: id } });
                if (!category)
                    throw new Error("cannot find category");
                if (categoryName) {
                    category.categoryName = categoryName;
                }
                if (parentCategory) {
                    category.parentCategory = parentCategory;
                }
                await category.save();
                return category;
            }
            catch (e) {
                throw new Error(e);
            }
        },
        deleteCategory: async (_parent, args, _context, _info) => {
            const { id } = args.input;
            try {
                const category = await Category_1.Category.findOne({ where: { id: id }, relations: ["subcategories", "products"] });
                if (!category)
                    throw new Error("cannot find category");
                if (category.subcategories && category.subcategories.length > 0) {
                    throw new Error("Bu kategori alt kategorilere sahip olduğu için silinemez");
                }
                if (category.products && category.products.length > 0) {
                    throw new Error("Bu kategori ürünlere sahip olduğu için silinemez");
                }
                await Category_1.Category.remove(category);
                return { msg: "Kategori silindi!", status: true };
            }
            catch (e) {
                throw new Error(e);
            }
        },
    },
};
exports.default = CategoryResolver;
//# sourceMappingURL=CategoryResolver.js.map