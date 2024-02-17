import { ApiError } from "@/app/backend/exception/baseError";
import {
  MiddlewareAuthorization,
  ResponseHandler,
  handleError,
} from "@/app/backend/utils/helper";
import { Payload } from "@/app/backend/interfaces/jwt";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";
import { Recipient, sendEmail } from "@/app/backend/mail/mailer";
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    if (req.method !== "GET") {
      throw new ApiError(
        "invalid request method",
        HttpStatusCode.MethodNotAllowed
      );
    }

    // const validBody = await validator.validate(AdminRegister, body);

    const { id: customerId } = (await MiddlewareAuthorization(req)) as Payload;

    const payload: Recipient = {
      to: "rakazidan17@gmail.com",
      subject: "invoices",
      details: {
        name: "raka",
        identityNumber: "DK-123",
        return: new Date().toLocaleString(),
        start: new Date().toLocaleString(),
        price: 200000,
        status: "success",
      },
    };

    await sendEmail(payload);

    return new ResponseHandler().success(
      null,
      undefined,
      HttpStatusCode.Created
    );
  } catch (error: any) {
    return handleError(error);
  }
}
