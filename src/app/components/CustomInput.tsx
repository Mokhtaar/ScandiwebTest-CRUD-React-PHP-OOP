import { FieldHookConfig, useField } from "formik";
import React, { FC } from "react";

interface CustomInputProps  {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  id: string
}

const CustomInput: FC<CustomInputProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-10 justify-between flex">
      <label>{label}</label>
      <div>
        <input className="border-2 pl-1 border-black" {...field} {...props} />
        {meta.error && meta.touched ? (
          <p className="text-red-500 text-center">{meta.error}</p>
        ) : null}
      </div>
    </div>
  );
};

export default CustomInput;
