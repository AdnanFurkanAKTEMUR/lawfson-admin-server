"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const ReportProductType = (0, graphql_tag_1.default) `
  type ReportProduct {
    id: Int
    note: String
    company: Company
    appUser: AppUser
    reportedProduct: Product
    createdAt: String
    updatedAt: String
  }

  input createReportInput {
    note: String!
    productId: Int!
    companyId: Int!
  }

  type Query {
    #getReportsWithAppUserId: ReportProduct
    getAllReportsWithAppUserId: [ReportProduct]
    getReportWithCompanyId: [ReportProduct]
  }

  type Mutation {
    createReport(input: createReportInput): msg
  }
`;
exports.default = ReportProductType;
//# sourceMappingURL=ReportProductType.js.map