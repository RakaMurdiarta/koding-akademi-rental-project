import * as Yup from "yup";
import { ValidationConstant } from "./constant";

const registerCompanyValidation = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  fullname: Yup.string().required("First name is required!"),
  cname: Yup.string().required("Company name is required!"),
  password: Yup.string()
    .min(
      ValidationConstant.MINIMUM_PASSWORD_LENGTH,
      "Password must be at least 8 characters"
    )
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d])/,
      "Password must include uppercase, lowercase, number, and symbol!"
    )
    .required("Password is required"),
  customer_type: Yup.string().required("Customer type is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Phone number must contain numbers only")
    .min(5, "Phone number must be at least 5 digits")
    .max(15, "Phone number must not exceed 15 digits"),
});

export default registerCompanyValidation;
