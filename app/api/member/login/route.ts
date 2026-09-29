import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getMembershipStore } from "@/lib/membership/store";
import {
  verifyPassword,
  createSessionToken,
  SESSION_COOKIE_NAME,
  toSafeMember,
} from "@/lib/membership/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Please enter your registered email or Member ID and password." },
        { status: 400 }
      );
    }

    const inputIdentifier = email.trim().toLowerCase();
    const cleanPassword = password.toString();
    const store = getMembershipStore();

    // Match by either email (case-insensitive) OR membership ID (e.g. RGC-003594)
    const member = store.members.find(
      (m) =>
        m.email.toLowerCase() === inputIdentifier ||
        m.membershipId.toLowerCase() === inputIdentifier
    );

    if (!member) {
      return NextResponse.json(
        { error: "No account found matching this email or Member ID. Please check your credentials or apply to join." },
        { status: 401 }
      );
    }

    // Verify password with secure scrypt timing-safe check (check both direct and trimmed)
    const isValid =
      verifyPassword(cleanPassword, member.passwordHash, member.passwordSalt) ||
      verifyPassword(cleanPassword.trim(), member.passwordHash, member.passwordSalt);

    if (!isValid) {
      return NextResponse.json(
        { error: "Incorrect password. Please verify and try again, or use 'Forgot Password'." },
        { status: 401 }
      );
    }

    if (member.status === "SUSPENDED") {
      return NextResponse.json(
        { error: "This membership account has been suspended. Please contact the Editorial Office." },
        { status: 403 }
      );
    }

    // Create session token & set HttpOnly cookie
    const token = createSessionToken({
      memberId: member.id,
      email: member.email,
      membershipId: member.membershipId,
      fullName: member.fullName,
      status: member.status,
    });

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });

    return NextResponse.json({
      success: true,
      member: toSafeMember(member),
      redirectUrl: "/member/dashboard",
    });
  } catch (err) {
    console.error("Member login error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred during login. Please try again." },
      { status: 500 }
    );
  }
}
