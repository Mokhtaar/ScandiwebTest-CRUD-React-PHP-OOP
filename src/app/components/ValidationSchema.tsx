import * as yup from "yup";

// const invalidCharactersRegex = /^[+\-eE]+$/;

const onlyCharacters = /^[a-zA-Z]+$/;
const onlyNumbers = /^[0-9]+$/;

const ValidationSchema = yup.object({
  SKU: yup.string().required("SKU is required"),
  name: yup
    .string()
    .matches(onlyCharacters, "Only characters are allowed")
    .required("Name is required"),
  price: yup
    .string()
    .matches(onlyNumbers, "Only numbers are allowed")
    .required("Price is required"),
  type: yup
    .string()
    .oneOf(["DVDdisc", "Furniture", "Book"], "Invalid product type")
    .required("Type is required"),
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
