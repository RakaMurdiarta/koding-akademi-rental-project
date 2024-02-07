import { CustomerType, TypeVehicle } from "@prisma/client";
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
  customer_type: z.enum([CustomerType.individu, CustomerType.company], {
    required_error: "customer_type is required",
  }),
  phone: z.string({ required_error: "phone is required" }),
});

export const AdminRegister = z.object({
  username: z.string({ required_error: "email is required" }),
  password: z
    .string({ required_error: "password is required" })
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export const AddVehicle = z.object({
  model: z.string({ required_error: "email is required" }),
  year: z.number({ required_error: "password is required" }),
  identityNumber: z.string({ required_error: "password is required" }),
  weeklyRate: z.number({ required_error: "password is required" }),
  type: z.enum([TypeVehicle.mobil, TypeVehicle.motor], {
    required_error: "it should be on of this individu or company",
  }),
  dailyRate: z.number({ required_error: "password is required" }),
});

export const LoginCustomerSchema = z.object({
  email: z.string({ required_error: "email is required" }),
  password: z.string({ required_error: "password is required" }),
});

export const Rent = z.object({
  from: z.string().refine((dateString) => {
    // Menggunakan metode isValid untuk memastikan bahwa tanggal dalam format yang benar
    return (
      /\d{4}-\d{2}-\d{2}/.test(dateString) && !isNaN(Date.parse(dateString))
    );
  }, "Invalid date format"),
  until: z.string().refine((dateString) => {
    // Menggunakan metode isValid untuk memastikan bahwa tanggal dalam format yang benar
    return (
      /\d{4}-\d{2}-\d{2}/.test(dateString) && !isNaN(Date.parse(dateString))
    );
  }, "Invalid date format"),
  total: z.number({ required_error: "password is required" }),
  vehicle_id: z.string({ required_error: "password is required" }),
});
