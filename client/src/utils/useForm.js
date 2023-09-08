import { useState } from "react";

export default function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  const resetForm = () => {
    setValues(initialValues);
  };

  return [
    values,
    (e) => {
      setValues({
        ...values,
        [e.target.name]:
          e.target.type === "checkbox" ? e.target.checked : e.target.value,
      });
    },
    resetForm,
  ];
}
