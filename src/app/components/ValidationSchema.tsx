import * as yup from "yup";

const onlyAlphabetsRegex = /^[a-zA-Z]+$/;
const onlyNumbersRegex = /^[0-9]+$/;
const zeroAtStartOfStrRegex = /^(?!0).+$/;

const ValidationSchema = yup.object({
  SKU: yup.string().required("SKU is required"),
  name: yup
    .string()
    .matches(onlyAlphabetsRegex, "Only alphabets are allowed")
    .required("Name is required"),
  price: yup
    .string()
    .test("StartingZeroError", "Number cannot start with 0", (value) => {
      return zeroAtStartOfStrRegex.test(value!);
    })
    .matches(onlyNumbersRegex, "Invalid value")
    .required("Price is required"),
  type: yup
    .string()
    .oneOf(["DVDdisc", "Furniture", "Book"], "Invalid product type")
    .required("Type is required"),
  size: yup.string().when("type", {
    is: "DVDdisc",
    then: (schema) =>
      schema
        .test("StartingZeroError", "Number cannot start with 0", (value) => {
          return zeroAtStartOfStrRegex.test(value!);
        })
        .matches(onlyNumbersRegex, "Invalid value")
        .required("Size is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  weight: yup.string().when("type", {
    is: "Book",
    then: (schema) =>
      schema
        .test("StartingZeroError", "Number cannot start with 0", (value) => {
          return zeroAtStartOfStrRegex.test(value!);
        })
        .matches(onlyNumbersRegex, "Invalid value")
        .required("Weight is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  height: yup.string().when("type", {
    is: "Furniture",
    then: (schema) =>
      schema
        .test("StartingZeroError", "Number cannot start with 0", (value) => {
          return zeroAtStartOfStrRegex.test(value!);
        })
        .matches(onlyNumbersRegex, "Invalid value")
        .required("Height is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  width: yup.string().when("type", {
    is: "Furniture",
    then: (schema) =>
      schema
        .test("StartingZeroError", "Number cannot start with 0", (value) => {
          return zeroAtStartOfStrRegex.test(value!);
        })
        .matches(onlyNumbersRegex, "Invalid value")
        .required("Width is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  length: yup.string().when("type", {
    is: "Furniture",
    then: (schema) =>
      schema
        .test("StartingZeroError", "Number cannot start with 0", (value) => {
          return zeroAtStartOfStrRegex.test(value!);
        })
        .matches(onlyNumbersRegex, "Invalid value")
        .required("Length is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

export default ValidationSchema;
