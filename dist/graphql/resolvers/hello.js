"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HelloResolver = {
    Query: {
        sayHello: async (_parent, _args, _context, _info) => {
            return { hello: "hello world", adnan: "güncelleme geldi mi?" };
        },
    },
};
exports.default = HelloResolver;
//# sourceMappingURL=hello.js.map