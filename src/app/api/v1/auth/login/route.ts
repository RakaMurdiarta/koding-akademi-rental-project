import { ApiError, BaseError } from "@/app/backend/exception/baseError";
import { customerService } from "@/app/backend/services/impl/customer_service_impl";
import { adminservice } from "@/app/backend/services/impl/admin_service_impl";
import {
  ApiResponse,
  Bcrypt,
  JWT,
  ResponseHandler,
  handleError,
} from "@/app/backend/utils/helper";
import { validator } from "@/app/backend/utils/validator/helper";
import { LoginCustomerSchema } from "@/app/backend/utils/validator/schema";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    if (req.method !== "POST") {
      throw new ApiError("invalid request method", HttpStatusCode.BadRequest);
    }

    const body = await req.json();

    const { email, password } = await validator.validate(
      LoginCustomerSchema,
      body
    );

    //get admin user

    const getAdmin = await adminservice.getAdminByEmail(email);
    if (getAdmin) {
      const token = await JWT.generateJWT({ id: getAdmin.id, email });

      const resp = {
        token,
        isAdmin: true,
      };
      return new ResponseHandler().success(resp, undefined, HttpStatusCode.Ok);
    }


    //get customer
    const customerisExist = await customerService.getCustomerByEmail(email);

    if (!customerisExist) {
      throw new ApiError(
        "email is not register yet",
        HttpStatusCode.BadRequest
      );
    }

    if (customerisExist) {
      const isMatch = await Bcrypt.comparePassword(
        password,
        customerisExist.password
      );

      if (!isMatch) {
        throw new ApiError("wrong email or password");
      }

      //generate jwt token
      const token = await JWT.generateJWT({ id: customerisExist.id, email });
      const resp = {
        token,
        isAdmin: false,
      };
      return new ResponseHandler().success(resp, undefined, HttpStatusCode.Ok);
    }
  } catch (error: any) {
    return handleError(error);
  }
}
