import { useField } from "formik";
import React, { FC } from "react";

interface CustomInputProps  {
  label: string;
  name: string;
  placeholder: string;
  children: React.ReactNode;
}

const CustomSelect: FC<CustomInputProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-2 w-80 justify-between flex">
      <label>{label}</label>
      <div>
        <select
          className="border-2 pl-1 py-1 w-[185px] border-black"
          {...field}
          {...props}
        />
        {meta.error && meta.touched ? (
          <div className="text-red-500 text-center">{meta.error}</div>
        ) : null}
      </div>
    </div>
  );
};

export default CustomSelect;
