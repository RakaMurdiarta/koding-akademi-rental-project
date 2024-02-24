import * as Yup from "yup";
import { ValidationConstant } from "./constant";
const rentValidation = Yup.object({
  from: Yup.string().required("From date is required"),
  until: Yup.string().required("Until date is required"),
});

export default rentValidation;
