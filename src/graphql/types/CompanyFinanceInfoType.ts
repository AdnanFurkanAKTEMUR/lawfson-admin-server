import gql from "graphql-tag";

const CompanyFinanceInfoType = gql`
  type CompanyFinanceInfo {
    id: Int
    billingAddress: String
    billingPhone: String
    billingEmail: String
    billingCountry: String
    billingCity: String
    billingDistrict: String
    billingPostalCode: String
    iban: String
    bankName: String
    currency: String
    company: Company
    createdAt: String
    updatedAt: String
  }
`;

export default CompanyFinanceInfoType;
