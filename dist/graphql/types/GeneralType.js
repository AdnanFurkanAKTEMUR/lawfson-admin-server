"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const GeneralType = (0, graphql_tag_1.default) `
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
exports.default = GeneralType;
//# sourceMappingURL=GeneralType.js.map