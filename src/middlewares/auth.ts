//import * as jwt from "jsonwebtoken";
import { decode } from "next-auth/jwt";

// role 0 superadmin 1 admin 2 kullanıcı
export interface AuthTokenPayload {
  id: number;
  userName: string;
  companyId: string;
  email: string;
  company: any;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export const auth = async (_header: string, cookie: any): Promise<AuthTokenPayload | null> => {
  try {
    //burası mobilden gelen token iiçn
    // const token = header.split(" ")[1] || "";
    //burası web tarafından gelen token için
    let webToken: any;
    if (cookie) {
      const next_auth_session_token = cookie.split(" ")[2];
      const equalText = next_auth_session_token.indexOf("=");
      webToken = next_auth_session_token.substring(equalText + 1);
    }

    // if (!token && !webToken) {
    //   throw new Error("Invalid Token");
    // }
    if (!webToken) throw new Error("Invalid Token");
    if (webToken) {
      const decoded = await decode({
        token: webToken,
        secret: process.env.NEXTAUTH_SECRET || "",
      });

      if (decoded) {
        const payload = decoded as unknown;
        if (isAuthTokenPayload(payload)) {
          return payload;
        }
      }
    }

    // if (token) {
    //   const verified = jwt.verify(token, process.env.TOKEN_SECRET as jwt.Secret);
    //   const payload = verified as unknown;
    //   if (isAuthTokenPayload(payload)) {
    //     payload.from = "mobil";
    //     return payload;
    //   }
    // }

    return null;
  } catch (error) {
    return null;
  }
};

function isAuthTokenPayload(payload: any): payload is AuthTokenPayload {
  return (
    typeof payload === "object" &&
    payload !== null &&
    "id" in payload &&
    "userName" in payload &&
    "email" in payload &&
    "createdAt" in payload &&
    "updatedAt" in payload &&
    "role" in payload &&
    "companyId" in payload &&
    "company" in payload
  );
}
