"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const AdminUserType = (0, graphql_tag_1.default) `


  type AdminUser {
    id: Int!
    userName: String!
    email: String!
    role: String!
    company: Company!
    password: String!
    phone: String
    createdAt: String!
    updatedAt: String!
  }

  input createAdminUserInput {
    userName: String!
    email: String!
    role: String!
    companyId: Int!
    password: String!
    phone: String
  }

  input updateAdminUserInput {
    id: Int!
    userName: String
    role: String
    phone: String
  }

  input getAdminUsersOfCompanyInput {
    companyId: Int!
  }

  input changeAdminUserPasswordInput {
    id: Int!
    password: String!
    newPassword: String!
  }

  type Query {
    adminUserGet(input: getWithId): AdminUser
    adminUserGetAll: [AdminUser]
    adminUsersOfCompanyGetAll(input: getAdminUsersOfCompanyInput): [AdminUser]
  }

  type Mutation {
    adminUserCreate(input: createAdminUserInput): AdminUser
    adminUserUpdate(input: updateAdminUserInput): AdminUser
    adminUserChangePassword(input: changeAdminUserPasswordInput): msg
    adminUserDelete(input: getWithId): msg
  }
`;
exports.default = AdminUserType;
//# sourceMappingURL=AdminUserType.js.map