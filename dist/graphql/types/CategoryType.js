"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = require("graphql-tag");
const CategoryType = (0, graphql_tag_1.gql) `
  type Category {
    id: Int!
    categoryName: String!
    parentCategory: Category
    subcategories: [Category]
    products: [Product]
    createdAt: String!
    updatedAt: String!
  }

  input createCategoryInput {
    categoryName: String!
    parentCategoryId: Int
  }

  type Query {
    getCategory(input: getWithId): Category
  }

  type Mutation {
    createCategory(input: createCategoryInput): Category
  }
`;
exports.default = CategoryType;
//# sourceMappingURL=CategoryType.js.map