import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(req: NextRequest, res: NextResponse) {
  const cookie = cookies().get("jwt") as RequestCookie;
  const isAdmin = cookies().get("isAdmin") as RequestCookie;
  const pathname = req.nextUrl.pathname;

  console.log("middleware");

  if (!pathname.startsWith("/auth") && !cookie) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (cookie) {
    if (pathname.startsWith("/auth")) {
      if (isAdmin.value === "true") {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (pathname.startsWith("/admin") && isAdmin.value === "false") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (pathname === "/" && isAdmin.value === "true") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    if (pathname.startsWith("/user") && isAdmin.value === "true") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }

  return;
}

export const config = {
  matcher: [
    "/",
    "/vehicle/:path*",
    "/auth/:path*",
    "/admin/:path*",
    "/my/:path*",
  ],
};
