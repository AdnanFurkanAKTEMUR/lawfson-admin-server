"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const CompanyAddressType = (0, graphql_tag_1.default) `
  type CompanyAddress {
    id: Int
    address: String
    country: String
    city: String
    district: String
    postalCode: String
    phone: String
    company: Company
    createdAt: String
    updatedAt: String
  }
`;
exports.default = CompanyAddressType;
//# sourceMappingURL=CompanyAddressType.js.map