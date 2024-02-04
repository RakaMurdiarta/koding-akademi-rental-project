import { ApiError, BaseError } from "@/app/backend/exception/baseError";
import { adminservice } from "@/app/backend/services/impl/admin_service_impl";
import { customerService } from "@/app/backend/services/impl/customer_service_impl";
import { ownerservice } from "@/app/backend/services/impl/owner_service_impl";
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

    // const validBody = await validator.validate(AdminRegister, body);

    const owner = await ownerservice.postVehicle(body);

    return new ResponseHandler().success(
      owner,
      undefined,
      HttpStatusCode.Created
    );
  } catch (error: any) {
    return handleError(error);
  }
}
