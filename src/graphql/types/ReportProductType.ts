import gql from "graphql-tag";

const ReportProductType = gql`
  type ReportProduct {
    id: Int
    note: String
    company: Company
    appUser: AppUser
    reportedProduct: Product
    createdAt: String
    updatedAt: String
  }

  input createReportInput {
    note: String!
    productId: Int!
    companyId: Int!
  }

  type Query {
    #getReportsWithAppUserId: ReportProduct
    getAllReportsWithAppUserId: [ReportProduct]
    getReportWithCompanyId: [ReportProduct]
  }

  type Mutation {
    createReport(input: createReportInput): msg
  }
`;

export default ReportProductType;
