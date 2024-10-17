"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const AppUserType = (0, graphql_tag_1.default) `
  type AppUser {
    id: Int!
    userName: String!
    email: String!
    password: String
    phone: String
    messages: [Message]
    createdAt: String
    updatedAt: String
  }
`;
exports.default = AppUserType;
//# sourceMappingURL=AppUserType.js.map