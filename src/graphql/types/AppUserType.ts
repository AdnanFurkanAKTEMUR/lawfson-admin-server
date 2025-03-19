import gql from "graphql-tag";

const AppUserType = gql`
  type AppUser {
    id: Int!
    userName: String!
    email: String!
    password: String
    phone: String
    phoneCode: String
    role: Int
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

  type Query {
    appUserGet(input: getWithId): AppUser
    appUsersGetAll: [AppUser]
  }

  type Mutation {
    appUserCreate(input: createAppUserInput): AppUser
    appUserUpdate(input: updateAppUserInput): AppUser
    appUserChangePassword(input: changeAppUserPasswordInput): msg
    appUserDelete(input: getWithId): msg
  }
`;

export default AppUserType;
