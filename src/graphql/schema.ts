import { makeExecutableSchema } from "@graphql-tools/schema";
import { applyMiddleware } from "graphql-middleware";
import { permissions } from "@middlewares/graphqlShield";
import HelloType from "./types/helloType";
import HelloResolver from "./resolvers/hello";
import ProductType from "./types/ProductType";
import CategoryType from "./types/CategoryType";
import ProductResolver from "./resolvers/ProductResolver";
import CategoryResolver from "./resolvers/CategoryResolver";
import GeneralType from "./types/GeneralType";
import CompanyType from "./types/CompanyType";
import AdminUserType from "./types/AdminUserType";
import CompanyResolver from "./resolvers/CompanyResolver";
import AdminUserResolver from "./resolvers/AdminUserResolver";
import MessageType from "./types/MessageType";
import MessageResolver from "./resolvers/MessageResolver";
import AppUserType from "./types/AppUserType";
import AppUserResolver from "./resolvers/AppUserResolver";
import AdminNoteType from "./types/AdminNoteType";
import AdminNoteResolver from "./resolvers/AdminNoteResolver";
import JobOrderType from "./types/JobOrderType";
import JobOrderResolver from "./resolvers/JobOrderResolver";
import AppUserFavoriteProductType from "./types/AppUserFavoriteProductType";
import AppUserFavoriteProductResolver from "./resolvers/AppUserFavoriteProductResolver";

const schema = makeExecutableSchema({
  typeDefs: [AppUserFavoriteProductType, HelloType, ProductType, CategoryType, GeneralType, CompanyType, AdminUserType, MessageType, AppUserType, AdminNoteType, JobOrderType],
  resolvers: [
    AppUserFavoriteProductResolver,
    HelloResolver,
    ProductResolver,
    CategoryResolver,
    CompanyResolver,
    AdminUserResolver,
    MessageResolver,
    AppUserResolver,
    AdminNoteResolver,
    JobOrderResolver,
  ],
});

const shieldedSchema = applyMiddleware(schema, permissions);

export default shieldedSchema;
