"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const AdminNoteType = (0, graphql_tag_1.default) `
  type AdminNote {
    id: Int!
    note: String
    adminUser: AdminUser
    company: Company
    message: Message
    createdAt: String
    updatedAt: String
  }

  input adminNotesInput {
    messageId: Int!
  }

  input adminNoteCreateInput {
    note: String!
    messageId: Int!
    #companyId ve adminUserId contexten
  }

  type Query {
    adminNotesOfMessage(input: adminNotesInput): [AdminNote]
  }

  type Mutation {
    adminNoteCreate(input: adminNoteCreateInput): AdminNote
    adminNoteDelete(input: getWithId): msg
  }
`;
exports.default = AdminNoteType;
//# sourceMappingURL=AdminNoteType.js.map