"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const AppUserType = (0, graphql_tag_1.default) `
  type Dashboard {
    mostClickedThreeProduct: [Product]
    messagesPositive: [Message]
    messagesNegative: [Message]
    messagesSizeDaily: Int
    messagesSizeWeekly: Int
    messagesSizeMonthly: Int
  }

  type ProductWithClickedDailyWeeklyMonthly {
    product: Product
    clickedRateDaily: Int
    clickedRateWeekly: Int
    clickedRateMonthly: Int
  }

  type MessagesDailyWeeklyMonthly {
    messagesDaily: Int
    messagesWeekly: Int
    messagesMonthly: Int
  }

  type Query {
    mostClickedThreeProductQuery: [ProductWithClickedDailyWeeklyMonthly]
    messagesDailyWeeklyMonthly: [MessagesDailyWeeklyMonthly]
    lastPosFiveMessages: [Message]
    lastNegFiveMessages: [Message]
  }
`;
exports.default = AppUserType;
//# sourceMappingURL=DashboardType.js.map