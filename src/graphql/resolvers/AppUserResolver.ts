import { Context } from "@contextTypes/contextTypes";
import { AppUser } from "@entities/AppUser";
import { hash, verify } from "argon2";
import { isEmail } from "validator"; // Email doğrulama için
const AppUserResolver = {
  Query: {
    appUserGet: async (_parent: any, args: any, _context: Context, _info: any): Promise<AppUser | null> => {
      const { id } = args.input;

      try {
        const appuser = await AppUser.findOne({ where: { id } });
        return appuser;
      } catch (e) {
        throw new Error(e);
      }
    },

    appUsersGetAll: async (_parent: any, _args: any, _context: Context, _info: any): Promise<AppUser[] | null> => {
      try {
        const appUsers = await AppUser.find();
        return appUsers;
      } catch (e) {
        throw new Error(e);
      }
    },
  },

  Mutation: {
    appUserCreate: async (_parent: any, args: any, _context: Context, _info: any): Promise<AppUser | null> => {
      const { userName, email, password, phone, phoneCode } = args.input;
      try {
        if (!userName || !email || !password) throw new Error("Eksik parametreler!");
        // Email format kontrolü
        if (!isEmail(email)) {
          throw new Error("Geçersiz email formatı!");
        }
        // Şifre doğrulama (min 6 karakter, harf ve rakam içermeli)
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        if (!passwordRegex.test(password)) {
          throw new Error("Şifre en az 6 karakter olmalı ve harf ile rakam içermelidir!");
        }
        const hashedPassword = await hash(password);
        const appUser = await AppUser.create({ userName: userName, email: email, password: hashedPassword, phone: phone, phoneCode: phoneCode }).save();
        return appUser;
      } catch (e) {
        throw new Error(e);
      }
    },
    appUserChangePassword: async (_parent: any, args: any, _context: Context, _info: any) => {
      const { id, password, newPassword } = args.input;
      try {
        if (!id || !password || !newPassword) throw new Error("Eksik Parametreler!");
        const appUser = await AppUser.findOne({ where: { id } });
        if (!appUser) throw new Error("Kullanıcı bulunamadı!");
        const isValidPass = await verify(appUser.password, password);
        if (!isValidPass) throw new Error("Hata:Şifre yanlış!");
        const hashPass = await hash(password);
        appUser.password = hashPass;
        await appUser.save();
        return { status: true, msg: "şifreniz başarıyla değiştirildi!" };
      } catch (e) {
        throw new Error(e);
      }
    },
    appUserUpdate: async (_parent: any, args: any, _context: Context, _info: any): Promise<AppUser | null> => {
      const { id, userName, phone } = args.input;
      try {
        const appUser = await AppUser.findOne({ where: { id } });
        if (!appUser) throw new Error("Hata:Kullanıcı bulunamadı!");
        if (userName && appUser.userName != userName) appUser.userName = userName;
        if (phone && appUser.phone != phone) appUser.phone = phone;
        await appUser.save();
        return appUser;
      } catch (e) {
        throw new Error(e);
      }
    },
    appUserDelete: async (_parent: any, args: any, _context: Context, _info: any) => {
      const { id } = args.input;

      try {
        const appUser = await AppUser.findOne({ where: { id } });
        if (!appUser) throw new Error("Hata:Kullanıcı bulunamadı!");
        await AppUser.remove(appUser);
        return { status: true, msg: "Silme Başarılı" };
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};

export default AppUserResolver;
