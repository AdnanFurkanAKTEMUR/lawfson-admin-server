"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const ProductType = (0, graphql_tag_1.default) `
  type Product {
    id: Int
    productName: String
    category: Category
    company: Company
    createdAt: String
    updatedAt: String
  }

  input createProductInput {
    productName: String
    categoryId: Int
    companyId: Int!
  }

  input updateProductInput {
    id: Int!
    productName: String
    categoryId: Int
  }

  input getProductOfCategoryInput {
    categoryId: Int!
  }

  # input getProductOfCompanyInput {
  #   companyId: Int!
  # } bunu sadece user tarafında

  type Query {
    getProduct(input: getWithId): Product
    getProductOfCategory(input: getProductOfCategoryInput): [Product]
    productsOfCompany: [Product] #companyId zaten tokendan gelecek
  }

  type Mutation {
    createProduct(input: createProductInput): Product
    updateProduct(input: updateProductInput): Product
    deleteProduct(input: getWithId): msg
  }
`;
exports.default = ProductType;
//# sourceMappingURL=ProductType.js.map