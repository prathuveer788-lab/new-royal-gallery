import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  ADMIN_COOKIE_NAME,
  ADMIN_PASSCODE,
  getExpectedAdminToken,
} from "@/lib/admin/auth";

export async function POST(req: Request) {
  try {
    const { passcode } = await req.json();

    if (!passcode || passcode.trim() !== ADMIN_PASSCODE) {
      return NextResponse.json(
        { error: "Invalid Editorial Office Passcode." },
        { status: 401 }
      );
    }

    const token = getExpectedAdminToken();

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
