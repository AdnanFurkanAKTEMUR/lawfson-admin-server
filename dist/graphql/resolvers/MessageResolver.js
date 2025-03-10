"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdminUser_1 = require("../../entities/AdminUser");
const AppUser_1 = require("../../entities/AppUser");
const Company_1 = require("../../entities/Company");
const Message_1 = require("../../entities/Message");
const Product_1 = require("../../entities/Product");
const logger_1 = require("../../helpers/logger");
const typeorm_1 = require("typeorm");
const date_fns_1 = require("date-fns");
const MessageResolver = {
    Query: {
        messageGet: async (_parent, args, context, _info) => {
            const { id } = args.input;
            const { user } = context;
            if (!user || user.id == undefined)
                throw new Error("Hata: Yetkisiz İşlem. Kullanıcı bulunamadı!");
            try {
                const message = await Message_1.Message.findOne({
                    where: { id },
                    relations: ["product", "appUser", "returnedAdmin", "product.category"],
                });
                (0, logger_1.loggerInfo)(user.companyName, user.companyId, "Message", user.userName, user.id, `Mesaja girildi. Mesaj id: ${id}`);
                return message;
            }
            catch (e) {
                throw new Error(e);
            }
        },
        messagesOfCompany: async (_parent, _args, context, _info) => {
            const { user } = context;
            if (!user || user.id == undefined)
                throw new Error("Hata: Yetkisiz İşlem. Kullanıcı bulunamadı!");
            try {
                const message = await Message_1.Message.find({
                    where: { company: { id: user.companyId } },
                    relations: ["product", "appUser", "returnedAdmin"],
                });
                (0, logger_1.loggerInfo)(user.companyName, user.companyId, "Message", user.userName, user.id, "Mesajlar Listelendi");
                return message;
            }
            catch (e) {
                throw new Error(e);
            }
        },
        messageCounts: async (_parent, _args, context) => {
            const { user } = context;
            if (!user || !user.companyId)
                throw new Error("Hata: Yetkisiz İşlem!");
            try {
                const today = new Date();
                const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                const startOfThisWeek = (0, date_fns_1.startOfWeek)(today, { weekStartsOn: 1 });
                const startOfThisMonth = (0, date_fns_1.startOfMonth)(today);
                const dailyCount = await Message_1.Message.count({
                    where: {
                        company: { id: user.companyId },
                        createdAt: (0, typeorm_1.Between)(startOfToday, today),
                    },
                });
                const weeklyCount = await Message_1.Message.count({
                    where: {
                        company: { id: user.companyId },
                        createdAt: (0, typeorm_1.Between)(startOfThisWeek, today),
                    },
                });
                const monthlyCount = await Message_1.Message.count({
                    where: {
                        company: { id: user.companyId },
                        createdAt: (0, typeorm_1.Between)(startOfThisMonth, today),
                    },
                });
                return { dailyCount, weeklyCount, monthlyCount };
            }
            catch (error) {
                throw new Error(`Hata: ${error.message}`);
            }
        },
    },
    Mutation: {
        messageCreate: async (_parent, args, _context, _info) => {
            const { messageHeader, messageText, appUserId, companyId, productId, phone } = args.input;
            try {
                if (!appUserId && !companyId && !productId)
                    throw new Error("Parametreler eksik!");
                const message = Message_1.Message.create({ messageHeader: messageHeader, messageText: messageText });
                const appUser = await AppUser_1.AppUser.findOne({ where: { id: appUserId } });
                if (!appUser)
                    throw new Error("Kullanıcı bulunamadı!");
                if (!appUser.phone && phone) {
                    appUser.phone = phone;
                    await appUser.save();
                }
                message.appUser = appUser;
                const company = await Company_1.Company.findOne({ where: { id: companyId } });
                if (!company)
                    throw new Error("Firma bulunamadı!");
                message.company = company;
                const product = await Product_1.Product.findOne({ where: { id: productId } });
                if (!product)
                    throw new Error("Ürün bulunamadı!");
                message.product = product;
                await message.save();
                return { status: true, msg: "Mesaj başarılı bir şekilde oluşturuldu!" };
            }
            catch (e) {
                throw new Error(e);
            }
        },
        messageUpdate: async (_parent, args, context, _info) => {
            const { id, isReturn } = args.input;
            const { user } = context;
            if (!user || user.id == undefined)
                throw new Error("Hata:Yetkisiz işlem. Kullanıcı bulunamadı!");
            try {
                const message = await Message_1.Message.findOne({ where: { id } });
                if (!message)
                    throw new Error("Belirtilen kayıt bulunamadı!");
                if (isReturn) {
                    message.isReturn = isReturn;
                }
                else {
                    message.isReturn = false;
                }
                const adminUser = await AdminUser_1.AdminUser.findOne({ where: { id: user.id } });
                if (!adminUser)
                    throw new Error("Hata:Admin kullanıcı bulunamadı!");
                message.returnedAdmin = adminUser;
                await message.save();
                (0, logger_1.loggerInfo)(user.companyName, user.companyId, "Message", user.userName, user.id, `Mesaja güncellendi. Mesaj id: ${id}`);
                return message;
            }
            catch (e) {
                throw new Error(e);
            }
        },
    },
};
exports.default = MessageResolver;
//# sourceMappingURL=MessageResolver.js.map