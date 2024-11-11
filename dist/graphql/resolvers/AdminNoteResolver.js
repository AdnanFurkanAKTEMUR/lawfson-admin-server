"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdminNote_1 = require("../../entities/AdminNote");
const AdminUser_1 = require("../../entities/AdminUser");
const Company_1 = require("../../entities/Company");
const Message_1 = require("../../entities/Message");
const logger_1 = require("../../helpers/logger");
const AdminNoteResolver = {
    Query: {
        adminNotesOfMessage: async (_parent, args, context, _info) => {
            const { messageId } = args.input;
            const { user } = context;
            if (!user || user.id == undefined)
                throw new Error("Hata:Yetkisiz işlem. Kullanıcı bulunamadı!");
            try {
                const adminNotes = await AdminNote_1.AdminNote.find({ where: { message: { id: messageId } }, relations: ["adminUser"] });
                (0, logger_1.loggerInfo)(user.companyName, user.companyId, "Note", user.userName, user.id, `Notlar çekildi. Mesaj id: ${messageId}`);
                return adminNotes;
            }
            catch (e) {
                throw new Error(e);
            }
        },
    },
    Mutation: {
        adminNoteCreate: async (_parent, args, context, _info) => {
            const { note, messageId } = args.input;
            const { user } = context;
            if (!user || user.id == undefined)
                throw new Error("Hata:Yetkisiz işlem. Kullanıcı bulunamadı!");
            try {
                const adminUser = await AdminUser_1.AdminUser.findOne({ where: { id: user.id } });
                if (!adminUser)
                    throw new Error("Hata:Yetkisiz işlem. Kullanıcı bulunamadı!");
                const company = await Company_1.Company.findOne({ where: { id: user.companyId } });
                if (!company)
                    throw new Error("Hata: Firma bilgileri eksik!");
                const message = await Message_1.Message.findOne({ where: { id: messageId } });
                if (!message)
                    throw new Error("Hata: Kayıt bulunamadı!");
                const adminNote = AdminNote_1.AdminNote.create({ note: note });
                adminNote.adminUser = adminUser;
                adminNote.company = company;
                adminNote.message = message;
                await adminNote.save();
                (0, logger_1.loggerInfo)(user.companyName, user.companyId, "Note", user.userName, user.id, `Not oluşturuldu Not id:${adminNote.id}. Mesaj id: ${messageId}`);
                return adminNote;
            }
            catch (e) {
                throw new Error(e);
            }
        },
        adminNoteDelete: async (_parent, args, context, _info) => {
            const { id } = args.input;
            const { user } = context;
            if (!user || user.id == undefined)
                throw new Error("Hata:Yetkisiz işlem. Kullanıcı bulunamadı!");
            try {
                const adminNote = await AdminNote_1.AdminNote.findOne({ where: { id } });
                if (!adminNote)
                    throw new Error("Not bulunamadı!");
                await AdminNote_1.AdminNote.remove(adminNote);
                (0, logger_1.loggerInfo)(user.companyName, user.companyId, "Note", user.userName, user.id, `Not silindi. Not id:${id}.`);
                return { status: true, msg: "Silme başarılı!" };
            }
            catch (e) {
                throw new Error(e);
            }
        },
    },
};
exports.default = AdminNoteResolver;
//# sourceMappingURL=AdminNoteResolver.js.map