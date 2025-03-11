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
    brand: String
    images: [String]
    widths: String
    length: String
    thickness: String
    color: String
    origin: String
    surfaceTreatment: String
    description: String
    onAd: Boolean
    location: String
    adDate: String
    category: Category
    company: Company
    clickedRate: Int
    inStock: Boolean
    createdAt: String
    updatedAt: String
  }

  type MostClickedProductType {
    daily: [Product]
    weekly: [Product]
    monthly: [Product]
  }

  input createProductInput {
    productName: String!
    categoryId: Int
    brand: String
    images: [String]
    widths: String
    length: String
    thickness: String
    color: String
    origin: String
    surfaceTreatment: String
    description: String
    onAd: Boolean
    location: String
    inStock: Boolean
  }

  input updateProductInput {
    id: Int!
    productName: String
    brand: String
    categoryId: Int
    images: [String]
    widths: String
    length: String
    thickness: String
    color: String
    origin: String
    surfaceTreatment: String
    description: String
    onAd: Boolean
    location: String
    inStock: Boolean
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
    productMostClicked: MostClickedProductType
    productMostClickedThree: [Product]
  }

  type Mutation {
    createProduct(input: createProductInput): Product
    updateProduct(input: updateProductInput): Product
    deleteProduct(input: getWithId): msg
    updateProductClickedRate(input: getWithId): String
  }
`;
exports.default = ProductType;
//# sourceMappingURL=ProductType.js.map