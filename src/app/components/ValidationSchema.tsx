import * as yup from "yup";

// const onlyNumbersRegex = new RegExp("[0-9]{10}([0-9]{2})?");
// const invalidCharactersRegex = /^[+\-eE]+$/;

const onlyCharacters = /^[a-zA-Z]+$/;

const ValidationSchema = yup.object({
  SKU: yup.string().required("SKU is required"),
  name: yup
    .string()
    .matches(onlyCharacters, "Only characters are allowed")
    .required("Name is required"),
  price: yup
    .number()
    .positive("Only positive values")
    .required("Price is required"),
  type: yup
    .string()
    .oneOf(["DVDdisc", "Furniture", "Book"], "Invalid product type")
    .required("Type is required"),
  size: yup.number().when("type", {
    is: "DVDdisc",
    then: (schema) =>
      schema.positive("Only positive values").required("Size is required"),
    // .matches(invalidCharactersRegex, "Is not in correct format"),
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
