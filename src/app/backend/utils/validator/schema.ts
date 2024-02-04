import { z } from "zod";

export const RegisterCustomer = z.object({
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "Email is not valid" }),
  password: z
    .string({ required_error: "password is required" })
    .min(8, { message: "Password must be at least 8 characters long" }),
  fname: z.string({ required_error: "fname is required" }),
  lname: z.string({ required_error: "lname is required" }),
  customer_type: z.string({ required_error: "customer_type is required" }),
  phone: z.string({ required_error: "phone is required" }),
});

export const AdminRegister = z.object({
  username: z.string({ required_error: "email is required" }),
  password: z
    .string({ required_error: "password is required" })
    .min(8, { message: "Password must be at least 8 characters long" }),
});

// export const AdminRegister = z.object({
//   username: z.string({ required_error: "email is required" }),
//   password: z
//     .string({ required_error: "password is required" })
//     .min(8, { message: "Password must be at least 8 characters long" }),
// });

