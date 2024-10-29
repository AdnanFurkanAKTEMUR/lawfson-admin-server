"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const MessageType = (0, graphql_tag_1.default) `
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

  input updateMessageInput {
    id: Int!
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
exports.default = MessageType;
//# sourceMappingURL=MessageType.js.map