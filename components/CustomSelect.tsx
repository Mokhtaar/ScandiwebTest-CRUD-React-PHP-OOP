import { useField } from "formik";
import React from "react";

const CustomSelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-3 w-80 justify-between flex">
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
