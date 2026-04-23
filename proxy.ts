import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function proxy(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  const { pathname } = req.nextUrl;

  const isProtected = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/login";

  const session = token ? await verifyToken(token) : null;

  if (isProtected && !session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isLoginPage && session) {
    return NextResponse.redirect(new URL("/admin/memberships", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};