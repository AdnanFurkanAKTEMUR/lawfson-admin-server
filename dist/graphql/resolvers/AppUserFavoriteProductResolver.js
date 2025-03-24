"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppUser_1 = require("../../entities/AppUser");
const AppUserFavoriteProduct_1 = require("../../entities/AppUserFavoriteProduct");
const Product_1 = require("../../entities/Product");
const AppUserFavoriteProductResolver = {
    Query: {
        getAppUserFavoritesProduct: async (_parent, _args, context, _info) => {
            const { user } = context;
            if (!user || user.id == undefined)
                throw new Error("Hata:Yetkisiz işlem. Kullanıcı bulunamadı!");
            try {
                const favorites = await AppUserFavoriteProduct_1.AppUserFavoriteProduct.find({ where: { appUser: { id: user.id } }, relations: ["appUser", "product"] });
                return favorites || [];
            }
            catch (e) {
                throw new Error(e);
            }
        },
        isFavorite: async (_parent, args, context, _info) => {
            const { id } = args.input;
            const { user } = context;
            console.log(user, "isFavorite");
            if (!user || user.id == undefined)
                throw new Error("Hata:Yetkisiz işlem. Kullanıcı bulunamadı!");
            try {
                const product = await AppUserFavoriteProduct_1.AppUserFavoriteProduct.findOne({ where: { product: { id: parseInt(id) }, appUser: { id: user.id } } });
                if (product) {
                    return { result: true };
                }
                else {
                    return { result: false };
                }
            }
            catch (e) {
                throw new Error(e);
            }
        },
    },
    Mutation: {
        createFavoriteProduct: async (_parent, args, context, _info) => {
            const { productId } = args.input;
            const { user } = context;
            console.log(user, "asd");
            if (!user || user.id == undefined)
                throw new Error("Hata:Yetkisiz işlem. Kullanıcı bulunamadı!");
            try {
                const appUser = await AppUser_1.AppUser.findOne({ where: { id: user.id } });
                const product = await Product_1.Product.findOne({ where: { id: parseInt(productId) } });
                if (!appUser || !product)
                    throw new Error("Hata: Ürün veya kişi bulunamadı!");
                const aufp = await AppUserFavoriteProduct_1.AppUserFavoriteProduct.create();
                aufp.appUser = appUser;
                aufp.product = product;
                await aufp.save();
                return { status: true, msg: "Favorilere eklendi!" };
            }
            catch (e) {
                throw new Error(e);
            }
        },
        deleteFavoriteProduct: async (_parent, args, context, _info) => {
            const { id } = args.input;
            const { user } = context;
            if (!user || user.id == undefined)
                throw new Error("Hata:Yetkisiz işlem. Kullanıcı bulunamadı!");
            try {
                const aufp = await AppUserFavoriteProduct_1.AppUserFavoriteProduct.findOne({ where: { product: { id: id }, appUser: { id: user.id } } });
                if (!aufp)
                    throw new Error("Favori ürün bulunamadı!");
                await AppUserFavoriteProduct_1.AppUserFavoriteProduct.remove(aufp);
                return { status: true, msg: "Silme başarılı!" };
            }
            catch (e) {
                throw new Error(e);
            }
        },
    },
};
exports.default = AppUserFavoriteProductResolver;
//# sourceMappingURL=AppUserFavoriteProductResolver.js.map