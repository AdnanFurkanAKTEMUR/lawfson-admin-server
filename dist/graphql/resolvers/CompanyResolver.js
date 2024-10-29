"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AdminUser_1 = require("../../entities/AdminUser");
const Company_1 = require("../../entities/Company");
const generateRandomPassword_1 = __importDefault(require("../../helpers/generateRandomPassword"));
const argon2_1 = __importDefault(require("argon2"));
const CompanyResolver = {
    Query: {
        getCompanyWithUsers: async (_parent, args, _context, _info) => {
            const { id } = args.input;
            try {
                const company = await Company_1.Company.findOne({
                    where: { id },
                    relations: ["adminUsers"],
                });
                return company;
            }
            catch (e) {
                throw new Error(e);
            }
        },
        getAllCompany: async (_parent, _args, _context, _info) => {
            try {
                const company = await Company_1.Company.find();
                return company;
            }
            catch (e) {
                throw new Error(e);
            }
        },
    },
    Mutation: {
        createCompany: async (_parent, args, _context, _info) => {
            const { companyName, companyEmail, companyPhone } = args.input;
            try {
                const company = await Company_1.Company.create({ companyName: companyName, companyEmail: companyEmail, companyPhone: companyPhone }).save();
                const randomPass = (0, generateRandomPassword_1.default)(8);
                console.log(randomPass);
                const hashedPassword = await argon2_1.default.hash(randomPass);
                const userRole = "superadmin";
                const adminUser = AdminUser_1.AdminUser.create({ userName: companyName, email: companyEmail, role: userRole, password: hashedPassword, phone: companyPhone, isRoot: true });
                adminUser.company = company;
                await adminUser.save();
                return company;
            }
            catch (e) {
                throw new Error(e);
            }
        },
        updateCompany: async (_parent, args, _context, _info) => {
            const { id, companyName } = args.input;
            try {
                const company = await Company_1.Company.findOne({ where: { id: id } });
                if (!company)
                    throw new Error("cannot find company");
                if (companyName) {
                    company.companyName = companyName;
                }
                await company.save();
                return company;
            }
            catch (e) {
                throw new Error(e);
            }
        },
        deleteCompany: async (_parent, args, _context, _info) => {
            const { id } = args.input;
            try {
                const company = await Company_1.Company.findOne({ where: { id: id }, relations: ["adminUsers"] });
                if (!company)
                    throw new Error("cannot find Company");
                if (company.adminUsers && company.adminUsers.length > 0) {
                    throw new Error("Firmanızın Kullanıcılarını silmelisiniz önce");
                }
                await Company_1.Company.remove(company);
                return { msg: "Firma silindi!", status: true };
            }
            catch (e) {
                throw new Error(e);
            }
        },
    },
};
exports.default = CompanyResolver;
//# sourceMappingURL=CompanyResolver.js.map