import { Context } from "@contextTypes/contextTypes";
import { AdminNote } from "@entities/AdminNote";
import { AdminUser } from "@entities/AdminUser";
import { Company } from "@entities/Company";
import { Message } from "@entities/Message";

const AdminNoteResolver = {
  Query: {
    adminNotesOfMessage: async (_parent: any, args: any, _context: Context, _info: any): Promise<AdminNote[] | null> => {
      const { messageId } = args.input;
      try {
        const adminNotes = await AdminNote.find({ where: { message: { id: messageId } }, relations: ["adminUser"] });
        return adminNotes;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
  Mutation: {
    adminNoteCreate: async (_parent: any, args: any, context: Context, _info: any): Promise<AdminNote | null> => {
      const { note, messageId } = args.input;
      const { user } = context;
      if (!user || user.id == undefined) throw new Error("Hata:Yetkisiz işlem. Kullanıcı bulunamadı!");

      try {
        const adminUser = await AdminUser.findOne({ where: { id: user.id } });
        if (!adminUser) throw new Error("Hata:Yetkisiz işlem. Kullanıcı bulunamadı!");
        const company = await Company.findOne({ where: { id: user.companyId } });
        if (!company) throw new Error("Hata: Firma bilgileri eksik!");
        const message = await Message.findOne({ where: { id: messageId } });
        if (!message) throw new Error("Hata: Kayıt bulunamadı!");
        const adminNote = AdminNote.create({ note: note });
        adminNote.adminUser = adminUser;
        adminNote.company = company;
        adminNote.message = message;
        await adminNote.save();
        return adminNote;
      } catch (e) {
        throw new Error(e);
      }
    },

    adminNoteDelete: async (_parent: any, args: any, _context: Context, _info: any) => {
      const { id } = args.input;
      try {
        const adminNote = await AdminNote.findOne({ where: { id } });
        if (!adminNote) throw new Error("Not bulunamadı!");
        await AdminNote.remove(adminNote);
        return { status: true, msg: "Silme başarılı!" };
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};

export default AdminNoteResolver;
