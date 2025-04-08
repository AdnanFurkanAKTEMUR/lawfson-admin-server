import { Context } from "@contextTypes/contextTypes";
import { Company } from "@entities/Company";
import { CompanyAddress } from "@entities/CompanyAddress";

const CompanyAddressResolver = {
  Query: {
    getCompanyAddress: async (_parent: any, args: any, context: Context, _info: any) => {
      const { id } = args;
      const { user } = context;
      if (!user || !user.companyId) throw new Error("Hata: Yetkisiz işlem!");
      try {
        const address = await CompanyAddress.findOne({ where: { id: id } });
        return address;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
  Mutation: {
    createCompanyAddress: async (_parent: any, args: any, context: Context, _info: any) => {
      const { address, country, city, district, postalCode, phone } = args.input;
      const { user } = context;
      if (!user || !user.companyId) throw new Error("Hata: Yetkisiz işlem!");
      try {
        if (!address || !country || !city || !district || !postalCode || !phone) throw new Error("Hata: Eksik parametre");

        const company = await Company.findOne({ where: { id: user.companyId } });
        if (!company) throw new Error("Hata: Firma bilgisi bulunamadı!");
        const companyAddress = CompanyAddress.create({ address: address, country: country, city: city, district: district, postalCode: postalCode, phone: phone });
        companyAddress.company = company;
        await companyAddress.save();
        return { status: true, msg: "Adres başarıyla oluşturuldu!" };
      } catch (e) {
        throw new Error(e);
      }
    },
    updateCompanyAddress: async (_parent: any, args: any, context: Context, _info: any) => {
      const { id, address, country, city, district, postalCode, phone } = args.input;
      const { user } = context;
      if (!user || !user.companyId) throw new Error("Hata: Yetkisiz işlem!");
      try {
        if (!id) throw new Error("Hata: Eksik parametre");
        const companyAddress = await CompanyAddress.findOne({ where: { id: id } });
        if (!companyAddress) throw new Error("Hata: Adres bilgisi bulunamadı!");
        if (address && companyAddress.address != address) companyAddress.address = address;
        if (country && companyAddress.country != country) companyAddress.country = country;
        if (city && companyAddress.city != city) companyAddress.city = city;
        if (district && companyAddress.district != district) companyAddress.district = district;
        if (postalCode && companyAddress.postalCode != postalCode) companyAddress.postalCode = postalCode;
        if (phone && companyAddress.phone != phone) companyAddress.phone = phone;
        await companyAddress.save();
        return { status: true, msg: "Adres başarıyla güncellendi!" };
      } catch (e) {
        throw new Error(e);
      }
    },
    deleteCompanyAddress: async (_parent: any, args: any, context: Context, _info: any) => {
      const { id } = args.input;
      const { user } = context;
      if (!user || !user.companyId) throw new Error("Hata: Yetkisiz işlem!");
      try {
        if (!id) throw new Error("Hata: Eksik parametre");
        const companyAddress = await CompanyAddress.findOne({ where: { id: id } });
        if (!companyAddress) throw new Error("Hata: Adres bilgisi bulunamadı!");
        await CompanyAddress.remove(companyAddress);
        return { status: true, msg: "Adres başarıyla silindi!" };
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};

export default CompanyAddressResolver;
