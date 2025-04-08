"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const CompanyType = (0, graphql_tag_1.default) `
  type Company {
    id: Int
    companyName: String!
    companyEmail: String!
    companyPhone: String!
    companyTaxNumber: String
    companyTaxOffice: String
    status: String
    registrationNumber: String
    description: String
    sector: String
    companyType: String
    website: String
    companyAddresses: [CompanyAddress]
    companyFinanceInfos: [CompanyFinanceInfo]
    jobOrders: [JobOrder]
    adminUsers: [AdminUser]
    products: [Product]
    messages: [Message]
    createdAt: String
    updatedAt: String
  }

  input createCompanyInput {
    companyName: String!
    companyEmail: String!
    companyPhone: String!
    companyTaxNumber: String
    companyTaxOffice: String
    status: String
    registrationNumber: String
    description: String
    sector: String
    companyType: String
    website: String
  }

  input updateCompanyInput {
    companyTaxNumber: String
    companyTaxOffice: String
    status: String
    registrationNumber: String
    description: String
    sector: String
    companyType: String
    website: String
  }

  type Query {
    getCompanyWithUsers(input: getWithId): Company
    getAllCompany: [Company]
  }

  type Mutation {
    createCompany(input: createCompanyInput): Company
    updateCompany(input: updateCompanyInput): Company
    deleteCompany(input: getWithId): msg
  }
`;
exports.default = CompanyType;
//# sourceMappingURL=CompanyType.js.map