import gql from "graphql-tag";

const ProductType = gql`
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
    country: String
    city: String
    adDate: String
    category: Category
    company: Company
    clickedRate: Int
    inStock: Boolean
    price: Float
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
    country: String
    price: Float
    city: String
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
    price: Float
    country: String
    city: String
    inStock: Boolean
  }

  input getProductOfCategoryInput {
    categoryId: Int!
  }

  # input getProductOfCompanyInput {
  #   companyId: Int!
  # } bunu sadece user tarafında
  input searchForProductsInput {
    productName: String
    color: String
    city: String
    country: String
    minPrice: String
    maxPrice: String
    categoryId: String
  }
  type Query {
    getProduct(input: getWithId): Product
    getProductOfCategory(input: getProductOfCategoryInput): [Product]
    productsOfCompany: [Product] #companyId zaten tokendan gelecek
    productMostClicked: MostClickedProductType
    productMostClickedThree: [Product]
    searchForProducts(input: searchForProductsInput): [Product]
  }

  type Mutation {
    createProduct(input: createProductInput): Product
    updateProduct(input: updateProductInput): Product
    deleteProduct(input: getWithId): msg
    updateProductClickedRate(input: getWithId): String
  }
`;

export default ProductType;
