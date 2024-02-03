import { HttpStatusCode } from "axios";

export class ApiResponse<T> {
  readonly data: T;
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

  static success<T>(data: T, message: string = "success"): ApiResponse<T> {
    let apiResponse = new ApiResponse<T>(data, message, true);
    return apiResponse;
  }

  static error<T>(data: T, message: string = "error"): ApiResponse<T> {
    let apiResponse = new ApiResponse<T>(data, message, false);
    return apiResponse;
  }
}
