"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdminUser_1 = require("../../entities/AdminUser");
const JobOrder_1 = require("../../entities/JobOrder");
const JobOrderResolver = {
    Query: {
        getJobOrder: async (_parent, args, context, _info) => {
            const { id } = args.input;
            const { user } = context;
            if (!user || !user.companyId)
                throw new Error("Hata: Yetkisiz İşlem");
            try {
                const jo = await JobOrder_1.JobOrder.findOne({
                    where: { id: id, company: { id: user.companyId } },
                    relations: ["adminUser", "company"],
                });
                return jo;
            }
            catch (e) {
                throw new Error(e);
            }
        },
        getCompanyAllJobOrder: async (_parent, _args, context, _info) => {
            const { user } = context;
            console.log(user);
            if (!user || !user.companyId)
                throw new Error("Hata: Yetkisiz İşlem");
            try {
                const jos = await JobOrder_1.JobOrder.find({ where: { company: { id: user.companyId } }, relations: ["company", "adminUser", "createdAdminUser"] });
                return jos;
            }
            catch (e) {
                throw new Error(e);
            }
        },
    },
    Mutation: {
        createJobOrder: async (_parent, args, context, _info) => {
            const { note, adminUserId } = args.input;
            const { user } = context;
            if (!user || !user.companyId)
                throw new Error("Hata: Yetkisiz İşlem");
            try {
                const createdAdminUser = await AdminUser_1.AdminUser.findOne({ where: { id: user.id } });
                const adminUser = await AdminUser_1.AdminUser.findOne({ where: { id: adminUserId }, relations: ["company"] });
                if (!createdAdminUser || !adminUser)
                    throw new Error("Hata: Kullanıcı bulunamadı!");
                const jo = JobOrder_1.JobOrder.create({ note: note, status: "Beklemede" });
                jo.createdAdminUser = createdAdminUser;
                jo.adminUser = adminUser;
                jo.company = adminUser.company;
                const saveResult = await jo.save();
                if (saveResult.id) {
                    return { status: true, msg: "Kayıt Başarılı!" };
                }
                else {
                    return { status: false, msg: "Kayıt Başarısız!" };
                }
            }
            catch (e) {
                throw new Error(e);
            }
        },
        updateJobOrder: async (_parent, args, context, _info) => {
            const { id, note, adminUserId, status } = args.input;
            const { user } = context;
            if (!user || !user.companyId)
                throw new Error("Hata: Yetkisiz İşlem");
            try {
                const jo = await JobOrder_1.JobOrder.findOne({ where: { id }, relations: ["adminUser", "createdAdminUser"] });
                if (!jo)
                    throw new Error("Hata: Kayıt bulunamadı!");
                if (note && jo.note != note) {
                    jo.note = note;
                }
                if (adminUserId && jo.adminUser.id != adminUserId) {
                    const adminUser = await AdminUser_1.AdminUser.findOne({ where: { id: adminUserId } });
                    if (!adminUser)
                        throw new Error("Hata: Atanmak istenen kullanıcı bulunamadı!");
                    jo.adminUser = adminUser;
                }
                if (status && jo.status != status) {
                    jo.status = status;
                }
                const r = await jo.save();
                if (r) {
                    return r;
                }
                else {
                    throw new Error("Hata: Güncelleme başarısız oldu.");
                }
            }
            catch (e) {
                throw new Error(e);
            }
        },
    },
};
exports.default = JobOrderResolver;
//# sourceMappingURL=JobOrderResolver.js.map