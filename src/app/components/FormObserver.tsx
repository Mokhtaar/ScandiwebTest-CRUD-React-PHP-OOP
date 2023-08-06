import { useFormikContext } from "formik";
import { Dispatch, SetStateAction, useEffect } from "react";

interface FormValues {
  type: string;
}

const FormValuesObserver = ({
  setType,
}: {
  setType: Dispatch<SetStateAction<string>>;
}) => {
  const { values } = useFormikContext<FormValues>();

  useEffect(() => {
    setType(values.type);
  }, [values.type]);
  return null;
};

export default FormValuesObserver;
