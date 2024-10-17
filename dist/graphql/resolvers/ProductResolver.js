"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Category_1 = require("../../entities/Category");
const Product_1 = require("../../entities/Product");
const getSubcategoriesIds_1 = __importDefault(require("../../helpers/getSubcategoriesIds"));
const typeorm_1 = require("typeorm");
const ProductResolver = {
    Query: {
        getProduct: async (_parent, args, context, _info) => {
            const { id } = args.input;
            const { user } = context;
            console.log(user, "user");
            try {
                const product = await Product_1.Product.findOne({
                    where: { id },
                    relations: ["category"],
                });
                return product;
            }
            catch (e) {
                throw new Error(e);
            }
        },
        getProductOfCategory: async (_parent, args, _context, _info) => {
            const { categoryId } = args.input;
            try {
                const category = await Category_1.Category.findOne({
                    where: { id: categoryId },
                    relations: ["subcategories", "subcategories.subcategories"],
                });
                if (!category) {
                    throw new Error("Category not found");
                }
                const categoryIds = (0, getSubcategoriesIds_1.default)(category);
                const products = await Product_1.Product.find({
                    where: {
                        category: (0, typeorm_1.In)(categoryIds),
                    },
                });
                return products;
            }
            catch (e) {
                throw new Error(e);
            }
        },
        productsOfCompany: async (_parent, args, _context, _info) => {
            const { companyId } = args.input;
            try {
                const products = await Product_1.Product.find({ where: { company: companyId } });
                return products;
            }
            catch (e) {
                throw new Error(e);
            }
        },
    },
    Mutation: {
        createProduct: async (_parent, args, _context, _info) => {
            const { productName, categoryId } = args.input;
            try {
                let category = null;
                if (categoryId) {
                    category = await Category_1.Category.findOne({ where: { id: categoryId } });
                }
                const product = Product_1.Product.create({
                    productName: productName,
                });
                if (category) {
                    product.category = category;
                }
                await product.save();
                return product;
            }
            catch (e) {
                throw new Error(e);
            }
        },
        updateProduct: async (_parent, args, _context, _info) => {
            var _a;
            const { id, productName, categoryId } = args.input;
            try {
                const product = await Product_1.Product.findOne({ where: { id: id } });
                if (!product)
                    throw new Error("Ürün bulunamadı!");
                if (categoryId && ((_a = product.category) === null || _a === void 0 ? void 0 : _a.id) != categoryId) {
                    const category = await Category_1.Category.findOne({ where: { id: categoryId } });
                    if (!category)
                        throw new Error("Kategori Bulunamadı!");
                    product.category = category;
                }
                if (productName && product.productName != productName) {
                    product.productName = productName;
                }
                await product.save();
                return product;
            }
            catch (e) {
                throw new Error(e);
            }
        },
        deleteProduct: async (_parent, args, _context, _info) => {
            const { id } = args.input;
            try {
                const product = await Product_1.Product.findOne({ where: { id } });
                if (!product)
                    throw new Error("Ürün bulunamadı!");
                await product.remove();
                return { status: true, msg: "Ürün Başarı ile silindi!" };
            }
            catch (e) {
                throw new Error(e);
            }
        },
    },
};
exports.default = ProductResolver;
//# sourceMappingURL=ProductResolver.js.map