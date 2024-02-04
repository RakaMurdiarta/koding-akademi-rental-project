//will be using Zod
import { z } from "zod";
import { ApiError } from "../../exception/baseError";
import { HttpStatusCode } from "axios";

interface ValidationError {
  validation: string;
  code: string;
  message: string;
}

class RequestValidation {
  constructor() {}
  /**
   * @description used to validate request body
   *
   */
  public validate = async <T>(
    schema: z.ZodSchema<T>,
    data: any
  ): Promise<T> => {
    try {
      const parsedData = schema.parse(data);
      return parsedData;
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const validationErrors: ValidationError[] = error.errors.map((err) => {
          return {
            validation: err.path.join("."),
            code: err.code,
            message: err.message.toLowerCase(),
          };
        });
        throw new ApiError(
          validationErrors[0].message,
          HttpStatusCode.BadRequest
        );
      }
      throw new ApiError(
        "INTERNAL SERVER ERROR",
        HttpStatusCode.InternalServerError
      );
    }
  };
}

export const validator = new RequestValidation();
