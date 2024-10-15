"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const ProductType = (0, graphql_tag_1.default) `
  type Product {
    id: Int!
    productName: String!
    category: Category
    createdAt: String
    updatedAt: String
  }

  type Query {
    getProduct(input: getWithId): Product
  }
`;
exports.default = ProductType;
//# sourceMappingURL=ProductType.js.map