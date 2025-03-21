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
    phoneCode: String
    role: Int
    verify: Boolean
    messages: [Message]
    createdAt: String
    updatedAt: String
  }

  input createAppUserInput {
    userName: String!
    email: String!
    password: String!
    phone: String
    phoneCode: String
  }

  input updateAppUserInput {
    id: Int!
    userName: String
    phone: String
    phoneCode: String
  }

  input changeAppUserPasswordInput {
    id: Int!
    password: String!
    newPassword: String!
  }

  input appUserLoginInput {
    email: String!
    password: String!
  }

  type Query {
    appUserGet(input: getWithId): AppUser
    appUsersGetAll: [AppUser]
  }

  type Mutation {
    appUserCreate(input: createAppUserInput): AppUser
    appUserUpdate(input: updateAppUserInput): AppUser
    appUserChangePassword(input: changeAppUserPasswordInput): msg
    appUserDelete(input: getWithId): msg
    appUserLogin(input: appUserLoginInput): AppUser
  }
`;
exports.default = AppUserType;
//# sourceMappingURL=AppUserType.js.map