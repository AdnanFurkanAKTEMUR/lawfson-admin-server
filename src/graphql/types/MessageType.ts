import gql from "graphql-tag";

const MessageType = gql`
  type Message {
    id: Int!
    messageHeader: String!
    messageText: String!
    phone: String
    adminNote: String
    isReturn: Boolean
    returnedAdmin: AdminUser
    appUser: AppUser
    company: Company
    product: Product
    createdAt: String
    updatedAt: String
  }

  input updateMessageInput {
    id: Int!
    adminNote: String
    isReturn: Boolean
  }

  input createMessageInput {
    messageHeader: String!
    messageText: String!
    appUserId: Int!
    companyId: Int!
    productId: Int!
    phone: String
  }
  #appUser'da phone zorunlu değil. mesaj bırakan kullanıcı eğer varsa phonu gelir yoksa önce isteriz

  type Query {
    messageGet(input: getWithId): Message
    messagesOfCompany: [Message]
  }

  #create fonksiyonu user-backende taşınacak! test için şimdilik burada
  type Mutation {
    messageCreate(input: createMessageInput): msg
    messageUpdate(input: updateMessageInput): Message
    messageDelete(input: getWithId): msg
  }
`;

export default MessageType;
