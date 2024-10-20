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

  input adminUserLoginInput {
    email: String!
    password: String!
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
    adminUserLogin(input: adminUserLoginInput): AdminUser
  }
`;

export default AdminUserType;
