import gql from "graphql-tag";

const MessageType = gql`
  type Message {
    id: Int!
    messageHeader: String!
    messageText: String!
    phone: String
    adminNotes: [AdminNote]
    isReturn: Boolean
    returnedAdmin: AdminUser
    appUser: AppUser
    company: Company
    product: Product
    createdAt: String
    updatedAt: String
  }

  type messageCounts {
    dailyCount: Int
    weeklyCount: Int
    monthlyCount: Int
  }

  input updateMessageInput {
    id: Int!
    isReturn: Boolean
  }

  input createMessageInput {
    messageHeader: String!
    messageText: String!

    companyId: Int!
    productId: Int!
    phone: String
  }

  type latestMessagesByReturnStatusType {
    returnedMessages: [Message]
    notReturnedMessages: [Message]
  }
  #appUser'da phone zorunlu değil. mesaj bırakan kullanıcı eğer varsa phonu gelir yoksa önce isteriz

  type Query {
    messageGet(input: getWithId): Message
    messagesOfCompany: [Message]
    messageCounts: messageCounts
    latestMessagesByReturnStatus: latestMessagesByReturnStatusType
    getAppUserMessages: [Message]
    getAppUserMessage(input: getWithId): Message
  }

  #create fonksiyonu user-backende taşınacak! test için şimdilik burada
  type Mutation {
    messageCreate(input: createMessageInput): msg
    messageUpdate(input: updateMessageInput): Message
    messageDelete(input: getWithId): msg
  }
`;

export default MessageType;
