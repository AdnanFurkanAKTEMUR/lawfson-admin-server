"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Company_1 = require("../../entities/Company");
const CompanyAddress_1 = require("../../entities/CompanyAddress");
const CompanyAddressResolver = {
    Query: {
        getCompanyAddress: async (_parent, args, context, _info) => {
            const { id } = args;
            const { user } = context;
            if (!user || !user.companyId)
                throw new Error("Hata: Yetkisiz işlem!");
            try {
                const address = await CompanyAddress_1.CompanyAddress.findOne({ where: { id: id } });
                return address;
            }
            catch (e) {
                throw new Error(e);
            }
        },
    },
    Mutation: {
        createCompanyAddress: async (_parent, args, context, _info) => {
            const { address, country, city, district, postalCode, phone } = args.input;
            const { user } = context;
            if (!user || !user.companyId)
                throw new Error("Hata: Yetkisiz işlem!");
            try {
                if (!address || !country || !city || !district || !postalCode || !phone)
                    throw new Error("Hata: Eksik parametre");
                const company = await Company_1.Company.findOne({ where: { id: user.companyId } });
                if (!company)
                    throw new Error("Hata: Firma bilgisi bulunamadı!");
                const companyAddress = CompanyAddress_1.CompanyAddress.create({ address: address, country: country, city: city, district: district, postalCode: postalCode, phone: phone });
                companyAddress.company = company;
                await companyAddress.save();
                return { status: true, msg: "Adres başarıyla oluşturuldu!" };
            }
            catch (e) {
                throw new Error(e);
            }
        },
        updateCompanyAddress: async (_parent, args, context, _info) => {
            const { id, address, country, city, district, postalCode, phone } = args.input;
            const { user } = context;
            if (!user || !user.companyId)
                throw new Error("Hata: Yetkisiz işlem!");
            try {
                if (!id)
                    throw new Error("Hata: Eksik parametre");
                const companyAddress = await CompanyAddress_1.CompanyAddress.findOne({ where: { id: id } });
                if (!companyAddress)
                    throw new Error("Hata: Adres bilgisi bulunamadı!");
                if (address && companyAddress.address != address)
                    companyAddress.address = address;
                if (country && companyAddress.country != country)
                    companyAddress.country = country;
                if (city && companyAddress.city != city)
                    companyAddress.city = city;
                if (district && companyAddress.district != district)
                    companyAddress.district = district;
                if (postalCode && companyAddress.postalCode != postalCode)
                    companyAddress.postalCode = postalCode;
                if (phone && companyAddress.phone != phone)
                    companyAddress.phone = phone;
                await companyAddress.save();
                return { status: true, msg: "Adres başarıyla güncellendi!" };
            }
            catch (e) {
                throw new Error(e);
            }
        },
        deleteCompanyAddress: async (_parent, args, context, _info) => {
            const { id } = args.input;
            const { user } = context;
            if (!user || !user.companyId)
                throw new Error("Hata: Yetkisiz işlem!");
            try {
                if (!id)
                    throw new Error("Hata: Eksik parametre");
                const companyAddress = await CompanyAddress_1.CompanyAddress.findOne({ where: { id: id } });
                if (!companyAddress)
                    throw new Error("Hata: Adres bilgisi bulunamadı!");
                await CompanyAddress_1.CompanyAddress.remove(companyAddress);
                return { status: true, msg: "Adres başarıyla silindi!" };
            }
            catch (e) {
                throw new Error(e);
            }
        },
    },
};
exports.default = CompanyAddressResolver;
//# sourceMappingURL=CompanyAddressResolver.js.map