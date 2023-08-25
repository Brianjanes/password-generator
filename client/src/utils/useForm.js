import { useState } from "react";

export function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  const handleInputChange = (fieldName) => (e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;

    setValues({
      ...values,
      [fieldName]: value,
    });
  };

  return [values, handleInputChange];
}
