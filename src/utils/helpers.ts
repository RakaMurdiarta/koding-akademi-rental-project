import { getCookie } from "cookies-next";
import { NextRequest, NextResponse } from "next/server";

export function getJWT(req?: NextRequest, res?: NextResponse) {
  if (req && res) {
    const jwt = getCookie("jwt", { req, res }) as string;
    return jwt;
  } else {
    const jwt = getCookie("jwt") as string;
    return jwt;
  }
}
