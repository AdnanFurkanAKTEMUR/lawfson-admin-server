import { Context } from "@contextTypes/contextTypes";
import { AdminUser } from "@entities/AdminUser";
import { AppUser } from "@entities/AppUser";
import { Company } from "@entities/Company";
import { Message } from "@entities/Message";
import { Product } from "@entities/Product";
import { loggerInfo } from "@helpers/logger";
import { Between } from "typeorm";
import { startOfWeek, startOfMonth } from "date-fns";

const MessageResolver = {
  Query: {
    messageGet: async (_parent: any, args: any, context: Context, _info: any): Promise<Message | null> => {
      const { id } = args.input;
      const { user } = context;

      if (!user || user.id == undefined) throw new Error("Hata: Yetkisiz İşlem. Kullanıcı bulunamadı!");
      try {
        const message = await Message.findOne({
          where: { id },
          relations: ["product", "appUser", "returnedAdmin", "product.category"],
        });
        loggerInfo(user.companyName, user.companyId, "Message", user.userName, user.id, `Mesaja girildi. Mesaj id: ${id}`);
        return message;
      } catch (e) {
        throw new Error(e);
      }
    },
    messagesOfCompany: async (_parent: any, _args: any, context: Context, _info: any): Promise<Message[] | null> => {
      const { user } = context;

      if (!user || user.id == undefined) throw new Error("Hata: Yetkisiz İşlem. Kullanıcı bulunamadı!");
      try {
        const message = await Message.find({
          where: { company: { id: user.companyId } },
          relations: ["product", "appUser", "returnedAdmin"],
        });
        loggerInfo(user.companyName, user.companyId, "Message", user.userName, user.id, "Mesajlar Listelendi");
        return message;
      } catch (e) {
        throw new Error(e);
      }
    },
    latestMessagesByReturnStatus: async (_parent: any, _args: any, context: Context) => {
      const { user } = context;
      if (!user || !user.companyId) throw new Error("Hata: Yetkisiz İşlem!");

      try {
        // 📌 Dönüş Yapılan İlk 5 Mesaj
        const returnedMessages = await Message.find({
          where: {
            company: { id: user.companyId },
            isReturn: true,
          },
          order: { createdAt: "DESC" }, // En son eklenenleri getir
          take: 5, // İlk 5 mesaj
          relations: ["appUser", "returnedAdmin"], // İlişkili tabloları getir
        });
        console.log(returnedMessages);
        // 📌 Dönüş Yapılmayan İlk 5 Mesaj
        const notReturnedMessages = await Message.find({
          where: {
            company: { id: user.companyId },
            isReturn: false,
          },
          order: { createdAt: "DESC" },
          take: 5,
          relations: ["appUser", "product"], // Sadece kullanıcı bilgisi yeterli
        });

        return {
          returnedMessages,
          notReturnedMessages,
        };
      } catch (error) {
        throw new Error(`Hata: ${error.message}`);
      }
    },
    messageCounts: async (_parent: any, _args: any, context: Context) => {
      const { user } = context;
      if (!user || !user.companyId) throw new Error("Hata: Yetkisiz İşlem!");

      try {
        const today = new Date();
        const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const startOfThisWeek = startOfWeek(today, { weekStartsOn: 1 }); // Pazartesi'den itibaren
        const startOfThisMonth = startOfMonth(today);

        // 📌 Günlük Mesaj Sayısı
        const dailyCount = await Message.count({
          where: {
            company: { id: user.companyId },
            createdAt: Between(startOfToday, today),
          },
        });

        // 📌 Haftalık Mesaj Sayısı
        const weeklyCount = await Message.count({
          where: {
            company: { id: user.companyId },
            createdAt: Between(startOfThisWeek, today),
          },
        });

        // 📌 Aylık Mesaj Sayısı
        const monthlyCount = await Message.count({
          where: {
            company: { id: user.companyId },
            createdAt: Between(startOfThisMonth, today),
          },
        });

        return { dailyCount, weeklyCount, monthlyCount };
      } catch (error) {
        throw new Error(`Hata: ${error.message}`);
      }
    },
    getAppUserMessages: async (_parent: any, _args: any, context: Context, _info: any) => {
      const { user } = context;

      if (!user || user.id == undefined) throw new Error("Hata: Yetkisiz İşlem. Kullanıcı bulunamadı!");
      try {
        const message = await Message.find({ where: { appUser: { id: user.id } }, relations: ["product", "product.category", "appUser", "returnedAdmin", "company"] });
        if (!message) throw new Error("Belirtilen kayıt bulunamadı!");

        loggerInfo(user.companyName, user.companyId, "Message", user.userName, user.id, `Mesajlar Listelendi. Kullanıcı id: ${user.id}`);
        return message;
      } catch (e) {
        throw new Error(e);
      }
    },
    getAppUserMessage: async (_parent: any, args: any, context: Context, _info: any) => {
      const { id } = args.input;
      const { user } = context;
      console.log(id, user);
      if (!user || user.id == undefined) throw new Error("Hata: Yetkisiz İşlem. Kullanıcı bulunamadı!");
      try {
        const message = await Message.findOne({ where: { id }, relations: ["product", "product.category", "appUser", "returnedAdmin", "company"] });
        if (!message) throw new Error("Belirtilen kayıt bulunamadı!");

        loggerInfo(user.companyName, user.companyId, "Message", user.userName, user.id, `Mesaja girildi. Mesaj id: ${id}`);
        return message;
      } catch (e) {
        throw new Error(e);
      }
    },
  },

  Mutation: {
    messageCreate: async (_parent: any, args: any, context: Context, _info: any) => {
      const { messageHeader, messageText, companyId, productId, phone } = args.input;
      const { user } = context;
      if (!user || !user.id) throw new Error("Hata: Yetkisiz İşlem!");
      try {
        if (!companyId && !productId) throw new Error("Parametreler eksik!");
        const message = Message.create({ messageHeader: messageHeader, messageText: messageText, phone: phone });

        const appUser = await AppUser.findOne({ where: { id: user.id } });
        if (!appUser) throw new Error("Kullanıcı bulunamadı!");

        message.appUser = appUser;

        const company = await Company.findOne({ where: { id: companyId } });
        if (!company) throw new Error("Firma bulunamadı!");
        message.company = company;

        const product = await Product.findOne({ where: { id: productId } });
        if (!product) throw new Error("Ürün bulunamadı!");
        message.product = product;

        await message.save();

        return { status: true, msg: "Mesaj başarılı bir şekilde oluşturuldu!" };
      } catch (e) {
        throw new Error(e);
      }
    },
    messageUpdate: async (_parent: any, args: any, context: Context, _info: any): Promise<Message | null> => {
      const { id, isReturn } = args.input;
      const { user } = context;
      if (!user || user.id == undefined) throw new Error("Hata:Yetkisiz işlem. Kullanıcı bulunamadı!");
      try {
        const message = await Message.findOne({ where: { id } });
        if (!message) throw new Error("Belirtilen kayıt bulunamadı!");

        if (isReturn) {
          message.isReturn = isReturn;
        } else {
          message.isReturn = false;
        }
        const adminUser = await AdminUser.findOne({ where: { id: user.id } });
        if (!adminUser) throw new Error("Hata:Admin kullanıcı bulunamadı!");
        message.returnedAdmin = adminUser;
        await message.save();
        loggerInfo(user.companyName, user.companyId, "Message", user.userName, user.id, `Mesaja güncellendi. Mesaj id: ${id}`);
        return message;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};

export default MessageResolver;
