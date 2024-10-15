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

  type Query {
    getCategory(input: getWithId): Category
  }

  type Mutation {
    createCategory(input: createCategoryInput): Category
  }
`;
export default CategoryType;
