
import { Context } from "@contextTypes/contextTypes";
import { rule, shield, or, not } from "graphql-shield";
//and

const isAdmin = rule()((_parent, _args, context: Context) => {
  return context.user?.role === 0;
});

const isCompanyUser = rule()((_parent, _args, context: Context) => {
  return context.user?.role === 1;
});

const isAuthenticated = rule()((_parent, _args, context: Context) => {
  return context.user?.id !== undefined;
});

export const permissions = shield(
  {
    Query: {
      sayHello: or(isAdmin, isCompanyUser, not(isAuthenticated)),
      // adminOnlyQuery: isAdmin,
      // regularUserQuery: or(isAdmin, isCompanyUser),
      // publicQuery: or(isAdmin, isCompanyUser, not(isAuthenticated)),
    },
    Mutation: {
      // adminOnlyMutation: isAdmin,
    },
  },
  {
    fallbackError: new Error("Erişim izni reddedildi!"),
    allowExternalErrors: true,
  }
);
