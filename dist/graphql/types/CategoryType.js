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

  input updateCategoryInput {
    id: Int!
    categoryName: String
    parentCategoryId: Int
  }

  type Query {
    getCategory(input: getWithId): Category
    getCategoryWithSubcategories(input: getWithId): Category
    getAllCategoryTree: [Category]
  }

  type Mutation {
    createCategory(input: createCategoryInput): Category
    updateCategory(input: updateCategoryInput): Category
    deleteCategory(input: getWithId): msg
  }
`;
exports.default = CategoryType;
//# sourceMappingURL=CategoryType.js.map