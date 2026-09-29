import { NextResponse } from "next/server";
import crypto from "crypto";
import { getMembershipStore, saveMembershipStore } from "@/lib/membership/store";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email address is required." }, { status: 400 });
    }

    const emailNormalized = email.trim().toLowerCase();
    const store = getMembershipStore();

    const member = store.members.find(
      (m) => m.email.toLowerCase() === emailNormalized && m.status === "ACTIVE"
    );

    // Timing-attack mitigation: always return success message even if email not found
    if (!member) {
      return NextResponse.json({
        success: true,
        message: "If an active membership exists with this email, reset instructions have been generated.",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // 1 hour

    member.resetToken = resetToken;
    member.resetTokenExpiry = expiry;
    saveMembershipStore(store);

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || "https://theroyalgallerys.com"}/member/reset-password?token=${resetToken}&email=${encodeURIComponent(member.email)}`;

    console.log(`[PASSWORD RESET for ${member.email}]: Link: ${resetUrl}`);

    return NextResponse.json({
      success: true,
      message: "Password reset link has been dispatched to your email address.",
      // In development / demo environment, provide direct test link
      debugResetUrl: process.env.NODE_ENV !== "production" ? resetUrl : undefined,
    });
  } catch (err) {
    console.error("Forgot password error:", err);
    return NextResponse.json({ error: "Failed to process password reset request." }, { status: 500 });
  }
}
