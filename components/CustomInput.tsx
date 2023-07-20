import { useField } from "formik";
import React, { useEffect } from "react";

const CustomInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
 useEffect(()=>{
  
 },[])
  return (
    <div className="mb-3 w-80 justify-between flex">
      <label>{label}</label>
      <div>
        <input
          className='border-2 pl-1 border-black'
          {...field}
          {...props}
        />
        {meta.error && meta.touched ? (
          <p className="text-white text-center">{meta.error}</p>
        ) : null}
      </div>
    </div>
  );
};

export default CustomInput;
