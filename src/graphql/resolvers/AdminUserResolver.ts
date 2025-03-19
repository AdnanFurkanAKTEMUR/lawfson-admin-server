import { Context } from "@contextTypes/contextTypes";
import { AdminUser, UserRole } from "@entities/AdminUser";
import { Company } from "@entities/Company";
import argon2, { verify } from "argon2";
import fs from "fs";
import readline from "readline";
import path from "path";
import moment from "moment-timezone";
import { loggerInfo } from "@helpers/logger";

const AdminUserResolver = {
  Query: {
    adminUserGet: async (_parent: any, args: any, context: Context, _info: any): Promise<AdminUser | null> => {
      const { id } = args.input;
      const { user } = context;
      if (!user || user.id == undefined) throw new Error("Hata:Yetkisiz işlem. Kullanıcı bulunamadı!");
      try {
        const adminUser = await AdminUser.findOne({ where: { id } });
        loggerInfo(user.companyName, user.companyId, "AdminUser", user.userName, user.id, `Admin User gösterildi. id:${id}. `);
        return adminUser;
      } catch (e) {
        throw new Error(e);
      }
    },
    //todo sadece biz çekebiliriz
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
        loggerInfo(user.companyName, user.companyId, "AdminUser", user.userName, user.id, `Admin Listesi Çekildi. `);
        return adminUsers;
      } catch (e) {
        throw new Error(e);
      }
    },
    getLogs: async (_parent: any, _args: any, context: Context, _info: any) => {
      const { user } = context;

      // Kullanıcı kontrolü
      if (!user || user.id === undefined) throw new Error("Hata: Kullanıcı bulunamadı!");
      if (user.role !== "superadmin") throw new Error("Hata: Yetkiniz Yok!"); // GraphQL Shield tarafına da eklenebilir

      try {
        // İlgili dosya yolunu oluştur
        const logFilePath = path.join(process.cwd(), "logs", `${user.companyName}_${user.companyId}`, `${user.companyName}_${user.companyId}-${moment().format("YYYY-wo")}.log`);
        // Dosya var mı kontrol et
        if (!fs.existsSync(logFilePath)) {
          throw new Error("Log dosyası bulunamadı!");
        }

        const lines: string[] = [];
        const fileStream = fs.createReadStream(logFilePath);
        const rl = readline.createInterface({
          input: fileStream,
          crlfDelay: Infinity,
        });

        // Dosyayı satır satır oku ve son 100 satırı tut
        for await (const line of rl) {
          lines.push(line);
          if (lines.length > 100) {
            lines.shift(); // İlk elemanı çıkararak son 100 satırın tutulmasını sağlar
          }
        }

        return lines;
      } catch (e) {
        throw new Error(`Log dosyası okunurken hata oluştu: ${e.message}`);
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

        loggerInfo(adminUser.company.companyName, adminUser.company.id, "AdminUser", adminUser.userName, adminUser.id, `Admin User giriş yaptı. id:${adminUser.id}. `);

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
        loggerInfo(user.companyName, user.companyId, "AdminUser", user.userName, user.id, `Admin User oluşturuldu. Oluşturan id:${user.id}, oluşturulan id:${adminUser.id}. `);
        return adminUser;
      } catch (e) {
        throw new Error(e);
      }
    },
    adminUserChangePassword: async (_parent: any, args: any, context: Context, _info: any) => {
      const { id, password, newPassword } = args.input;
      const { user } = context;
      if (!user || user.companyId == undefined) throw new Error("Hata: Yetki hatası!");
      try {
        const adminUser = await AdminUser.findOne({ where: { id } });
        if (!adminUser) throw new Error("Kullanıcı bulunamadı!");
        const isValid = await argon2.verify(adminUser.password, password);
        if (!isValid) throw new Error("Şifrenizi yanlış girdiniz!");
        const hashedPassword = await argon2.hash(newPassword);
        adminUser.password = hashedPassword;
        await adminUser.save();
        loggerInfo(user.companyName, user.companyId, "AdminUser", user.userName, user.id, `Admin User şifre değişimi. Değiştiren id:${user.id}, değiştirilen id:${adminUser.id}. `);
        return { status: true, msg: "şifreniz başarıyla değiştirildi!" };
      } catch (e) {
        throw new Error(e);
      }
    },
    adminUserUpdate: async (_parent: any, args: any, context: Context, _info: any): Promise<AdminUser | null> => {
      const { id, userName, role, phone } = args.input;
      const { user } = context;
      if (!user || user.companyId == undefined) throw new Error("Hata:Yetkisiz işlem.");
      try {
        const adminUser = await AdminUser.findOne({ where: { id } });
        if (!adminUser) throw new Error("Kullanıcı bulunamadı!");
        if (userName && adminUser.userName != userName) {
          adminUser.userName = userName;
        }
        //todo rolü sadece belirli yetkililer değiştirebilir.
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
        loggerInfo(user.companyName, user.companyId, "AdminUser", user.userName, user.id, `Admin User update. Değiştiren id:${user.id}, değiştirilen id:${adminUser.id}. `);
        return adminUser;
      } catch (e) {
        throw new Error(e);
      }
    },
    adminUserDelete: async (_parent: any, args: any, context: Context, _info: any) => {
      const { id } = args.input;
      const { user } = context;
      if (!user || user.companyId == undefined) throw new Error("Hata:Yetkisiz işlem.");
      //todo yetki kontrolü
      try {
        const adminUser = await AdminUser.findOne({ where: { id } });
        if (!adminUser) throw new Error("Kullanıcı bulunamadı!");
        if (adminUser.isRoot) throw new Error("Hata: Root Kullanıcısı silinemez!");
        await AdminUser.remove(adminUser);
        loggerInfo(user.companyName, user.companyId, "AdminUser", user.userName, user.id, `Admin User delete. Değiştiren id:${user.id}, değiştirilen id:${adminUser.id}. `);
        return { status: true, msg: "Silme başarılı!" };
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};

export default AdminUserResolver;
