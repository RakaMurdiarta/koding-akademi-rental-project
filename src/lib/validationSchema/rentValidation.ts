import * as Yup from "yup";
const rentValidation = Yup.object({
  startDate: Yup.string().required("Select Date first!"),
  endDate: Yup.string().required("Select Date first!"),
});

export default rentValidation;
