import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./utils/verifyToken";

const authRoutes = ["/login"];

const roleBasedRoutes = {
  CUSTOMER: [/^\/customer-dashboard/],
  VENDOR: [/^\/vendor-dashboard/],
  ADMIN: [/^\/admin-dashboard/],
  SUPER_ADMIN: [/^\/admin-dashboard/],
};

type Role = keyof typeof roleBasedRoutes;

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const token = request.cookies.get("auth-token")?.value;
  let user: { role?: Role; [key: string]: any } | null = null;

  //   console.log("token", token);

  if (token) {
    try {
      user = verifyToken(token);
    } catch (error) {
      console.error("Token verification failed:", error);
    }
  }

  //   console.log("user", user);

  if (!user) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}${search}`, request.url)
      );
    }
  }

  if (
    pathname === "/productDetails" ||
    pathname === "/shop" ||
    pathname === "/recentView"
  ) {
    return NextResponse.next();
  }

  if (user?.role && roleBasedRoutes[user.role]) {
    const allowedRoutes = roleBasedRoutes[user.role];
    if (allowedRoutes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/login",
    "/productDetails",
    "/recentView",
    "/shop",
    "/customer-dashboard",
    "/vendor-dashboard",
    "/admin-dashboard",
    "/customer-dashboard/:page*",
    "/vendor-dashboard/:page*",
    "/admin-dashboard/:page*",
  ],
};
