"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = require("graphql-tag");
const JobOrderType = (0, graphql_tag_1.gql) `
  type JobOrder {
    id: Int
    note: String
    adminUser: AdminUser
    createdAdminUser: AdminUser
    company: Company
    status: String
    createdAt: String
    updatedAt: String
  }

  type Query {
    getCompanyAllJobOrder: [JobOrder]
    getJobOrder(input: getWithId): JobOrder
  }

  #admin User id ve company id cookie den
  input createJobOrderInput {
    note: String
    adminUserId: Int # atanan kişinin idsi
  }

  input updateJobOrderInput {
    id: Int!
    note: String
    adminUserId: Int # atanan kişinin idsi
    status: String
  }

  type Mutation {
    createJobOrder(input: createJobOrderInput): msg
    updateJobOrder(input: updateJobOrderInput): JobOrder
    deleteJobOrder(input: getWithId): msg
  }
`;
exports.default = JobOrderType;
//# sourceMappingURL=JobOrderType.js.map