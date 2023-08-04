import * as yup from "yup";

const ValidationSchema = yup.object({
  SKU: yup.string().trim().required("SKU is required"),
  name: yup.string().required("Name is required"),
  price: yup
    .number()
    .positive("Only positive values")
    .required("Price is required"),
  type: yup
    .string()
    .oneOf(["DVDdisc", "Furniture", "Book"], "Invalid product type")
    .required("Required"),
  size: yup.number().when("type", {
    is: "DVDdisc",
    then: (schema) =>
      schema.positive("Only positive values").required("Size is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  weight: yup.number().when("type", {
    is: "Book",
    then: (schema) =>
      schema.positive("Only positive values").required("Weight is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  height: yup.number().when("type", {
    is: "Furniture",
    then: (schema) =>
      schema.positive("Only positive values").required("Height is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  width: yup.number().when("type", {
    is: "Furniture",
    then: (schema) =>
      schema.positive("Only positive values").required("Width is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  length: yup.number().when("type", {
    is: "Furniture",
    then: (schema) =>
      schema.positive("Only positive values").required("Length is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

export default ValidationSchema;
