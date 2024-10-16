import { Context } from "@contextTypes/contextTypes";
import { AdminUser, UserRole } from "@entities/AdminUser";
import { Company } from "@entities/Company";
import generateRandomPassword from "@helpers/generateRandomPassword";
import argon2 from "argon2";

const CompanyResolver = {
  Query: {
    getCompanyWithUsers: async (_parent: any, args: any, _context: Context, _info: any): Promise<Company | null> => {
      const { id } = args.input;
      try {
        const company = await Company.findOne({
          where: { id },
          relations: ["adminUsers"],
        });
        return company;
      } catch (e) {
        throw new Error(e);
      }
    },
    getAllCompany: async (_parent: any, _args: any, _context: Context, _info: any): Promise<Company[] | null> => {
      try {
        const company = await Company.find();
        return company;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
  Mutation: {
    createCompany: async (_parent: any, args: any, _context: Context, _info: any): Promise<Company | null> => {
      const { companyName, companyEmail, companyPhone } = args.input;
      try {
        const company = await Company.create({ companyName: companyName, companyEmail: companyEmail, companyPhone: companyPhone }).save();
        const randomPass = generateRandomPassword(8);
        console.log(randomPass);
        const hashedPassword = await argon2.hash(randomPass);
        const userRole: UserRole = "superadmin" as UserRole;
        const adminUser = AdminUser.create({ userName: companyName, email: companyEmail, role: userRole, password: hashedPassword, phone: companyPhone });
        adminUser.company = company;
        await adminUser.save();
        return company;
      } catch (e) {
        throw new Error(e);
      }
    },
    updateCompany: async (_parent: any, args: any, _context: Context, _info: any): Promise<Company | null> => {
      const { id, companyName } = args.input;
      try {
        const company = await Company.findOne({ where: { id: id } });
        if (!company) throw new Error("cannot find company");
        if (companyName) {
          company.companyName = companyName;
        }

        await company.save();
        return company;
      } catch (e) {
        throw new Error(e);
      }
    },
    deleteCompany: async (_parent: any, args: any, _context: Context, _info: any) => {
      const { id } = args.input;
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
