import gql from "graphql-tag";

const ProductType = gql`
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

export default ProductType;
