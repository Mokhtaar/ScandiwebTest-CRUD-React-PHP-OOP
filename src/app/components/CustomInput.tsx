import { FieldHookConfig, useField } from "formik";
import React, { FC } from "react";

interface CustomInputProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  id: string;
  // pattern: string
}

// const blockInvalidChar = (e: React.KeyboardEvent<HTMLInputElement>) =>
//   ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

const CustomInput: FC<CustomInputProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="justify-between flex">
      <label>{label}</label>
      <div>
        <input
          // onKeyDown={(e) => blockInvalidChar(e)}
          className="border-2 pl-1 border-black"
          {...field}
          {...props}
        />
        {meta.error && meta.touched ? (
          <p className="text-red-500 text-center">{meta.error}</p>
        ) : null}
      </div>
    </div>
  );
};

export default CustomInput;
