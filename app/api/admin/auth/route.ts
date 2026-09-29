import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";

const ADMIN_PASSCODE = process.env.EDITORIAL_ADMIN_KEY || "GSingh1977@@";
const ADMIN_COOKIE_NAME = "rg_admin_token";

export async function POST(req: Request) {
  try {
    const { passcode } = await req.json();

    if (!passcode || passcode.trim() !== ADMIN_PASSCODE) {
      return NextResponse.json(
        { error: "Invalid Editorial Office Passcode." },
        { status: 401 }
      );
    }

    const token = crypto.createHmac("sha256", ADMIN_PASSCODE).update("rg-editorial-admin-access").digest("hex");

    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 12, // 12 hours
      path: "/",
    });

    return NextResponse.json({ success: true, message: "Editorial Office authenticated." });
  } catch (err) {
    console.error("Admin auth error:", err);
    return NextResponse.json({ error: "Authentication failed." }, { status: 500 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
  });
  return NextResponse.json({ success: true });
}
