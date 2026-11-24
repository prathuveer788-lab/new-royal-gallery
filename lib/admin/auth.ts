import { cookies } from "next/headers";
import crypto from "crypto";

export const ADMIN_PASSCODE = process.env.EDITORIAL_ADMIN_KEY || "GSingh1977@@";
export const ADMIN_COOKIE_NAME = "rg_admin_token";

export const ADMIN_LOGIN_EMAIL = (
  process.env.ADMIN_LOGIN_EMAIL || "chundawatyashveer@gmail.com"
).toLowerCase();
export const ADMIN_LOGIN_PASSWORD = process.env.ADMIN_LOGIN_PASSWORD || "Hero@1234";

export function verifyAdminCredentials(identifier: string, password: string): boolean {
  if (identifier.trim().toLowerCase() !== ADMIN_LOGIN_EMAIL) {
    return false;
  }
  const a = Buffer.from(password, "utf8");
  const b = Buffer.from(ADMIN_LOGIN_PASSWORD, "utf8");
  if (a.length !== b.length) {
    return false;
  }
  return crypto.timingSafeEqual(a, b);
}

export function getExpectedAdminToken(): string {
  return crypto
    .createHmac("sha256", ADMIN_PASSCODE)
    .update("rg-editorial-admin-access")
    .digest("hex");
}

export async function verifyAdminAuth(req: Request): Promise<boolean> {
  const authHeader = req.headers.get("Authorization");
  if (authHeader && authHeader === `Bearer ${ADMIN_PASSCODE}`) {
    return true;
  }

  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return false;

  return token === getExpectedAdminToken();
}
