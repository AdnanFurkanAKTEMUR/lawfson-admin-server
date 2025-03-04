import gql from "graphql-tag";

const ProductType = gql`
  type Product {
    id: Int
    productName: String
    brand: String
    image: String
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
    image: String
    widths: String
    length: String
    thickness: String
    color: String
    origin: String
    surfaceTreatment: String
    description: String
    onAd: Boolean
    location: String
  }

  input updateProductInput {
    id: Int!
    productName: String
    brand: String
    categoryId: Int
    image: String
    widths: String
    length: String
    thickness: String
    color: String
    origin: String
    surfaceTreatment: String
    description: String
    onAd: Boolean
    location: String
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
  }

  type Mutation {
    createProduct(input: createProductInput): Product
    updateProduct(input: updateProductInput): Product
    deleteProduct(input: getWithId): msg
    updateProductClickedRate(input: getWithId): String
  }
`;

export default ProductType;
