import { Context } from "@contextTypes/contextTypes";

const HelloResolver = {
  Query: {
    sayHello: async (_parent: any, _args: any, context: Context, _info: any) => {
      const { user } = context;
      console.log(user, "user hello resolvers");
      return { hello: "hello world" };
    },
  },
};

export default HelloResolver;
