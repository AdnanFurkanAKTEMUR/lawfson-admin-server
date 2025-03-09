import gql from "graphql-tag";

const GeneralType = gql`
  input getWithId {
    id: Int!
  }
  input getWithCompanyId {
    companyId: Int!
  }
  type msg {
    status: Boolean
    msg: String
  }
`;
export default GeneralType;
