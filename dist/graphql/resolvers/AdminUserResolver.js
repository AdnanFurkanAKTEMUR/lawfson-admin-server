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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AdminUser_1 = require("../../entities/AdminUser");
const Company_1 = require("../../entities/Company");
const argon2_1 = __importStar(require("argon2"));
const fs_1 = __importDefault(require("fs"));
const readline_1 = __importDefault(require("readline"));
const path_1 = __importDefault(require("path"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const logger_1 = require("../../helpers/logger");
const AdminUserResolver = {
    Query: {
        adminUserGet: async (_parent, args, context, _info) => {
            const { id } = args.input;
            const { user } = context;
            if (!user || user.id == undefined)
                throw new Error("Hata:Yetkisiz işlem. Kullanıcı bulunamadı!");
            try {
                const adminUser = await AdminUser_1.AdminUser.findOne({ where: { id } });
                (0, logger_1.loggerInfo)(user.companyName, user.companyId, "AdminUser", user.userName, user.id, `Admin User gösterildi. id:${id}. `);
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
            try {
                const adminUsers = await AdminUser_1.AdminUser.find({ where: { company: { id: user.companyId } } });
                (0, logger_1.loggerInfo)(user.companyName, user.companyId, "AdminUser", user.userName, user.id, `Admin Listesi Çekildi. `);
                return adminUsers;
            }
            catch (e) {
                throw new Error(e);
            }
        },
        getLogs: async (_parent, _args, context, _info) => {
            var _a, e_1, _b, _c;
            const { user } = context;
            if (!user || user.id === undefined)
                throw new Error("Hata: Kullanıcı bulunamadı!");
            if (user.role !== "superadmin")
                throw new Error("Hata: Yetkiniz Yok!");
            try {
                const logFilePath = path_1.default.join(process.cwd(), "logs", `${user.companyName}_${user.companyId}`, `${user.companyName}_${user.companyId}-${(0, moment_timezone_1.default)().format("YYYY-wo")}.log`);
                if (!fs_1.default.existsSync(logFilePath)) {
                    throw new Error("Log dosyası bulunamadı!");
                }
                const lines = [];
                const fileStream = fs_1.default.createReadStream(logFilePath);
                const rl = readline_1.default.createInterface({
                    input: fileStream,
                    crlfDelay: Infinity,
                });
                try {
                    for (var _d = true, rl_1 = __asyncValues(rl), rl_1_1; rl_1_1 = await rl_1.next(), _a = rl_1_1.done, !_a; _d = true) {
                        _c = rl_1_1.value;
                        _d = false;
                        const line = _c;
                        lines.push(line);
                        if (lines.length > 100) {
                            lines.shift();
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (!_d && !_a && (_b = rl_1.return)) await _b.call(rl_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return lines;
            }
            catch (e) {
                throw new Error(`Log dosyası okunurken hata oluştu: ${e.message}`);
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
                (0, logger_1.loggerInfo)(adminUser.company.companyName, adminUser.company.id, "AdminUser", adminUser.userName, adminUser.id, `Admin User giriş yaptı. id:${adminUser.id}. `);
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
                const company = await Company_1.Company.findOne({ where: { id: user.companyId } });
                if (!company)
                    throw new Error("Hata: Firma bulunamadı!");
                adminUser.company = company;
                await adminUser.save();
                (0, logger_1.loggerInfo)(user.companyName, user.companyId, "AdminUser", user.userName, user.id, `Admin User oluşturuldu. Oluşturan id:${user.id}, oluşturulan id:${adminUser.id}. `);
                return adminUser;
            }
            catch (e) {
                throw new Error(e);
            }
        },
        adminUserChangePassword: async (_parent, args, context, _info) => {
            const { id, password, newPassword } = args.input;
            const { user } = context;
            if (!user || user.companyId == undefined)
                throw new Error("Hata: Yetki hatası!");
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
                (0, logger_1.loggerInfo)(user.companyName, user.companyId, "AdminUser", user.userName, user.id, `Admin User şifre değişimi. Değiştiren id:${user.id}, değiştirilen id:${adminUser.id}. `);
                return { status: true, msg: "şifreniz başarıyla değiştirildi!" };
            }
            catch (e) {
                throw new Error(e);
            }
        },
        adminUserUpdate: async (_parent, args, context, _info) => {
            const { id, userName, role, phone } = args.input;
            const { user } = context;
            if (!user || user.companyId == undefined)
                throw new Error("Hata:Yetkisiz işlem.");
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
                (0, logger_1.loggerInfo)(user.companyName, user.companyId, "AdminUser", user.userName, user.id, `Admin User update. Değiştiren id:${user.id}, değiştirilen id:${adminUser.id}. `);
                return adminUser;
            }
            catch (e) {
                throw new Error(e);
            }
        },
        adminUserDelete: async (_parent, args, context, _info) => {
            const { id } = args.input;
            const { user } = context;
            if (!user || user.companyId == undefined)
                throw new Error("Hata:Yetkisiz işlem.");
            try {
                const adminUser = await AdminUser_1.AdminUser.findOne({ where: { id } });
                if (!adminUser)
                    throw new Error("Kullanıcı bulunamadı!");
                if (adminUser.isRoot)
                    throw new Error("Hata: Root Kullanıcısı silinemez!");
                await AdminUser_1.AdminUser.remove(adminUser);
                (0, logger_1.loggerInfo)(user.companyName, user.companyId, "AdminUser", user.userName, user.id, `Admin User delete. Değiştiren id:${user.id}, değiştirilen id:${adminUser.id}. `);
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