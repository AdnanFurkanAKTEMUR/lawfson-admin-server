"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const AdminUser_1 = require("../../entities/AdminUser");
const Company_1 = require("../../entities/Company");
const argon2_1 = __importStar(require("argon2"));
const AdminUserResolver = {
    Query: {
        adminUserGet: async (_parent, args, _context, _info) => {
            const { id } = args.input;
            try {
                const adminUser = await AdminUser_1.AdminUser.findOne({ where: { id } });
                return adminUser;
            }
            catch (e) {
                throw new Error(e);
            }
        },
        adminUserGetAll: async (_parent, _args, _context, _info) => {
            try {
                const adminUsers = await AdminUser_1.AdminUser.find();
                return adminUsers;
            }
            catch (e) {
                throw new Error(e);
            }
        },
        adminUsersOfCompany: async (_parent, _args, context, _info) => {
            const { user } = context;
            if (!user || user.id == undefined)
                throw new Error("Hata:Kullanıcı bulunamadı!");
            console.log(user);
            try {
                const adminUsers = await AdminUser_1.AdminUser.find({ where: { company: { id: parseInt(user.companyId) } } });
                return adminUsers;
            }
            catch (e) {
                throw new Error(e);
            }
        },
    },
    Mutation: {
        adminUserLogin: async (_parent, args, _context, _info) => {
            const { email, password } = args.input;
            try {
                const adminUser = await AdminUser_1.AdminUser.findOne({ where: { email: email }, relations: ["company"] });
                if (!adminUser)
                    throw new Error("Hata: Şifreniz veya emailiniz yanlış!");
                const isVerify = await (0, argon2_1.verify)(adminUser.password, password);
                if (!isVerify)
                    throw new Error("Hata: Şifreniz veya emailiniz yanlış!");
                console.log(adminUser);
                return adminUser;
            }
            catch (e) {
                throw new Error(e);
            }
        },
        adminUserCreate: async (_parent, args, context, _info) => {
            const { userName, email, role, password, phone } = args.input;
            const { user } = context;
            if (!user || user.companyId == undefined)
                throw new Error("Hata: Yetki hatası!");
            try {
                const hashedPassword = await argon2_1.default.hash(password);
                const userRole = role;
                const adminUser = AdminUser_1.AdminUser.create({ userName: userName, email: email, role: userRole, password: hashedPassword, phone: phone });
                const company = await Company_1.Company.findOne({ where: { id: parseInt(user.companyId) } });
                if (!company)
                    throw new Error("Hata: Firma bulunamadı!");
                adminUser.company = company;
                await adminUser.save();
                return adminUser;
            }
            catch (e) {
                throw new Error(e);
            }
        },
        adminUserChangePassword: async (_parent, args, _context, _info) => {
            const { id, password, newPassword } = args.input;
            try {
                const adminUser = await AdminUser_1.AdminUser.findOne({ where: { id } });
                if (!adminUser)
                    throw new Error("Kullanıcı bulunamadı!");
                const isValid = await argon2_1.default.verify(adminUser.password, password);
                if (!isValid)
                    throw new Error("Şifrenizi yanlış girdiniz!");
                const hashedPassword = await argon2_1.default.hash(newPassword);
                adminUser.password = hashedPassword;
                await adminUser.save();
                return { status: true, msg: "şifreniz başarıyla değiştirildi!" };
            }
            catch (e) {
                throw new Error(e);
            }
        },
        adminUserUpdate: async (_parent, args, _context, _info) => {
            const { id, userName, role, phone } = args.input;
            try {
                const adminUser = await AdminUser_1.AdminUser.findOne({ where: { id } });
                if (!adminUser)
                    throw new Error("Kullanıcı bulunamadı!");
                if (userName && adminUser.userName != userName) {
                    adminUser.userName = userName;
                }
                if (role) {
                    const userRole = role;
                    if (userRole != adminUser.role) {
                        adminUser.role = userRole;
                    }
                }
                if (phone && adminUser.phone != phone) {
                    adminUser.phone = phone;
                }
                else if (phone) {
                    adminUser.phone = phone;
                }
                else {
                    adminUser.phone = "";
                }
                await adminUser.save();
                return adminUser;
            }
            catch (e) {
                throw new Error(e);
            }
        },
        adminUserDelete: async (_parent, args, _context, _info) => {
            const { id } = args.input;
            try {
                const adminUser = await AdminUser_1.AdminUser.findOne({ where: { id } });
                if (!adminUser)
                    throw new Error("Kullanıcı bulunamadı!");
                await AdminUser_1.AdminUser.remove(adminUser);
                return { status: true, msg: "Silme başarılı!" };
            }
            catch (e) {
                throw new Error(e);
            }
        },
    },
};
exports.default = AdminUserResolver;
//# sourceMappingURL=AdminUserResolver.js.map