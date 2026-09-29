import { NextResponse } from "next/server";
import { getMembershipStore, saveMembershipStore } from "@/lib/membership/store";
import { hashPassword } from "@/lib/membership/auth";

export async function POST(req: Request) {
  try {
    const { email, token, newPassword, confirmPassword } = await req.json();

    if (!email || !token || !newPassword) {
      return NextResponse.json({ error: "Missing required parameters." }, { status: 400 });
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: "New password must be at least 8 characters long." },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json({ error: "Passwords do not match." }, { status: 400 });
    }

    const emailNormalized = email.trim().toLowerCase();
    const store = getMembershipStore();

    const member = store.members.find(
      (m) =>
        m.email.toLowerCase() === emailNormalized &&
        m.resetToken === token &&
        m.resetTokenExpiry &&
        new Date(m.resetTokenExpiry) > new Date()
    );

    if (!member) {
      return NextResponse.json(
        { error: "Invalid or expired password reset link. Please request a new one." },
        { status: 400 }
      );
    }

    const { hash, salt } = hashPassword(newPassword);
    member.passwordHash = hash;
    member.passwordSalt = salt;
    member.resetToken = null;
    member.resetTokenExpiry = null;
    member.updatedAt = new Date().toISOString();

    saveMembershipStore(store);

    return NextResponse.json({
      success: true,
      message: "Your password has been securely reset. You can now log in.",
    });
  } catch (err) {
    console.error("Reset password error:", err);
    return NextResponse.json({ error: "Failed to reset password." }, { status: 500 });
  }
}
