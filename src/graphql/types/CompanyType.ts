import gql from "graphql-tag";

const CompanyType = gql`
  type Company {
    id: Int
    companyName: String!
    companyEmail: String!
    companyPhone: String!
    companyTaxNumber: String
    companyTaxOffice: String
    status: String
    registrationNumber: String
    description: String
    sector: String
    companyType: String
    website: String
    companyAddresses: [CompanyAddress]
    companyFinanceInfos: [CompanyFinanceInfo]
    jobOrders: [JobOrder]
    adminUsers: [AdminUser]
    products: [Product]
    messages: [Message]
    createdAt: String
    updatedAt: String
  }

  input createCompanyInput {
    companyName: String!
    companyEmail: String!
    companyPhone: String!
    companyTaxNumber: String
    companyTaxOffice: String
    status: String
    registrationNumber: String
    description: String
    sector: String
    companyType: String
    website: String
  }

  input updateCompanyInput {
    companyTaxNumber: String
    companyTaxOffice: String
    status: String
    registrationNumber: String
    description: String
    sector: String
    companyType: String
    website: String
  }

  type Query {
    getCompanyWithUsers(input: getWithId): Company
    getAllCompany: [Company]
    getCompany: Company
  }

  type Mutation {
    createCompany(input: createCompanyInput): Company
    updateCompany(input: updateCompanyInput): Company
    deleteCompany(input: getWithId): msg
  }
`;

export default CompanyType;
