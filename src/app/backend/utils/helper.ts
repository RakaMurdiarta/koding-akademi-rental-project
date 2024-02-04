import { HttpStatusCode } from "axios";
import { BaseError } from "../exception/baseError";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";

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
