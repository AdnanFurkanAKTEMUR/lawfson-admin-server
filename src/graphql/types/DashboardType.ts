import gql from "graphql-tag";

const AppUserType = gql`
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

export default AppUserType;
