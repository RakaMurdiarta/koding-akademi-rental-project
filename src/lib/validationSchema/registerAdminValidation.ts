import * as Yup from "yup";
const registerAdminValidation = Yup.object({
  username: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default registerAdminValidation;
