import { ApiError, BaseError } from "@/app/backend/exception/baseError";
import { adminservice } from "@/app/backend/services/impl/admin_service_impl";
import { customerService } from "@/app/backend/services/impl/customer_service_impl";
import {
  ApiResponse,
  ResponseHandler,
  handleError,
} from "@/app/backend/utils/helper";
import { validator } from "@/app/backend/utils/validator/helper";
import {
  AdminRegister,
  RegisterCustomer,
} from "@/app/backend/utils/validator/schema";
import { Admin } from "@prisma/client";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    if (req.method !== "POST") {
      throw new ApiError(
        "invalid request method",
        HttpStatusCode.MethodNotAllowed
      );
    }

    const body = await req.json();

    const validBody = await validator.validate(AdminRegister, body);

    const admin: Admin = await adminservice.addAdmin(validBody);

    return new ResponseHandler().success(
      admin,
      undefined,
      HttpStatusCode.Created
    );
  } catch (error: any) {
    return handleError(error);
  }
}
