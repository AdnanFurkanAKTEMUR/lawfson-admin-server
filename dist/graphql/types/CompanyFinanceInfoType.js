"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const CompanyFinanceInfoType = (0, graphql_tag_1.default) `
  type CompanyFinanceInfo {
    id: Int
    billingAddress: String
    billingPhone: String
    billingEmail: String
    billingCountry: String
    billingCity: String
    billingDistrict: String
    billingPostalCode: String
    iban: String
    bankName: String
    currency: String
    company: Company
    createdAt: String
    updatedAt: String
  }
`;
exports.default = CompanyFinanceInfoType;
//# sourceMappingURL=CompanyFinanceInfoType.js.map