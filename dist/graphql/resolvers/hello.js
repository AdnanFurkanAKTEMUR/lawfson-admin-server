"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HelloResolver = {
    Query: {
        sayHello: async (_parent, _args, context, _info) => {
            const { user } = context;
            console.log(user, "user hello resolvers");
            return { hello: "hello world", adnan: "güncelleme geldi mi?" };
        },
    },
};
exports.default = HelloResolver;
//# sourceMappingURL=hello.js.map