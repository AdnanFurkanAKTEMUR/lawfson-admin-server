"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissions = void 0;
const graphql_shield_1 = require("graphql-shield");
const isSuperAdmin = (0, graphql_shield_1.rule)()((_parent, _args, context) => {
    var _a;
    return ((_a = context.user) === null || _a === void 0 ? void 0 : _a.role) === "superadmin";
});
const isCompanyUser = (0, graphql_shield_1.rule)()((_parent, _args, context) => {
    var _a;
    return ((_a = context.user) === null || _a === void 0 ? void 0 : _a.role) === "1";
});
const isAuthenticated = (0, graphql_shield_1.rule)()((_parent, _args, context) => {
    var _a;
    return ((_a = context.user) === null || _a === void 0 ? void 0 : _a.id) !== undefined;
});
exports.permissions = (0, graphql_shield_1.shield)({
    Query: {
        sayHello: (0, graphql_shield_1.or)(isSuperAdmin, isCompanyUser, (0, graphql_shield_1.not)(isAuthenticated)),
    },
    Mutation: {},
}, {
    fallbackError: new Error("Erişim izni reddedildi!"),
    allowExternalErrors: true,
});
//# sourceMappingURL=graphqlShield.js.map