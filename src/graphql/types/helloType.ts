import { gql } from "graphql-tag";

const HelloType = gql`
  type Hello {
    hello: String
    adnan: String
  }

  type Query {
    sayHello: Hello
  }

  type Mutation {
    sayHello2: Hello
  }
`;

export default HelloType;
