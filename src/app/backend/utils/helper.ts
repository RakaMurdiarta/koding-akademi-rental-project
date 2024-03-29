import { HttpStatusCode } from "axios";
import { ApiError, BaseError } from "../exception/baseError";
import { NextResponse, NextRequest } from "next/server";
import { compare, hash, genSalt } from "bcrypt";
import { Payload } from "@/app/backend/interfaces/jwt";
import { sign, verify } from "jsonwebtoken";

export class ApiResponse<T> {
  readonly data: T | null;
  readonly message: string;
  readonly status: boolean;
  readonly statusCode: HttpStatusCode;

  constructor(
    data: T,
    message: string,
    status: boolean,
    statusCode?: HttpStatusCode
  ) {
    this.data = data;
    this.message = message;
    this.status = status;
    this.statusCode = statusCode ?? HttpStatusCode.InternalServerError;
  }

  static success<T>(
    data: T,
    message: string = "success",
    statusCode: HttpStatusCode = HttpStatusCode.Ok
  ): ApiResponse<T> {
    let apiResponse = new ApiResponse<T>(data, message, true, statusCode);
    return apiResponse;
  }

  static error<T>(
    data: T,
    message: string = "error",
    statusCode: HttpStatusCode = HttpStatusCode.InternalServerError
  ): ApiResponse<T> {
    let apiResponse = new ApiResponse<T>(data, message, false, statusCode);
    return apiResponse;
  }
}

//this is for coresponding for handling multiple error type
export function handleError(error: any) {
  let status;
  let message;

  if (error instanceof BaseError) {
    status = error.statusCode;
    message = error.message;
  } else {
    status = 500;
    message = error.message;
  }

  return NextResponse.json(ApiResponse.error(null, error.message, status), {
    status: status,
  });
}

//this is for coresponding helper api response
export class ResponseHandler<T> {
  public success(data: T, message = "success", statusCode = 200) {
    return NextResponse.json(ApiResponse.success(data, message, statusCode), {
      status: statusCode,
    });
  }

  public error(message: string, statusCode = 500) {
    return NextResponse.json(ApiResponse.error(null, "error", statusCode), {
      status: statusCode,
    });
  }
}

//bcrypt
export class Bcrypt {
  public static async createHashPassword(
    plainPassword: string
  ): Promise<string> {
    const salt = await genSalt(12);

    const hashPass = await hash(plainPassword, salt);

    return hashPass;
  }

  public static async comparePassword(
    plainPassword: string,
    currentHash: string
  ): Promise<boolean> {
    const isMatch = await compare(plainPassword, currentHash);

    return isMatch;
  }
}

//jsonwebtoken

export class JWT {
  public static async generateJWT(payload: Payload): Promise<string> {
    const token = sign(payload, process.env.JWTSECRET as string, {
      expiresIn: process.env.EXPIRED,
    });

    return token;
  }

  public static async decodeJWT(
    token: string,
    secret: string
  ): Promise<Payload> {
    const decode = verify(token, secret);

    return decode as Payload;
  }
}

export const MiddlewareAuthorization = async (
  req: NextRequest
): Promise<string | Payload> => {
  //get Bearer token
  try {
    const isAuthToken = req.headers.get("Authorization")?.split(" ")[1];

    if (!isAuthToken) {
      throw new ApiError("unauthorization", HttpStatusCode.Unauthorized);
    }

    //decode token jwt
    const token = await JWT.decodeJWT(
      isAuthToken,
      process.env.JWTSECRET as string
    );

    return token;
  } catch (error) {
    throw error;
  }
};

export function calculateNumberOfDays(date1: Date, date2: Date): number {
  // Calculate the difference in milliseconds
  const differenceMs = date2.getTime() - date1.getTime();
  
  // Convert milliseconds to days
  const numberOfDays = Math.floor(differenceMs / (1000 * 60 * 60 * 24));
  
  return numberOfDays;
}
