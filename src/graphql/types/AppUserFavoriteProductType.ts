import gql from "graphql-tag";

const AppUserFavoriteProductType = gql`
  type AppUserFavoriteProduct {
    id: Int
    product: Product
    appUser: AppUser
    createdAt: String
    updatedAt: String
  }

  type isFavorite {
    result: Boolean
  }
  type ProductFavoritesCount {
    count: Int
    product: Product
  }

  input getProductFavoritesCountInput {
    productId: String
  }

  type Query {
    getAppUserFavoritesProduct: [AppUserFavoriteProduct]
    isFavorite(input: getWithId): isFavorite
    #getProductFavoritesCount(input: getProductFavoritesCountInput): ProductFavoritesCount
  }

  input createFavoriteProductInput {
    productId: String
  }
  type Mutation {
    createFavoriteProduct(input: createFavoriteProductInput): msg
    deleteFavoriteProduct(input: getWithId): msg
  }
`;

export default AppUserFavoriteProductType;
