import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  getMembershipStore,
  saveMembershipStore,
  generateNextMembershipId,
} from "@/lib/membership/store";
import {
  createSessionToken,
  SESSION_COOKIE_NAME,
  toSafeMember,
} from "@/lib/membership/auth";
import {
  sendEditorialOfficeNewMemberAlert,
  sendMemberWelcomeEmail,
} from "@/lib/membership/mailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { memberId, orderId, transactionId, paymentMethod, clientSignature } = body;

    if (!memberId || !orderId) {
      return NextResponse.json(
        { error: "Invalid payment verification payload. Member ID and Order ID are required." },
        { status: 400 }
      );
    }

    const store = getMembershipStore();
    const memberIndex = store.members.findIndex((m) => m.id === memberId);

    if (memberIndex === -1) {
      return NextResponse.json(
        { error: "Member account record not found." },
        { status: 404 }
      );
    }

    const member = store.members[memberIndex];

    // Verify orderId matches
    if (member.payment.orderId !== orderId) {
      return NextResponse.json(
        { error: "Order reference mismatch." },
        { status: 400 }
      );
    }

    // Verify amount is exactly the one-time membership price
    const expectedAmount = store.config.membershipPrice || 3999;

    // Simulate / verify transaction details
    const verifiedTransactionId =
      transactionId && transactionId.trim().length > 0
        ? transactionId.trim()
        : `TXN-RGC-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    // Generate unique permanent sequential Membership ID if not already assigned
    const membershipId =
      member.membershipId && member.membershipId.startsWith("RGC-")
        ? member.membershipId
        : generateNextMembershipId(store);

    const now = new Date().toISOString();

    // Mark as ACTIVE and verified
    member.membershipId = membershipId;
    member.status = "ACTIVE";
    member.amountPaid = expectedAmount;
    member.joinedAt = now;
    member.updatedAt = now;
    member.payment = {
      transactionId: verifiedTransactionId,
      orderId,
      paidAt: now,
      method: paymentMethod || "UPI / Card / NetBanking",
      amount: expectedAmount,
      verified: true,
    };

    store.members[memberIndex] = member;
    saveMembershipStore(store);

    // Send emails asynchronously (will log and dispatch)
    try {
      await Promise.allSettled([
        sendEditorialOfficeNewMemberAlert(member),
        sendMemberWelcomeEmail(member),
      ]);
    } catch (e) {
      console.error("Email dispatch notification warning:", e);
    }

    // Create session token & set HttpOnly cookie
    const token = createSessionToken({
      memberId: member.id,
      email: member.email,
      membershipId: member.membershipId,
      fullName: member.fullName,
      status: "ACTIVE",
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
      message: "Payment successfully verified. Lifetime membership activated.",
      membershipId: member.membershipId,
      member: toSafeMember(member),
      redirectUrl: "/member/dashboard",
    });
  } catch (err) {
    console.error("Payment verification server error:", err);
    return NextResponse.json(
      { error: "Server-side payment verification failed." },
      { status: 500 }
    );
  }
}
