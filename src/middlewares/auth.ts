//import * as jwt from "jsonwebtoken";
import { decode } from "next-auth/jwt";

// role 0 superadmin 1 admin 2 kullanıcı
export interface AuthTokenPayload {
  id: string;
  userName: string;
  companyId: string;
  email: string;
  companyName: string;
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
    if (process.env.ORTAM == "DEV") {
      if (cookie) {
        webToken = cookie
          .split("; ")
          .find((cookiee: any) => cookiee.startsWith("next-auth.session-token"))
          ?.split("=")[1];
      }
    } else if (process.env.ORTAM == "PROD") {
      if (cookie) {
        webToken = cookie
          .split("; ")
          .find((cookiee: any) => cookiee.startsWith("__Secure-next-auth.session-token"))
          ?.split("=")[1];
      }
    }

    //console.log(cookie);
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
        if (isAuthTokenPayload(payload, decoded?.role)) {
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

function isAuthTokenPayload(payload: any, role: any): payload is AuthTokenPayload {
  if (role == "1") {
    return (
      typeof payload === "object" &&
      payload !== null &&
      "id" in payload &&
      "userName" in payload &&
      "email" in payload &&
      "createdAt" in payload &&
      "updatedAt" in payload &&
      "role" in payload &&
      "verify" in payload
    );
  } else {
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
      "companyName" in payload
    );
  }
}
