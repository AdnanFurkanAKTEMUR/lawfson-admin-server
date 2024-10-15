import { gql } from "graphql-tag";

const CategoryType = gql`
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
  }

  type Mutation {
    createCategory(input: createCategoryInput): Category
    updateCategory(input: updateCategoryInput): Category
    deleteCategory(input: getWithId): msg
  }
`;
export default CategoryType;
