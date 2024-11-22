"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jwt_1 = require("next-auth/jwt");
const auth = async (_header, cookie) => {
    var _a;
    try {
        let webToken;
        if (cookie) {
            webToken = (_a = cookie
                .split("; ")
                .find((cookiee) => cookiee.startsWith("next-auth.session-token"))) === null || _a === void 0 ? void 0 : _a.split("=")[1];
        }
        if (!webToken)
            throw new Error("Invalid Token");
        if (webToken) {
            const decoded = await (0, jwt_1.decode)({
                token: webToken,
                secret: process.env.NEXTAUTH_SECRET || "",
            });
            if (decoded) {
                const payload = decoded;
                if (isAuthTokenPayload(payload)) {
                    return payload;
                }
            }
        }
        return null;
    }
    catch (error) {
        return null;
    }
};
exports.auth = auth;
function isAuthTokenPayload(payload) {
    return (typeof payload === "object" &&
        payload !== null &&
        "id" in payload &&
        "userName" in payload &&
        "email" in payload &&
        "createdAt" in payload &&
        "updatedAt" in payload &&
        "role" in payload &&
        "companyId" in payload &&
        "companyName" in payload);
}
//# sourceMappingURL=auth.js.map