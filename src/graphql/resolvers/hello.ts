const HelloResolver = {
  Query: {
    sayHello: async (_parent: any, _args: any, context: any, _info: any) => {
      const { user } = context;
      console.log(user, "user");
      return { hello: "hello world" };
    },
  },
};

export default HelloResolver;
