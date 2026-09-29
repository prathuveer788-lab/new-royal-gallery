import { NextResponse } from "next/server";
import crypto from "crypto";
import { cookies } from "next/headers";
import {
  getMembershipStore,
  saveMembershipStore,
  MemberAccount,
  generateNextMembershipId,
} from "@/lib/membership/store";
import {
  hashPassword,
  createSessionToken,
  SESSION_COOKIE_NAME,
  toSafeMember,
} from "@/lib/membership/auth";
import { sendEditorialOfficeNewMemberAlert } from "@/lib/membership/mailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      fullName,
      email,
      phone,
      whatsapp,
      password,
      confirmPassword,
      address,
      city,
      state,
      country,
      pincode,
    } = body;

    // 1. Validation
    if (!fullName || !email || !password || !phone) {
      return NextResponse.json(
        { error: "Please provide all required contact details." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long." },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match." },
        { status: 400 }
      );
    }

    const emailNormalized = email.trim().toLowerCase();
    const store = getMembershipStore();

    // Check if user already exists
    const existing = store.members.find((m) => m.email.toLowerCase() === emailNormalized);
    if (existing && existing.status === "ACTIVE") {
      return NextResponse.json(
        { error: "An active membership already exists with this email address. Please sign in." },
        { status: 409 }
      );
    }

    // 2. Hash password securely
    const { hash, salt } = hashPassword(password);

    // 3. Name separation
    const nameParts = fullName.trim().split(" ");
    const firstName = nameParts[0] || fullName.trim();
    const lastName = nameParts.slice(1).join(" ") || "";

    const memberId = existing ? existing.id : crypto.randomUUID();
    const orderId = `ORD-RGC-${Date.now()}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
    const proposedMembershipId = generateNextMembershipId(store);

    const now = new Date().toISOString();

    const memberData: MemberAccount = {
      id: memberId,
      membershipId: proposedMembershipId,
      fullName: fullName.trim(),
      firstName,
      lastName,
      email: emailNormalized,
      phone: phone.trim(),
      whatsapp: (whatsapp || phone).trim(),
      passwordHash: hash,
      passwordSalt: salt,
      address: {
        street: address ? address.trim() : "",
        city: city ? city.trim() : "",
        state: state ? state.trim() : "",
        country: country ? country.trim() : "India",
        pincode: pincode ? pincode.trim() : "",
      },
      membershipType: "LIFETIME",
      amountPaid: store.config.membershipPrice || 3999,
      status: "PENDING_APPROVAL", // Editorial Office must approve
      joinedAt: now,
      payment: {
        transactionId: `TXN-${Date.now().toString(36).toUpperCase()}`,
        orderId,
        paidAt: now,
        method: "Application Lodged / Editorial Verification",
        amount: store.config.membershipPrice || 3999,
        verified: false,
      },
      createdAt: existing?.createdAt || now,
      updatedAt: now,
    };

    if (existing) {
      const idx = store.members.findIndex((m) => m.id === existing.id);
      store.members[idx] = memberData;
    } else {
      store.members.push(memberData);
    }

    saveMembershipStore(store);

    // Immediately notify Editorial Office at hey.theroyalsgallery@gmail.com & log on localhost
    try {
      await sendEditorialOfficeNewMemberAlert(memberData);
    } catch (e) {
      console.error("Editorial office dispatch error:", e);
    }

    // Set authenticated session cookie so applicant can view application status
    const token = createSessionToken({
      memberId: memberData.id,
      email: memberData.email,
      membershipId: memberData.membershipId,
      fullName: memberData.fullName,
      status: memberData.status,
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
      memberId: memberData.id,
      orderId,
      status: memberData.status,
      proposedMembershipId,
      member: toSafeMember(memberData),
      message:
        "Your application has been received. The Editorial Office has been alerted at hey.theroyalsgallery@gmail.com.",
      redirectUrl: "/member/dashboard",
    });
  } catch (err: unknown) {
    console.error("Registration error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred during account registration." },
      { status: 500 }
    );
  }
}
