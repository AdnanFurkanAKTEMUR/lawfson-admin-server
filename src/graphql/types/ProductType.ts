import gql from "graphql-tag";

const ProductType = gql`
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

  input getProductOfCompanyInput {
    companyId: Int!
  }

  type Query {
    getProduct(input: getWithId): Product
    getProductOfCategory(input: getProductOfCategoryInput): [Product]
    productsOfCompany(input: getProductOfCompanyInput): [Product]
  }

  type Mutation {
    createProduct(input: createProductInput): Product
    updateProduct(input: updateProductInput): Product
    deleteProduct(input: getWithId): msg
  }
`;

export default ProductType;
