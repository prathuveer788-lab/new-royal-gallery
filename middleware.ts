import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protected Member Routes
  if (
    pathname.startsWith("/member/dashboard") ||
    pathname.startsWith("/member/profile") ||
    pathname.startsWith("/member/archive") ||
    pathname.startsWith("/member/private-files")
  ) {
    const memberToken = request.cookies.get("rg_member_token")?.value;

    if (!memberToken) {
      const loginUrl = new URL("/member/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      const parts = memberToken.split(".");
      if (parts.length !== 2) {
        throw new Error("Invalid token format");
      }

      // Base64Url decode payload
      const base64 = parts[0].replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      const payload = JSON.parse(jsonPayload);

      const now = Math.floor(Date.now() / 1000);
      if (payload.exp && payload.exp < now) {
        const loginUrl = new URL("/member/login", request.url);
        loginUrl.searchParams.set("error", "session_expired");
        return NextResponse.redirect(loginUrl);
      }
    } catch {
      const loginUrl = new URL("/member/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Redirect /circle to /membership
  if (pathname === "/circle") {
    return NextResponse.redirect(new URL("/membership", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/member/dashboard/:path*",
    "/member/dashboard",
    "/member/profile/:path*",
    "/member/archive/:path*",
    "/member/private-files/:path*",
    "/circle",
  ],
};
