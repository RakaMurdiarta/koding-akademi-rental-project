import * as Yup from "yup";
import { ValidationConstant } from "./constant";
const loginValidation = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  //   username: Yup.string().required("Username is required!"),
  password: Yup.string()
  .required("Password is required"),
});

export default loginValidation;
