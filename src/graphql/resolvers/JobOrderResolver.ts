import { Context } from "@contextTypes/contextTypes";
import { AdminUser } from "@entities/AdminUser";
import { JobOrder } from "@entities/JobOrder";

const JobOrderResolver = {
  Query: {
    getJobOrder: async (_parent: any, args: any, context: Context, _info: any) => {
      const { id } = args.input;
      const { user } = context;
      if (!user || user.companyId) throw new Error("Hata: Yetkisiz İşlen");

      try {
        //jo = JobOrder
        const jo = await JobOrder.findOne({
          where: { id: id, company: { id: user.companyId } },
          relations: ["adminUser", "company"],
        });
        return jo;
      } catch (e) {
        throw new Error(e);
      }
    },
    getCompanyAllJobOrder: async (_parent: any, _args: any, context: Context, _info: any) => {
      const { user } = context;
      if (!user || user.companyId) throw new Error("Hata: Yetkisiz İşlen");
      try {
        const jos = await JobOrder.find({ where: { company: { id: user.companyId } } });
        return jos;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
  Mutation: {
    createJobOrder: async (_parent: any, args: any, context: Context, _info: any) => {
      const { note, adminUserId } = args.input;
      const { user } = context;
      if (!user || user.companyId) throw new Error("Hata: Yetkisiz İşlen");
      try {
        const createdAdminUser = await AdminUser.findOne({ where: { id: user.id } });
        //atanan
        const adminUser = await AdminUser.findOne({ where: { id: adminUserId }, relations: ["company"] });
        if (!createdAdminUser || !adminUser) throw new Error("Hata: Kullanıcı bulunamadı!");
        const jo = JobOrder.create({ note: note, status: "Beklemede" });
        jo.createdAdminUser = createdAdminUser;
        jo.adminUser = adminUser;
        jo.company = adminUser.company;
        const saveResult = await jo.save();
        if (saveResult.id) {
          return { status: true, msg: "Kayıt Başarılı!" };
        } else {
          return { status: false, msg: "Kayıt Başarısız!" };
        }
      } catch (e) {
        throw new Error(e);
      }
    },
    updateJobOrder: async (_parent: any, args: any, context: Context, _info: any) => {
      const { id, note, adminUserId, status } = args.input;
      const { user } = context;
      if (!user || user.companyId) throw new Error("Hata: Yetkisiz İşlen");
      try {
        //todo status için enum belirle
        //todo değişiklik yapan kullanıcı da tutulmalı belki loglarda
        const jo = await JobOrder.findOne({ where: { id }, relations: ["adminUser", "createdAdminUser"] });

        if (!jo) throw new Error("Hata: Kayıt bulunamadı!");
        if (note && jo.note != note) {
          jo.note = note;
        }
        if (adminUserId && jo.adminUser.id != adminUserId) {
          const adminUser = await AdminUser.findOne({ where: { id: adminUserId } });
          if (!adminUser) throw new Error("Hata: Atanmak istenen kullanıcı bulunamadı!");
          jo.adminUser = adminUser;
        }
        if (status && jo.status != status) {
          jo.status = status;
        }
        const r = await jo.save();
        if (r) {
          return r;
        } else {
          throw new Error("Hata: Güncelleme başarısız oldu.");
        }
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};

export default JobOrderResolver;
