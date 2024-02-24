import * as Yup from "yup";

const addVehicleValidation = Yup.object({
  model: Yup.string()
    .required("Model is required")
    .min(2, "Model must be at least 2 characters long")
    .max(50, "Model can be no more than 50 characters long"),
  year: Yup.number()
    .required("Year is required")
    .min(1900, "Year must be 1900 or later")
    .max(new Date().getFullYear(), "Year cannot be in the future"),
  identityNumber: Yup.string().required("Identity number is required"),
  type: Yup.string().required("Type is required"),
  price: Yup.number()
    .required("Price is required")
    .min(1, "Price must be at least 1"),
  imageUrl: Yup.string()
    .required("Image URL is required")
    .url("Invalid URL format"),
});

export default addVehicleValidation;
