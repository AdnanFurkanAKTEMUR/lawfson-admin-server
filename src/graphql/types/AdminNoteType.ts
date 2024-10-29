import gql from "graphql-tag";

const AdminNoteType = gql`
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

export default AdminNoteType;
