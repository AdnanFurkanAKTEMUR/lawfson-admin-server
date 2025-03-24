import { Context } from "@contextTypes/contextTypes";
import { AppUser } from "@entities/AppUser";
import { Company } from "@entities/Company";
import { Product } from "@entities/Product";
import { ReportProduct } from "@entities/ReportProduct";

const ReportProductResolver = {
  Query: {
    getAllReportsWithAppUserId: async (_parent: any, _args: any, context: Context, _info: any) => {
      const { user } = context;
      if (!user || user.id == undefined) throw new Error("Hata:Yetkisiz işlem. Kullanıcı bulunamadı!");
      try {
        const rp = await ReportProduct.find({ where: { appUser: { id: user.id } } });
        return rp || [];
      } catch (e) {
        throw new Error(e);
      }
    },
    getReportWithCompanyId: async (_parent: any, _args: any, context: Context, _info: any) => {
      const { user } = context;
      if (!user || user.id == undefined) throw new Error("Hata:Yetkisiz işlem. Kullanıcı bulunamadı!");
      try {
        const rp = await ReportProduct.find({ where: { company: { id: user.companyId } } });
        return rp || [];
      } catch (e) {
        throw new Error(e);
      }
    },
  },

  Mutation: {
    createReport: async (_parent: any, args: any, context: Context, _info: any) => {
      const { note, productId, companyId } = args.input;
      const { user } = context;
      if (!user || user.id == undefined) throw new Error("Hata:Yetkisiz işlem. Kullanıcı bulunamadı!");

      try {
        const product = await Product.findOne({ where: { id: productId } });
        const company = await Company.findOne({ where: { id: companyId } });
        const appUser = await AppUser.findOne({ where: { id: user.id } });
        if (!product || !company || !appUser) throw new Error("Hata: Ürün veya firma bulunamadı!");
        const rp = ReportProduct.create({ note: note });
        rp.reportedProduct = product;
        rp.company = company;
        rp.appUser = appUser;
        await rp.save();
        return { status: true, msg: "Ürün başarıyla bildirildi" };
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};

export default ReportProductResolver;
