"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = require("graphql-tag");
const HelloType = (0, graphql_tag_1.gql) `
  type Hello {
    hello: String
  }

  type Query {
    sayHello: Hello
  }

  type Mutation {
    sayHello2: Hello
  }
`;
exports.default = HelloType;
//# sourceMappingURL=helloType.js.map