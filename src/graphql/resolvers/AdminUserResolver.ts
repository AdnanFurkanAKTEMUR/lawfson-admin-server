import { Context } from "@contextTypes/contextTypes";
import { AdminUser, UserRole } from "@entities/AdminUser";
import { Company } from "@entities/Company";
import argon2 from "argon2";

const AdminUserResolver = {
  Query: {
    adminUserGet: async (_parent: any, args: any, _context: Context, _info: any): Promise<AdminUser | null> => {
      const { id } = args.input;
      try {
        const adminUser = await AdminUser.findOne({ where: { id } });
        return adminUser;
      } catch (e) {
        throw new Error(e);
      }
    },
    adminUserGetAll: async (_parent: any, _args: any, _context: Context, _info: any): Promise<AdminUser[] | null> => {
      try {
        const adminUsers = await AdminUser.find();
        return adminUsers;
      } catch (e) {
        throw new Error(e);
      }
    },
    adminUsersOfCompanyGetAll: async (_parent: any, args: any, _context: Context, _info: any): Promise<AdminUser[] | null> => {
      const { companyId } = args.input;
      try {
        const adminUsers = await AdminUser.find({ where: { company: companyId } });
        return adminUsers;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
  Mutation: {
    adminUserCreate: async (_parent: any, args: any, _context: Context, _info: any): Promise<AdminUser | null> => {
      const { userName, email, role, companyId, password, phone } = args.input;
      try {
        // belki doğrulama maili
        const hashedPassword = await argon2.hash(password);
        const userRole: UserRole = role as UserRole;
        const adminUser = AdminUser.create({ userName: userName, email: email, role: userRole, password: hashedPassword, phone: phone });
        const company = await Company.findOne({ where: { id: companyId } });
        if (company) {
          adminUser.company = company;
        }
        await adminUser.save();
        return adminUser;
      } catch (e) {
        throw new Error(e);
      }
    },
    adminUserChangePassword: async (_parent: any, args: any, _context: Context, _info: any) => {
      const { id, password, newPassword } = args.input;
      try {
        const adminUser = await AdminUser.findOne({ where: { id } });
        if (!adminUser) throw new Error("Kullanıcı bulunamadı!");
        const isValid = await argon2.verify(adminUser.password, password);
        if (!isValid) throw new Error("Şifrenizi yanlış girdiniz!");
        const hashedPassword = await argon2.hash(newPassword);
        adminUser.password = hashedPassword;
        await adminUser.save();
        return { status: true, msg: "şifreniz başarıyla değiştirildi!" };
      } catch (e) {
        throw new Error(e);
      }
    },
    adminUserUpdate: async (_parent: any, args: any, _context: Context, _info: any): Promise<AdminUser | null> => {
      const { id, userName, role, phone } = args.input;

      try {
        const adminUser = await AdminUser.findOne({ where: { id } });
        if (!adminUser) throw new Error("Kullanıcı bulunamadı!");
        if (userName && adminUser.userName != userName) {
          adminUser.userName = userName;
        }
        if (role) {
          const userRole: UserRole = role as UserRole;
          if (userRole != adminUser.role) {
            adminUser.role = userRole;
          }
        }

        if (phone && adminUser.phone != phone) {
          adminUser.phone = phone;
        }
        await adminUser.save();
        return adminUser;
      } catch (e) {
        throw new Error(e);
      }
    },
    adminUserDelete: async (_parent: any, args: any, _context: Context, _info: any) => {
      const { id } = args.input;
      try {
        const adminUser = await AdminUser.findOne({ where: { id } });
        if (!adminUser) throw new Error("Kullanıcı bulunamadı!");
        await AdminUser.remove(adminUser);
        return { status: true, msg: "Silme başarılı!" };
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};

export default AdminUserResolver;
