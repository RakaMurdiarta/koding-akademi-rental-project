import { ApiError, BaseError } from "@/app/backend/exception/baseError";
import { customerService } from "@/app/backend/services/impl/customer_service_impl";
import {
  ApiResponse,
  ResponseHandler,
  handleError,
} from "@/app/backend/utils/helper";
import { validator } from "@/app/backend/utils/validator/helper";
import { RegisterSchema } from "@/app/backend/utils/validator/schema";
import { Customer } from "@prisma/client";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    if (req.method !== "POST") {
      throw new ApiError("invalid request method", HttpStatusCode.BadRequest);
    }

    const body = await req.json();

    const { customer_type, email, fname, lname, password, phone } =
      await validator.validate(RegisterSchema, body);

    const customer: Customer = await customerService.addCustomer(
      email,
      password,
      fname,
      lname,
      phone,
      customer_type
    );

    return new ResponseHandler().success(
      customer,
      undefined,
      HttpStatusCode.Ok
    );
  } catch (error: any) {
    return handleError(error);
  }
}
