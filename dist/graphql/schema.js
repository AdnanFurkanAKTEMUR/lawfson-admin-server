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
const CompanyType_1 = __importDefault(require("./types/CompanyType"));
const AdminUserType_1 = __importDefault(require("./types/AdminUserType"));
const CompanyResolver_1 = __importDefault(require("./resolvers/CompanyResolver"));
const AdminUserResolver_1 = __importDefault(require("./resolvers/AdminUserResolver"));
const MessageType_1 = __importDefault(require("./types/MessageType"));
const MessageResolver_1 = __importDefault(require("./resolvers/MessageResolver"));
const AppUserType_1 = __importDefault(require("./types/AppUserType"));
const AppUserResolver_1 = __importDefault(require("./resolvers/AppUserResolver"));
const schema = (0, schema_1.makeExecutableSchema)({
    typeDefs: [helloType_1.default, ProductType_1.default, CategoryType_1.default, GeneralType_1.default, CompanyType_1.default, AdminUserType_1.default, MessageType_1.default, AppUserType_1.default],
    resolvers: [hello_1.default, ProductResolver_1.default, CategoryResolver_1.default, CompanyResolver_1.default, AdminUserResolver_1.default, MessageResolver_1.default, AppUserResolver_1.default],
});
const shieldedSchema = (0, graphql_middleware_1.applyMiddleware)(schema, graphqlShield_1.permissions);
exports.default = shieldedSchema;
//# sourceMappingURL=schema.js.map