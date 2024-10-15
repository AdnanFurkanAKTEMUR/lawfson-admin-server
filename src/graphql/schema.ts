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

const schema = makeExecutableSchema({
  typeDefs: [HelloType, ProductType, CategoryType, GeneralType],
  resolvers: [HelloResolver, ProductResolver, CategoryResolver],
});

const shieldedSchema = applyMiddleware(schema, permissions);

export default shieldedSchema;
