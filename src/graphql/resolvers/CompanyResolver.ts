import { Context } from "@contextTypes/contextTypes";
import { AdminUser, UserRole } from "@entities/AdminUser";
import { Company } from "@entities/Company";
import generateRandomPassword from "@helpers/generateRandomPassword";
import { loggerInfo } from "@helpers/logger";
import argon2 from "argon2";

const CompanyResolver = {
  Query: {
    getCompanyWithUsers: async (_parent: any, args: any, context: Context, _info: any): Promise<Company | null> => {
      const { id } = args.input;
      const { user } = context;
      if (!user || user.id == undefined) throw new Error("Hata:Yetkisiz işlem. Kullanıcı bulunamadı!");
      try {
        const company = await Company.findOne({
          where: { id },
          relations: ["adminUsers"],
        });
        loggerInfo(user.companyName, user.companyId, "Company", user.userName, user.id, `Kullanıcılar ile birlikte firma görüntülendi. `);
        return company;
      } catch (e) {
        throw new Error(e);
      }
    },
    getAllCompany: async (_parent: any, _args: any, _context: Context, _info: any): Promise<Company[] | null> => {
      //todo sadece biz
      try {
        const company = await Company.find();
        return company;
      } catch (e) {
        throw new Error(e);
      }
    },
    getCompany: async (_parent: any, _args: any, context: Context, _info: any) => {
      const { user } = context;
      if (!user || user.companyId == undefined) throw new Error("Hata:Yetkisiz işlem. Kullanıcı bulunamadı!");
      try {
        const company = await Company.findOne({ where: { id: user.companyId }, relations: ["adminUsers", "companyAddresses", "companyFinanceInfos"] });
        if (!company) throw new Error("cannot find company");
        loggerInfo(user.companyName, user.companyId, "Company", user.userName, user.id, `Firma görüntülendi. `);
        return company;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
  Mutation: {
    createCompany: async (_parent: any, args: any, _context: Context, _info: any): Promise<Company | null> => {
      const { companyName, companyEmail, companyPhone, companyTaxOffice, companyTaxNumber, status, registrationNumber, description, sector, companyType, website } = args.input;
      try {
        const company = await Company.create({
          companyName: companyName,
          companyEmail: companyEmail,
          companyPhone: companyPhone,
          companyTaxOffice: companyTaxOffice,
          companyTaxNumber: companyTaxNumber,
          status: status,
          registrationNumber: registrationNumber,
          description: description,
          sector: sector,
          companyType: companyType,
          website: website,
        }).save();
        const randomPass = generateRandomPassword(8);
        const hashedPassword = await argon2.hash(randomPass);
        const userRole: UserRole = "superadmin" as UserRole;
        const adminUser = AdminUser.create({ userName: companyName, email: companyEmail, role: userRole, password: hashedPassword, phone: companyPhone, isRoot: true });
        adminUser.company = company;
        await adminUser.save();
        adminUser.password = randomPass;
        company.adminUsers = [adminUser];
        return company;
      } catch (e) {
        throw new Error(e);
      }
    },
    updateCompany: async (_parent: any, args: any, context: Context, _info: any): Promise<Company | null> => {
      //todo id cookieden al
      const { companyTaxOffice, companyTaxNumber, status, registrationNumber, description, sector, companyType, website } = args.input;
      const { user } = context;
      if (!user || user.companyId == undefined) throw new Error("Hata:Yetkisiz işlem. Kullanıcı bulunamadı!");
      try {
        const company = await Company.findOne({ where: { id: user.companyId } });
        if (!company) throw new Error("cannot find company");
        if (companyTaxOffice && company.companyTaxOffice != companyTaxOffice) {
          company.companyTaxOffice = companyTaxOffice;
        }
        if (companyTaxNumber && company.companyTaxNumber != companyTaxNumber) {
          company.companyTaxNumber = companyTaxNumber;
        }
        if (status && company.status != status) {
          company.status = status;
        }
        if (registrationNumber && company.registrationNumber != registrationNumber) {
          company.registrationNumber = registrationNumber;
        }
        if (description && company.description != description) {
          company.description = description;
        }
        if (sector && company.sector != sector) {
          company.sector = sector;
        }
        if (companyType && company.companyType != companyType) {
          company.companyType = companyType;
        }
        if (website && company.website != website) {
          company.website = website;
        }
        await company.save();
        loggerInfo(user.companyName, user.companyId, "Company", user.userName, user.id, `Firma bilgileri güncellendi. Değiştiren id:${user.id}, değiştirilen id:${company.id}. `);
        return company;
      } catch (e) {
        throw new Error(e);
      }
    },
    deleteCompany: async (_parent: any, args: any, _context: Context, _info: any) => {
      const { id } = args.input;
      //todo sadece biz
      try {
        const company = await Company.findOne({ where: { id: id }, relations: ["adminUsers"] });
        if (!company) throw new Error("cannot find Company");
        if (company.adminUsers && company.adminUsers.length > 0) {
          throw new Error("Firmanızın Kullanıcılarını silmelisiniz önce");
        }

        await Company.remove(company);
        return { msg: "Firma silindi!", status: true };
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};

export default CompanyResolver;
