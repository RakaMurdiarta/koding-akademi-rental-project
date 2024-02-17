import { ApiError, BaseError } from "@/app/backend/exception/baseError";
import { Payload } from "@/app/backend/interfaces/jwt";
import { customerService } from "@/app/backend/services/impl/customer_service_impl";
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
} from "@/app/backend/utils/validator/schema";
import { Customer, CustomerType, Vehicle } from "@prisma/client";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    if (req.method !== "POST") {
      throw new ApiError("invalid request method", HttpStatusCode.BadRequest);
    }

    const {id} = await MiddlewareAuthorization(req) as Payload

    const body = await req.json();

    console.log({id})

    const bodyReq = await validator.validate(AddVehicle, body);

    const newBody = {
      ...bodyReq,
      isAvailable: true
    }
 
    const customer = await customerService.postVehicle(newBody,id);

    return new ResponseHandler().success(
      customer,
      undefined,
      HttpStatusCode.Ok
    );
  } catch (error: any) {
    return handleError(error);
  }
}
