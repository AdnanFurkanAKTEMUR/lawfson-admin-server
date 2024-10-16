import gql from "graphql-tag";

const CompanyType = gql`
  type Company {
    id: Int
    companyName: String!
    companyEmail: String!
    companyPhone: String!
    adminUsers: [AdminUser]
    createdAt: String
    updatedAt: String
  }

  input createCompanyInput {
    companyName: String!
    companyEmail: String!
    companyPhone: String!
  }

  input updateCompanyInput {
    id: Int!
    companyName: String!
    companyPhone: String!
  }

  type Query {
    getCompanyWithUsers(input: getWithId): Company
    getAllCompany: [Company]
  }

  type Mutation {
    createCompany(input: createCompanyInput): Company
    updateCompany(input: updateCompanyInput): Company
    deleteCompany(input: getWithId): msg
  }
`;

export default CompanyType;
