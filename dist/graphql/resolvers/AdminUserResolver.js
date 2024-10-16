"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AdminUser_1 = require("../../entities/AdminUser");
const Company_1 = require("../../entities/Company");
const argon2_1 = __importDefault(require("argon2"));
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
        adminUsersOfCompanyGetAll: async (_parent, args, _context, _info) => {
            const { companyId } = args.input;
            try {
                const adminUsers = await AdminUser_1.AdminUser.find({ where: { company: companyId } });
                return adminUsers;
            }
            catch (e) {
                throw new Error(e);
            }
        },
    },
    Mutation: {
        adminUserCreate: async (_parent, args, _context, _info) => {
            const { userName, email, role, companyId, password, phone } = args.input;
            try {
                const hashedPassword = await argon2_1.default.hash(password);
                const userRole = role;
                const adminUser = AdminUser_1.AdminUser.create({ userName: userName, email: email, role: userRole, password: hashedPassword, phone: phone });
                const company = await Company_1.Company.findOne({ where: { id: companyId } });
                if (company) {
                    adminUser.company = company;
                }
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