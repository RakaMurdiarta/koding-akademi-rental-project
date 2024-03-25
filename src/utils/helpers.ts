import { getCookie } from "cookies-next";
import { NextRequest, NextResponse } from "next/server";

export function getJWT() {
  const jwt = getCookie("jwt") as string;
  return jwt;
}

export function getJWTSSR(req: NextRequest, res: NextResponse) {
  const jwt_cookie = getCookie("jwt", { req, res });
  const jwt = jwt_cookie ?? undefined;
  return jwt;
}
