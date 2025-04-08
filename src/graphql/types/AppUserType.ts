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
    verify: Boolean
    note: String
    messages: [Message]
    reportedProducts: [Product]
    favoriteProducts: [AppUserFavoriteProduct]
    createdAt: String
    updatedAt: String
  }

  input createAppUserInput {
    userName: String!
    email: String!
    password: String!
    phone: String
    phoneCode: String
    note: String
  }

  input updateAppUserInput {
    id: Int!
    userName: String
    phone: String
    phoneCode: String
    note: String
  }

  input changeAppUserPasswordInput {
    password: String!
    newPassword: String!
  }

  input appUserLoginInput {
    email: String!
    password: String!
  }

  type Query {
    appUserGet: AppUser
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

export default AppUserType;
