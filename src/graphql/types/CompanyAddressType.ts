import gql from "graphql-tag";

const CompanyAddressType = gql`
  type CompanyAddress {
    id: Int
    address: String
    country: String
    city: String
    district: String
    postalCode: String
    phone: String
    company: Company
    createdAt: String
    updatedAt: String
  }

  input createCompanyAddressInput {
    address: String!
    country: String!
    city: String!
    district: String!
    postalCode: String!
    phone: String!
  }

  input updateCompanyAddressInput {
    id: Int!
    address: String
    country: String
    city: String
    district: String
    postalCode: String
    phone: String
  }

  type Query {
    getCompanyAddress(input: getWithId): CompanyAddress
  }

  type Mutation {
    createCompanyAddress(input: createCompanyAddressInput): msg
    updateCompanyAddress(input: updateCompanyAddressInput): msg
    deleteCompanyAddress(input: getWithId): msg
  }
`;

export default CompanyAddressType;
