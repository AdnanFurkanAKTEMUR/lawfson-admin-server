"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Category_1 = require("../../entities/Category");
const Company_1 = require("../../entities/Company");
const Product_1 = require("../../entities/Product");
const getSubcategoriesIds_1 = __importDefault(require("../../helpers/getSubcategoriesIds"));
const logger_1 = require("../../helpers/logger");
const typeorm_1 = require("typeorm");
const ProductResolver = {
    Query: {
        getProduct: async (_parent, args, _context, _info) => {
            const { id } = args.input;
            try {
                const product = await Product_1.Product.findOne({
                    where: { id },
                    relations: ["category"],
                });
                if (!product)
                    throw new Error("Hata:Ürün bulunamadı!");
                return product;
            }
            catch (e) {
                throw new Error(e);
            }
        },
        productMostClickedThree: async (_parent, _args, context, _info) => {
            const { user } = context;
            if (!user || !user.companyId)
                throw new Error("Hata: Yetkisiz İşlem!");
            try {
                const topProducts = await Product_1.Product.find({
                    where: { company: { id: user.companyId }, clickedRate: (0, typeorm_1.LessThan)(999999) },
                    order: { clickedRate: "DESC" },
                    take: 3,
                    relations: ["category"],
                });
                return topProducts;
            }
            catch (error) {
                throw new Error(`Hata: ${error.message}`);
            }
        },
        productMostClicked: async (_parent, _args, context, _info) => {
            const { user } = context;
            if (!user || !user.companyId) {
                throw new Error("Unauthorized");
            }
            try {
                const now = new Date();
                const startOfDay = new Date();
                startOfDay.setHours(0, 0, 0, 0);
                const startOfWeek = new Date();
                startOfWeek.setDate(now.getDate() - 7);
                startOfWeek.setHours(0, 0, 0, 0);
                const startOfMonth = new Date();
                startOfMonth.setDate(now.getDate() - 30);
                startOfMonth.setHours(0, 0, 0, 0);
                const daily = await Product_1.Product.find({
                    where: {
                        updatedAt: (0, typeorm_1.Between)(startOfDay, now),
                        company: { id: user.companyId },
                    },
                    order: { clickedRate: "DESC" },
                    take: 5,
                });
                const weekly = await Product_1.Product.find({
                    where: {
                        updatedAt: (0, typeorm_1.MoreThanOrEqual)(startOfWeek),
                        company: { id: user.companyId },
                    },
                    order: { clickedRate: "DESC" },
                    take: 5,
                });
                const monthly = await Product_1.Product.find({
                    where: {
                        updatedAt: (0, typeorm_1.MoreThanOrEqual)(startOfMonth),
                        company: { id: user.companyId },
                    },
                    order: { clickedRate: "DESC" },
                    take: 5,
                });
                return {
                    daily: daily || [],
                    weekly: weekly || [],
                    monthly: monthly || [],
                };
            }
            catch (e) {
                console.error("Error fetching most clicked products:", e);
                throw new Error("Something went wrong");
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
        productsOfCompany: async (_parent, _args, context, _info) => {
            const { user } = context;
            if (!user || user.id == undefined)
                throw new Error("Hata: Giriş yapmalısınız!");
            try {
                const products = await Product_1.Product.find({ where: { company: { id: user.companyId } }, relations: ["category"] });
                return products;
            }
            catch (e) {
                throw new Error(e);
            }
        },
    },
    Mutation: {
        createProduct: async (_parent, args, context, _info) => {
            const { productName, categoryId, image, widths, length, thickness, color, origin, surfaceTreatment, description, onAd, location, brand, inStock } = args.input;
            const { user } = context;
            if (!user || user.id == undefined)
                throw new Error("Hata: Giriş yapmalısınız!");
            try {
                const company = await Company_1.Company.findOne({ where: { id: user.companyId } });
                if (!company)
                    throw new Error("Hata: Firma Bulunamadı!");
                let category = null;
                if (categoryId) {
                    category = await Category_1.Category.findOne({ where: { id: categoryId } });
                }
                const product = Product_1.Product.create({
                    productName: productName,
                    image: image || null,
                    widths: widths || null,
                    length: length || null,
                    thickness: thickness || null,
                    color: color || null,
                    origin: origin || null,
                    surfaceTreatment: surfaceTreatment || null,
                    description: description || null,
                    onAd: onAd || false,
                    location: location || null,
                    brand: brand || null,
                    inStock: inStock || false,
                });
                if (onAd) {
                    product.adDate = new Date();
                }
                if (category) {
                    product.category = category;
                }
                product.company = company;
                await product.save();
                (0, logger_1.loggerInfo)(user.companyName, user.companyId, "Product", user.userName, user.id, `Ürün oluşturuldu. Ürün id:${product.id}. `);
                return product;
            }
            catch (e) {
                throw new Error((e === null || e === void 0 ? void 0 : e.message) + "Ürün oluşturulurken bir hata oluştu.");
            }
        },
        updateProduct: async (_parent, args, context, _info) => {
            var _a;
            const { id, productName, categoryId, image, widths, length, thickness, color, origin, surfaceTreatment, description, onAd, location, brand } = args.input;
            const { user } = context;
            if (!user || user.id == undefined)
                throw new Error("Hata: Giriş yapmalısınız!");
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
                if (productName && product.productName !== productName) {
                    product.productName = productName;
                }
                if (image !== undefined) {
                    product.image = image;
                }
                if (widths !== undefined) {
                    product.widths = widths;
                }
                if (length !== undefined) {
                    product.length = length;
                }
                if (thickness !== undefined) {
                    product.thickness = thickness;
                }
                if (color !== undefined) {
                    product.color = color;
                }
                if (origin !== undefined) {
                    product.origin = origin;
                }
                if (surfaceTreatment !== undefined) {
                    product.surfaceTreatment = surfaceTreatment;
                }
                if (description !== undefined) {
                    product.description = description;
                }
                if (onAd !== undefined) {
                    product.onAd = onAd;
                }
                if (location !== undefined) {
                    product.location = location;
                }
                if (brand !== undefined) {
                    product.brand = brand;
                }
                await product.save();
                (0, logger_1.loggerInfo)(user.companyName, user.companyId, "Product", user.userName, user.id, `Ürün bilgileri güncellendi. Değiştirilen id:${product.id}. `);
                return product;
            }
            catch (e) {
                throw new Error(e.message || "Ürün güncellenirken bir hata oluştu.");
            }
        },
        deleteProduct: async (_parent, args, context, _info) => {
            const { id } = args.input;
            const { user } = context;
            if (!user || user.id == undefined)
                throw new Error("Hata: Giriş yapmalısınız!");
            try {
                const product = await Product_1.Product.findOne({ where: { id } });
                if (!product)
                    throw new Error("Ürün bulunamadı!");
                await product.remove();
                (0, logger_1.loggerInfo)(user.companyName, user.companyId, "Product", user.userName, user.id, `Ürün silindi. Değiştirilen id:${product.id}. `);
                return { status: true, msg: "Ürün Başarı ile silindi!" };
            }
            catch (e) {
                throw new Error(e);
            }
        },
        updateProductClickedRate: async (_parent, args, _context, _info) => {
            const { id } = args.input;
            try {
                const product = await Product_1.Product.findOne({ where: { id } });
                if (!product)
                    throw new Error("Hata: Ürün Bulunamadı");
                if (product.clickedRate == null) {
                    product.clickedRate = 1;
                }
                else {
                    product.clickedRate = product.clickedRate + 1;
                }
                await product.save();
                return "Başarılı!";
            }
            catch (e) {
                throw new Error(e);
            }
        },
    },
};
exports.default = ProductResolver;
//# sourceMappingURL=ProductResolver.js.map