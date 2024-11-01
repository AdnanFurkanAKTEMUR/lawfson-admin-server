import gql from "graphql-tag";

const AdminUserType = gql`
  type AdminUser {
    id: Int!
    userName: String!
    email: String!
    role: String!
    company: Company!
    password: String!
    phone: String
    isRoot: Boolean
    createdAt: String!
    updatedAt: String!
  }

  input createAdminUserInput {
    userName: String!
    email: String!
    role: String!
    password: String!
    phone: String
  }

  input updateAdminUserInput {
    id: Int!
    userName: String
    role: String
    phone: String
  }

  input changeAdminUserPasswordInput {
    id: Int!
    password: String!
    newPassword: String!
  }

  input adminUserLoginInput {
    email: String!
    password: String!
  }

  type Query {
    adminUserGet(input: getWithId): AdminUser
    adminUserGetAll: [AdminUser]
    adminUsersOfCompany: [AdminUser]
    getLogs: [String]
  }

  type Mutation {
    adminUserCreate(input: createAdminUserInput): AdminUser
    adminUserUpdate(input: updateAdminUserInput): AdminUser
    adminUserChangePassword(input: changeAdminUserPasswordInput): msg
    adminUserDelete(input: getWithId): msg
    adminUserLogin(input: adminUserLoginInput): AdminUser
  }
`;

export default AdminUserType;
