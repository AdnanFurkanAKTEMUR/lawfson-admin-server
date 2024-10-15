"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("@graphql-tools/schema");
const graphql_middleware_1 = require("graphql-middleware");
const graphqlShield_1 = require("../middlewares/graphqlShield");
const helloType_1 = __importDefault(require("./types/helloType"));
const hello_1 = __importDefault(require("./resolvers/hello"));
const ProductType_1 = __importDefault(require("./types/ProductType"));
const CategoryType_1 = __importDefault(require("./types/CategoryType"));
const ProductResolver_1 = __importDefault(require("./resolvers/ProductResolver"));
const CategoryResolver_1 = __importDefault(require("./resolvers/CategoryResolver"));
const GeneralType_1 = __importDefault(require("./types/GeneralType"));
const schema = (0, schema_1.makeExecutableSchema)({
    typeDefs: [helloType_1.default, ProductType_1.default, CategoryType_1.default, GeneralType_1.default],
    resolvers: [hello_1.default, ProductResolver_1.default, CategoryResolver_1.default],
});
const shieldedSchema = (0, graphql_middleware_1.applyMiddleware)(schema, graphqlShield_1.permissions);
exports.default = shieldedSchema;
//# sourceMappingURL=schema.js.map