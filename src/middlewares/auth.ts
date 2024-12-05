import { decode } from "next-auth/jwt";

// role 0 superadmin 1 admin 2 kullanıcı
export interface AuthTokenPayload {
  id: number;
  userName: string;
  companyId: string;
  email: string;
  companyName: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export const auth = async (_header: string, cookies: Record<string, string>): Promise<AuthTokenPayload | null> => {
  try {
    let webToken: string | undefined;

    // Ortama göre cookie adını belirleme
    const tokenName = process.env.ORTAM === "PROD" ? "__Secure-next-auth.session-token" : "next-auth.session-token";

    // cookie-parser ile alınan cookie'den token seçimi
    webToken = cookies[tokenName];

    // Eğer webToken bulunamazsa hata fırlat
    if (!webToken) {
      throw new Error("Invalid Token");
    }

    // Token'ı decode et
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

    return null;
  } catch (error) {
    console.error("Authentication Error:", error);
    return null;
  }
};

// Gelen decoded token'ın doğru bir AuthTokenPayload olup olmadığını kontrol et
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
    "companyName" in payload
  );
}
