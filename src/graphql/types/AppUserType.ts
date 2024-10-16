import gql from "graphql-tag";

const AppUserType = gql`
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
`

export default AppUserType