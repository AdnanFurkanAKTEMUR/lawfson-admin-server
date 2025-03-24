import { Context } from "@contextTypes/contextTypes";
import { AppUser } from "@entities/AppUser";
import { AppUserFavoriteProduct } from "@entities/AppUserFavoriteProduct";
import { Product } from "@entities/Product";

const AppUserFavoriteProductResolver = {
  Query: {
    getAppUserFavoritesProduct: async (_parent: any, _args: any, context: Context, _info: any) => {
      const { user } = context;
      if (!user || user.id == undefined) throw new Error("Hata:Yetkisiz işlem. Kullanıcı bulunamadı!");
      try {
        const favorites = await AppUserFavoriteProduct.find({ where: { appUser: { id: user.id } }, relations: ["appUser", "product"] });

        return favorites || [];
      } catch (e) {
        throw new Error(e);
      }
    },
    isFavorite: async (_parent: any, args: any, context: Context, _info: any) => {
      const { id } = args.input;
      const { user } = context;
      console.log(user, "isFavorite");
      if (!user || user.id == undefined) throw new Error("Hata:Yetkisiz işlem. Kullanıcı bulunamadı!");
      try {
        const product = await AppUserFavoriteProduct.findOne({ where: { product: { id: parseInt(id) }, appUser: { id: user.id } } });
        if (product) {
          return { result: true };
        } else {
          return { result: false };
        }
      } catch (e) {
        throw new Error(e);
      }
    },
  },
  Mutation: {
    createFavoriteProduct: async (_parent: any, args: any, context: Context, _info: any) => {
      const { productId } = args.input;
      const { user } = context;
      console.log(user, "asd")
      if (!user || user.id == undefined) throw new Error("Hata:Yetkisiz işlem. Kullanıcı bulunamadı!");

      try {
        const appUser = await AppUser.findOne({ where: { id: user.id } });

        const product = await Product.findOne({ where: { id: parseInt(productId) } });

        if (!appUser || !product) throw new Error("Hata: Ürün veya kişi bulunamadı!");
        const aufp = await AppUserFavoriteProduct.create();
        aufp.appUser = appUser;
        aufp.product = product;

        await aufp.save();

        return { status: true, msg: "Favorilere eklendi!" };
      } catch (e) {
        throw new Error(e);
      }
    },

    deleteFavoriteProduct: async (_parent: any, args: any, context: Context, _info: any) => {
      const { id } = args.input;
      const { user } = context;
      if (!user || user.id == undefined) throw new Error("Hata:Yetkisiz işlem. Kullanıcı bulunamadı!");
      try {
        const aufp = await AppUserFavoriteProduct.findOne({ where: { product: { id: id }, appUser: { id: user.id } } });
        if (!aufp) throw new Error("Favori ürün bulunamadı!");
        await AppUserFavoriteProduct.remove(aufp);

        return { status: true, msg: "Silme başarılı!" };
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};

export default AppUserFavoriteProductResolver;
