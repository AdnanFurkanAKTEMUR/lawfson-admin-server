import { Context } from "@contextTypes/contextTypes";
import { AdminUser, UserRole } from "@entities/AdminUser";
import { Company } from "@entities/Company";
import { ActionType, TableName } from "@entities/SystemLog";
import createLog from "@helpers/createLog";
import argon2, { verify } from "argon2";
import fs from "fs";
import readline from "readline";

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
    adminUsersOfCompany: async (_parent: any, _args: any, context: Context, _info: any): Promise<AdminUser[] | null> => {
      const { user } = context;
      if (!user || user.id == undefined) throw new Error("Hata:Kullanıcı bulunamadı!");

      try {
        const adminUsers = await AdminUser.find({ where: { company: { id: user.companyId } } });
        return adminUsers;
      } catch (e) {
        throw new Error(e);
      }
    },
    getLogs: async (_parent: any, _args: any, context: Context, _info: any) => {
      const { user } = context;
      if (!user || user.id == undefined) throw new Error("Hata:Kullanıcı bulunamadı!");
      if (user.role != "superadmin") throw new Error("Hata: Yetkiniz Yok!"); //graphql shield tarafına da ekle
      try {
        const logFilePath = "admin.log";
        const lines: string[] = [];

        const fileStream = fs.createReadStream(logFilePath);
        const rl = readline.createInterface({
          input: fileStream,
          crlfDelay: Infinity,
        });
        for await (const line of rl) {
          lines.push(line);
          if (lines.length > 100) {
            lines.shift(); // İlk elemanı çıkararak son 100 satırın saklanmasını sağlar
          }
        }
        return lines;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
  Mutation: {
    adminUserLogin: async (_parent: any, args: any, _context: Context, _info: any): Promise<AdminUser | null> => {
      const { email, password } = args.input;
      try {
        const adminUser = await AdminUser.findOne({ where: { email: email }, relations: ["company"] });
        if (!adminUser) throw new Error("Hata: Şifreniz veya emailiniz yanlış!");
        const isVerify = await verify(adminUser.password, password);
        if (!isVerify) throw new Error("Hata: Şifreniz veya emailiniz yanlış!");
        //last login ip address gibi bilgiler olabilir
        console.log(adminUser);
        return adminUser;
      } catch (e) {
        throw new Error(e);
      }
    },
    adminUserCreate: async (_parent: any, args: any, context: Context, _info: any): Promise<AdminUser | null> => {
      const { userName, email, role, password, phone } = args.input;
      const { user } = context;
      //role doğrulaması gelecek
      if (!user || user.companyId == undefined) throw new Error("Hata: Yetki hatası!");
      try {
        // belki doğrulama maili
        const hashedPassword = await argon2.hash(password);
        const userRole: UserRole = role as UserRole;
        const adminUser = AdminUser.create({ userName: userName, email: email, role: userRole, password: hashedPassword, phone: phone });
        const company = await Company.findOne({ where: { id: user.companyId } });
        if (!company) throw new Error("Hata: Firma bulunamadı!");
        adminUser.company = company;
        await adminUser.save();
        createLog(ActionType.Create, TableName.AdminUser, user.id);
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
        } else if (phone) {
          adminUser.phone = phone;
        } else {
          adminUser.phone = "";
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
        if (adminUser.isRoot) throw new Error("Hata: Root Kullanıcısı silinemez!");
        await AdminUser.remove(adminUser);
        return { status: true, msg: "Silme başarılı!" };
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};

export default AdminUserResolver;
