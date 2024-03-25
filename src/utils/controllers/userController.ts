import jwt from "jsonwebtoken";
import { getJWT } from "../helpers";

interface JWTPayload {
  id: string;
  email: string;
  iat: number;
  exp: number;
}

export default class UserController {
  public readonly userId: string;
  constructor(token?: string) {
    this.userId = this.getUserId(token);
  }

  private jwtDecode<T>(token?: string): T {
    let decodedToken;
    if (token) {
      decodedToken = jwt.decode(token);
    } else {
      const token = getJWT();
      decodedToken = jwt.decode(token);
    }
    return decodedToken as T;
  }

  private getUserId(token?: string): string {
    const payload = this.jwtDecode<JWTPayload>(token);
    const userId = payload?.id;
    return userId;
  }
}
