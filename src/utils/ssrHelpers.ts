import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export function getJWTSSR() {
  const jwt_cookie = cookies().get("jwt") as RequestCookie;
  const jwt = jwt_cookie?.value ?? undefined;
  return jwt;
}
