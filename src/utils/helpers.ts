import { getCookie } from "cookies-next";

export function getJWT() {
  const jwt = getCookie("jwt") as string;
  return jwt;
}
