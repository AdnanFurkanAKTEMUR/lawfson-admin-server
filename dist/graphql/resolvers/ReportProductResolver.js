"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppUser_1 = require("../../entities/AppUser");
const Company_1 = require("../../entities/Company");
const Product_1 = require("../../entities/Product");
const ReportProduct_1 = require("../../entities/ReportProduct");
const ReportProductResolver = {
    Query: {
        getAllReportsWithAppUserId: async (_parent, _args, context, _info) => {
            const { user } = context;
            if (!user || user.id == undefined)
                throw new Error("Hata:Yetkisiz işlem. Kullanıcı bulunamadı!");
            try {
                const rp = await ReportProduct_1.ReportProduct.find({ where: { appUser: { id: user.id } } });
                return rp || [];
            }
            catch (e) {
                throw new Error(e);
            }
        },
        getReportWithCompanyId: async (_parent, _args, context, _info) => {
            const { user } = context;
            if (!user || user.id == undefined)
                throw new Error("Hata:Yetkisiz işlem. Kullanıcı bulunamadı!");
            try {
                const rp = await ReportProduct_1.ReportProduct.find({ where: { company: { id: user.companyId } } });
                return rp || [];
            }
            catch (e) {
                throw new Error(e);
            }
        },
    },
    Mutation: {
        createReport: async (_parent, args, context, _info) => {
            const { note, productId, companyId } = args.input;
            const { user } = context;
            if (!user || user.id == undefined)
                throw new Error("Hata:Yetkisiz işlem. Kullanıcı bulunamadı!");
            try {
                const product = await Product_1.Product.findOne({ where: { id: productId } });
                const company = await Company_1.Company.findOne({ where: { id: companyId } });
                const appUser = await AppUser_1.AppUser.findOne({ where: { id: user.id } });
                if (!product || !company || !appUser)
                    throw new Error("Hata: Ürün veya firma bulunamadı!");
                const rp = ReportProduct_1.ReportProduct.create({ note: note });
                rp.reportedProduct = product;
                rp.company = company;
                rp.appUser = appUser;
                await rp.save();
                return { status: true, msg: "Ürün başarıyla bildirildi" };
            }
            catch (e) {
                throw new Error(e);
            }
        },
    },
};
exports.default = ReportProductResolver;
//# sourceMappingURL=ReportProductResolver.js.map