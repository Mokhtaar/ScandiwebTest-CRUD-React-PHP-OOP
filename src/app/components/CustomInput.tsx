import { FieldHookConfig, useField } from "formik";
import React, { ChangeEvent, Dispatch, SetStateAction } from "react";

interface CustomInputProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  id: string;
  isUnique?: boolean;
  setIsUnique?: Dispatch<SetStateAction<boolean>>;
}

const CustomInput = ({ label, ...props }: CustomInputProps) => {
  const [field, meta] = useField(props);
  const { onChange, ...restField } = field;

  const handleSKUchange = (event: ChangeEvent<HTMLInputElement>) => {
    props.setIsUnique!(true);
    onChange(event);
  };

  return (
    <div className="justify-between flex">
      <label>{label}</label>
      <div>
        {label !== "SKU" ? (
          <input className="border-2 pl-1 border-black" {...field} {...props} />
        ) : (
          <input
            className="border-2 pl-1 border-black"
            onChange={handleSKUchange}
            {...restField}
            {...props}
          />
        )}

        {meta.error && meta.touched ? (
          <p className="text-red-500 text-center">{meta.error}</p>
        ) : null}

        {props.isUnique === false ? (
          <p className="text-center text-red-500">SKU already exists</p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default CustomInput;

// const blockInvalidChar = (e: React.KeyboardEvent<HTMLInputElement>) =>
//   ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

// onKeyDown={(e) => blockInvalidChar(e)}
