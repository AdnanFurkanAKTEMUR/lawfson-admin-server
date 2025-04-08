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
`;

export default CompanyAddressType;
