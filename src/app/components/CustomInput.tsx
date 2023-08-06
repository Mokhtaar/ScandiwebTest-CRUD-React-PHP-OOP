import { useField } from "formik";
import React, { ChangeEvent, Dispatch, SetStateAction, useEffect } from "react";

interface CustomInputProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  id: string;
  isUnique?: boolean;
  setIsUnique?: Dispatch<SetStateAction<boolean>>;
}

const CustomInput = ({
  label,
  isUnique,
  setIsUnique,
  ...props
}: CustomInputProps) => {
  const [field, meta] = useField(props);
  const { onChange, ...restField } = field;

  const handleSKUchange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsUnique!(true);
    onChange(event);
  };

  return (
    <div className="justify-between flex">
      <label>{label}</label>
      <div className="w-52">
        {label !== "SKU" ? (
          <input
            className="w-full pl-1 border-2 border-black"
            {...field}
            {...props}
          />
        ) : (
          <input
            className="w-full pl-1 border-2 border-black"
            onChange={handleSKUchange}
            {...restField}
            {...props}
          />
        )}

        {meta.error && meta.touched ? (
          <p className="text-red-500 text-center">{meta.error}</p>
        ) : null}

        <p
          className={`${
            isUnique === false ? "block" : "hidden"
          } text-center text-red-500`}
        >
          SKU already exists
        </p>
      </div>
    </div>
  );
};

export default CustomInput;
