const HelloResolver = {
  Query: {
    sayHello: async (_parent: any, _args: any, _context: any, _info: any) => {
      return { hello: "hello world" };
    },
  },
};

export default HelloResolver;
