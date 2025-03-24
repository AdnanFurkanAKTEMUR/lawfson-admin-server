"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const AppUserFavoriteProductType = (0, graphql_tag_1.default) `
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
exports.default = AppUserFavoriteProductType;
//# sourceMappingURL=AppUserFavoriteProductType.js.map