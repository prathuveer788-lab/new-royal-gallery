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
  // ── Step 1: Parse body ───────────────────────────────────────────────────
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request format. Please refresh and try again." },
      { status: 400 }
    );
  }

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

  // ── Step 2: Validation ───────────────────────────────────────────────────
  if (!fullName || !fullName.trim()) {
    return NextResponse.json(
      { error: "Please provide your full name." },
      { status: 400 }
    );
  }
  if (!email || !email.trim()) {
    return NextResponse.json(
      { error: "Please provide your email address." },
      { status: 400 }
    );
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 }
    );
  }
  if (!phone || !phone.trim()) {
    return NextResponse.json(
      { error: "Please provide your phone number." },
      { status: 400 }
    );
  }
  if (!password) {
    return NextResponse.json(
      { error: "Please create a password for your account." },
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
      { error: "Passwords do not match. Please re-enter." },
      { status: 400 }
    );
  }

  const emailNormalized = email.trim().toLowerCase();

  // ── Step 3: Load store ───────────────────────────────────────────────────
  let store;
  try {
    store = getMembershipStore();
  } catch (storeErr) {
    console.error("[Register] Failed to load membership store:", storeErr);
    return NextResponse.json(
      { error: "Unable to access membership data. Please try again in a moment." },
      { status: 503 }
    );
  }

  // Check for existing active membership
  const existing = store.members.find(
    (m) => m.email.toLowerCase() === emailNormalized
  );
  if (existing && existing.status === "ACTIVE") {
    return NextResponse.json(
      { error: "An active membership already exists with this email address. Please sign in instead." },
      { status: 409 }
    );
  }

  // ── Step 4: Hash password ────────────────────────────────────────────────
  let hash: string, salt: string;
  try {
    ({ hash, salt } = hashPassword(password));
  } catch (hashErr) {
    console.error("[Register] Password hashing failed:", hashErr);
    return NextResponse.json(
      { error: "Account setup failed. Please try again." },
      { status: 500 }
    );
  }

  // ── Step 5: Build member record ──────────────────────────────────────────
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
    amountPaid: store.config.membershipPrice || 40000,
    status: "PENDING_APPROVAL",
    joinedAt: now,
    payment: {
      transactionId: `TXN-${Date.now().toString(36).toUpperCase()}`,
      orderId,
      paidAt: now,
      method: "Application Lodged / Editorial Verification",
      amount: store.config.membershipPrice || 40000,
      verified: false,
    },
    createdAt: existing?.createdAt || now,
    updatedAt: now,
  };

  // ── Step 6: Save to store ────────────────────────────────────────────────
  try {
    if (existing) {
      const idx = store.members.findIndex((m) => m.id === existing.id);
      store.members[idx] = memberData;
    } else {
      store.members.push(memberData);
    }
    saveMembershipStore(store);
  } catch (saveErr) {
    console.error("[Register] Failed to save member to store:", saveErr);
    return NextResponse.json(
      { error: "Could not save your application. Please try again or contact hey.theroyalsgallery@gmail.com" },
      { status: 500 }
    );
  }

  // ── Step 7: Send editorial alert (non-blocking, non-fatal) ───────────────
  try {
    await sendEditorialOfficeNewMemberAlert(memberData);
  } catch (mailErr) {
    console.error("[Register] Editorial office alert error (non-fatal):", mailErr);
  }

  // ── Step 8: Set session cookie ───────────────────────────────────────────
  try {
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
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
  } catch (cookieErr) {
    console.error("[Register] Failed to set session cookie (non-fatal):", cookieErr);
    // Non-fatal — member is registered, they can sign in manually
  }

  // ── Step 9: Success ──────────────────────────────────────────────────────
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
}
