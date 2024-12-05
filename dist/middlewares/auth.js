"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jwt_1 = require("next-auth/jwt");
const auth = async (_header, cookies) => {
    try {
        let webToken;
        const tokenName = process.env.ORTAM === "PROD" ? "__Secure-next-auth.session-token" : "next-auth.session-token";
        webToken = cookies[tokenName];
        if (!webToken) {
            throw new Error("Invalid Token");
        }
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
        return null;
    }
    catch (error) {
        console.error("Authentication Error:", error);
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