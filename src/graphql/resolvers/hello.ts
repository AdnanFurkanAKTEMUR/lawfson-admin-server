import { Context } from "@contextTypes/contextTypes";

const HelloResolver = {
  Query: {
    sayHello: async (_parent: any, _args: any, _context: Context, _info: any) => {
      // const { user } = context;

      return { hello: "hello world", adnan: "güncelleme geldi mi?" };
    },
  },
};

export default HelloResolver;
