import { cookies } from "next/headers";
import crypto from "crypto";

export const ADMIN_PASSCODE = process.env.EDITORIAL_ADMIN_KEY || "GSingh1977@@";
export const ADMIN_COOKIE_NAME = "rg_admin_token";

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
