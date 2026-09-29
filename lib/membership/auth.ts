import crypto from "crypto";
import { cookies } from "next/headers";
import { MemberAccount, getMembershipStore } from "./store";

const SESSION_SECRET = process.env.SESSION_SECRET || "royal-gallerys-exclusive-circle-secret-key-2026-heritage";
export const SESSION_COOKIE_NAME = "rg_member_token";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days session

export interface MemberSession {
  memberId: string;
  email: string;
  membershipId: string;
  fullName: string;
  status: "PENDING_APPROVAL" | "ACTIVE" | "SUSPENDED";
  exp: number;
}

export type SafeMember = Omit<MemberAccount, "passwordHash" | "passwordSalt" | "resetToken" | "resetTokenExpiry">;

/**
 * Strip sensitive credentials before returning member to client
 */
export function toSafeMember(member: MemberAccount): SafeMember {
  const { passwordHash, passwordSalt, resetToken, resetTokenExpiry, ...safe } = member;
  return safe;
}

/**
 * Hash password with unique random salt using scrypt
 */
export function hashPassword(password: string): { hash: string; salt: string } {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return { hash, salt };
}

/**
 * Verify plaintext password against stored hash and salt
 */
export function verifyPassword(password: string, hash: string, salt: string): boolean {
  try {
    const computedHash = crypto.scryptSync(password, salt, 64).toString("hex");
    return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(computedHash, "hex"));
  } catch {
    return false;
  }
}

/**
 * Create HMAC signed session token
 */
export function createSessionToken(session: Omit<MemberSession, "exp">): string {
  const exp = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS;
  const payload: MemberSession = { ...session, exp };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(encodedPayload)
    .digest("base64url");
  return `${encodedPayload}.${signature}`;
}

/**
 * Verify HMAC signed session token
 */
export function verifySessionToken(token: string): MemberSession | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return null;
    const [encodedPayload, signature] = parts;

    const expectedSignature = crypto
      .createHmac("sha256", SESSION_SECRET)
      .update(encodedPayload)
      .digest("base64url");

    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return null;
    }

    const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8")) as MemberSession;
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp < now) {
      return null; // Expired
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Retrieve current member from cookie session in Next.js Server Components / API
 */
export async function getCurrentMember(): Promise<SafeMember | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!token) return null;

    const session = verifySessionToken(token);
    if (!session || !session.memberId) return null;

    const store = getMembershipStore();
    const member = store.members.find(
      (m) => m.id === session.memberId && m.status !== "SUSPENDED"
    );

    if (!member) return null;
    return toSafeMember(member);
  } catch (err) {
    console.error("Error retrieving current member:", err);
    return null;
  }
}
