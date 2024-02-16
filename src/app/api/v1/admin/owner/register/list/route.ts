import { ApiError, BaseError } from "@/app/backend/exception/baseError";
import { Payload } from "@/app/backend/interfaces/jwt";
import { adminservice } from "@/app/backend/services/impl/admin_service_impl";
import {
  ApiResponse,
  MiddlewareAuthorization,
  ResponseHandler,
  handleError,
} from "@/app/backend/utils/helper";
import { validator } from "@/app/backend/utils/validator/helper";
import {
  AddVehicle,
  RegisterCustomer,
  Rent,
} from "@/app/backend/utils/validator/schema";
import { OwnerRequestHistory } from "@prisma/client";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    if (req.method !== "GET") {
      throw new ApiError("invalid request method", HttpStatusCode.BadRequest);
    }

    const list = await adminservice.getListRequestOwner();

    return new ResponseHandler<OwnerRequestHistory[]>().success(
      list,
      undefined,
      HttpStatusCode.Ok
    );
  } catch (error: any) {
    return handleError(error);
  }
}
