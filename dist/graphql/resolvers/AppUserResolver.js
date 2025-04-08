"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppUser_1 = require("../../entities/AppUser");
const argon2_1 = require("argon2");
const validator_1 = require("validator");
const AppUserResolver = {
    Query: {
        appUserGet: async (_parent, _args, context, _info) => {
            const { user } = context;
            if (!user || user.id == undefined)
                throw new Error("Hata: Yetkisiz İşlem. Kullanıcı bulunamadı!");
            try {
                const appuser = await AppUser_1.AppUser.findOne({ where: { id: user.id } });
                return appuser;
            }
            catch (e) {
                throw new Error(e);
            }
        },
        appUsersGetAll: async (_parent, _args, _context, _info) => {
            try {
                const appUsers = await AppUser_1.AppUser.find();
                return appUsers;
            }
            catch (e) {
                throw new Error(e);
            }
        },
    },
    Mutation: {
        appUserCreate: async (_parent, args, _context, _info) => {
            const { userName, email, password, phone, phoneCode } = args.input;
            try {
                if (!userName || !email || !password)
                    throw new Error("Eksik parametreler!");
                if (!(0, validator_1.isEmail)(email)) {
                    throw new Error("Geçersiz email formatı!");
                }
                const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
                if (!passwordRegex.test(password)) {
                    throw new Error("Şifre en az 6 karakter olmalı ve harf ile rakam içermelidir!");
                }
                const hashedPassword = await (0, argon2_1.hash)(password);
                const appUser = await AppUser_1.AppUser.create({ userName: userName, email: email, password: hashedPassword, phone: phone, phoneCode: phoneCode }).save();
                return appUser;
            }
            catch (e) {
                throw new Error(e);
            }
        },
        appUserChangePassword: async (_parent, args, context, _info) => {
            const { password, newPassword } = args.input;
            const { user } = context;
            if (!user || user.id == undefined)
                throw new Error("Hata: Yetki hatası!");
            try {
                if (!password || !newPassword)
                    throw new Error("Eksik Parametreler!");
                const appUser = await AppUser_1.AppUser.findOne({ where: { id: user.id } });
                if (!appUser)
                    throw new Error("Kullanıcı bulunamadı!");
                const isValidPass = await (0, argon2_1.verify)(appUser.password, password);
                if (!isValidPass)
                    throw new Error("Hata:Şifre yanlış!");
                const hashPass = await (0, argon2_1.hash)(newPassword);
                appUser.password = hashPass;
                await appUser.save();
                return { status: true, msg: "şifreniz başarıyla değiştirildi!" };
            }
            catch (e) {
                throw new Error(e);
            }
        },
        appUserUpdate: async (_parent, args, _context, _info) => {
            const { id, userName, phone, note } = args.input;
            try {
                const appUser = await AppUser_1.AppUser.findOne({ where: { id } });
                if (!appUser)
                    throw new Error("Hata:Kullanıcı bulunamadı!");
                if (userName && appUser.userName != userName)
                    appUser.userName = userName;
                if (phone && appUser.phone != phone)
                    appUser.phone = phone;
                if (note && appUser.note != note)
                    appUser.note = note;
                await appUser.save();
                return appUser;
            }
            catch (e) {
                throw new Error(e);
            }
        },
        appUserDelete: async (_parent, args, _context, _info) => {
            const { id } = args.input;
            try {
                const appUser = await AppUser_1.AppUser.findOne({ where: { id } });
                if (!appUser)
                    throw new Error("Hata:Kullanıcı bulunamadı!");
                await AppUser_1.AppUser.remove(appUser);
                return { status: true, msg: "Silme Başarılı" };
            }
            catch (e) {
                throw new Error(e);
            }
        },
        appUserLogin: async (_parent, args, _context, _info) => {
            const { email, password } = args.input;
            if (!email || !password)
                throw new Error("Eksik parametreler!");
            try {
                const appUser = await AppUser_1.AppUser.findOne({
                    where: {
                        email: email,
                    },
                });
                if (!appUser)
                    throw new Error("Hata: Şifreniz veya emailiniz yanlış.");
                const isVerifyPassword = await (0, argon2_1.verify)(appUser.password, password);
                if (!isVerifyPassword)
                    throw new Error("Hata: Şifreniz veya emailiniz yanlış.");
                return appUser;
            }
            catch (e) {
                throw new Error(e);
            }
        },
    },
};
exports.default = AppUserResolver;
//# sourceMappingURL=AppUserResolver.js.map