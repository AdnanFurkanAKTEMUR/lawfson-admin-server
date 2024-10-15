"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HelloResolver = {
    Query: {
        sayHello: async (_parent, _args, context, _info) => {
            const { user } = context;
            console.log(user, "user");
            return { hello: "hello world" };
        },
    },
};
exports.default = HelloResolver;
//# sourceMappingURL=hello.js.map