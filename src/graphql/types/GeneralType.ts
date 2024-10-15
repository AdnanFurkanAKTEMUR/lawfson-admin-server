import gql from "graphql-tag";

const GeneralType = gql`
  input getWithId {
    id: Int!
  }
`;
export default GeneralType;
