import { Context } from "@contextTypes/contextTypes";
import { AppUser } from "@entities/AppUser";
import { Company } from "@entities/Company";
import { Message } from "@entities/Message";
import { Product } from "@entities/Product";

const ProductResolver = {
  Query: {
    messageGet: async (_parent: any, args: any, _context: Context, _info: any): Promise<Message | null> => {
      const { id } = args.input;
      try {
        const message = await Message.findOne({
          where: { id },
        });
        return message;
      } catch (e) {
        throw new Error(e);
      }
    },
    messagesOfCompany: async (_parent: any, args: any, _context: Context, _info: any): Promise<Message[] | null> => {
      const { companyId } = args.input;
      try {
        const message = await Message.find({
          where: { company: companyId },
        });
        return message;
      } catch (e) {
        throw new Error(e);
      }
    },
  },

  Mutation: {
    messageCreate: async (_parent: any, args: any, _context: Context, _info: any): Promise<Message | null> => {
      const { messageHeader, messageText, appUserId, companyId, productId, phone } = args.input;
      //TODO appUserId daha sonra cookie'den alınacak
      try {
        if (!appUserId && !companyId && !productId) throw new Error("Parametreler eksik!");
        const message = Message.create({ messageHeader: messageHeader, messageText: messageText });

        const appUser = await AppUser.findOne({ where: { id: appUserId } });
        if (!appUser) throw new Error("Kullanıcı bulunamadı!");
        if (!appUser.phone && phone) {
          appUser.phone = phone;
          await appUser.save();
        }
        message.appUser = appUser;

        const company = await Company.findOne({ where: { id: companyId } });
        if (!company) throw new Error("Firma bulunamadı!");
        message.company = company;

        const product = await Product.findOne({ where: { id: productId } });
        if (!product) throw new Error("Ürün bulunamadı!");
        message.product = product;

        await message.save();

        return message;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};

export default ProductResolver;
