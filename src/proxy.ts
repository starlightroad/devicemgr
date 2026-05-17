import { getSessionCookie } from "better-auth/cookies";

import { type NextRequest, NextResponse } from "next/server";

import { DASHBOARD_PATH, DEVICES_PATH, PROFILE_PATH } from "@/features/dashboard/lib/constants";

const protectedPages = [DASHBOARD_PATH, DEVICES_PATH, PROFILE_PATH];

export async function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  const isAuthPage = request.nextUrl.pathname === "/login";
  const isProtectedPage = protectedPages.some((protectedPage) => request.nextUrl.pathname.startsWith(protectedPage));

  if (sessionCookie && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!sessionCookie && isProtectedPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/devices/:path*", "/profile", "/login"],
};
