import { getSessionCookie } from "better-auth/cookies";

import { type NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  const isAuthPage = request.nextUrl.pathname === "/login";
  const isProtectedPage = request.nextUrl.pathname.startsWith("/dashboard");

  if (sessionCookie && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!sessionCookie && isProtectedPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
