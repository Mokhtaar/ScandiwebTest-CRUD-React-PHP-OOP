import { useField } from "formik";
import React, { ChangeEvent, Dispatch, SetStateAction } from "react";

interface CustomInputProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  id: string;
  skuIsUnique?: boolean;
  setSkuIsUnique?: Dispatch<SetStateAction<boolean>>;
}

const CustomInput = ({
  label,
  skuIsUnique,
  setSkuIsUnique,
  ...props
}: CustomInputProps) => {
  const [field, meta] = useField(props);
  const { onChange, ...restField } = field;

  const handleSKUchange = (event: ChangeEvent<HTMLInputElement>) => {
    setSkuIsUnique!(true);
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

        {skuIsUnique === false ? (
          <p className="text-center text-red-500">SKU already exists</p>
        ) : null}
      </div>
    </div>
  );
};

export default CustomInput;
