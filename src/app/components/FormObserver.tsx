import { useFormikContext } from "formik";
import { Dispatch, SetStateAction, useEffect } from "react";

interface FormValues {
  type: string;
}

interface propType {
  setType: Dispatch<SetStateAction<string>>;
}

const FormValuesObserver = ({ setType }: propType) => {
  const { values } = useFormikContext<FormValues>();

  useEffect(() => {
    setType(values.type);
  }, [values.type]);
  return null;
};

export default FormValuesObserver;
