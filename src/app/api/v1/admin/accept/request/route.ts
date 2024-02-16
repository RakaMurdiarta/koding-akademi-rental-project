import { ApiError, BaseError } from "@/app/backend/exception/baseError";
import { adminservice } from "@/app/backend/services/impl/admin_service_impl";
import {
  ApiResponse,
  MiddlewareAuthorization,
  ResponseHandler,
  handleError,
} from "@/app/backend/utils/helper";
import { validator } from "@/app/backend/utils/validator/helper";
import { IDSchema } from "@/app/backend/utils/validator/schema";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    if (req.method !== "POST") {
      throw new ApiError("invalid request method", HttpStatusCode.BadRequest);
    }

    const body = await req.json();
    const { customerid } = await validator.validate(IDSchema, body);

    const reqowner = await adminservice.acceptOwnerRequest(customerid);

    if (reqowner) {
      return new ResponseHandler<string>().success(
        "success",
        undefined,
        HttpStatusCode.Created
      );
    }

    return new ResponseHandler<string>().error(
      "something wen wrong",
      undefined
    );
  } catch (error: any) {
    return handleError(error);
  }
}
