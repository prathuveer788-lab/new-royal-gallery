import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from "@/lib/membership/auth";

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    });

    return NextResponse.json({ success: true, message: "Logged out successfully." });
  } catch (err) {
    console.error("Logout error:", err);
    return NextResponse.json({ error: "Logout failed." }, { status: 500 });
  }
}
