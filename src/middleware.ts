import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(req: NextRequest, res: NextResponse) {
  const cookie = cookies().get("jwt") as RequestCookie;
  const isAdmin = cookies().get("isAdmin") as RequestCookie;
  const pathname = req.nextUrl.pathname;

  if (cookie) {
    if (pathname.startsWith("/auth")) {
      if (isAdmin.value === "true") {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
      return NextResponse.redirect(new URL("/user", req.url));
    } else {
      if (pathname.startsWith("/admin")) {
        if (isAdmin.value === "false") {
          return NextResponse.redirect(new URL("/user", req.url));
        }
      }

      if (pathname.startsWith("/user")) {
        if (isAdmin.value === "true") {
          return NextResponse.redirect(new URL("/admin", req.url));
        }
      }
    }

    if (pathname === "/") {
      if (isAdmin.value === "true") {
        return NextResponse.redirect(new URL("/admin", req.url));
      } else {
        return NextResponse.redirect(new URL("/user", req.url));
      }
    }
  }

  if (!pathname.startsWith("/auth") && !cookie) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  return;
}

export const config = {
  matcher: [
    "/",
    "/vehicle/:path*",
    "/auth/:path*",
    "/admin/:path*",
    "/user/:path*",
  ],
};
