// hooks/index.js

import { useState } from "react";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const resetField = (event) => {
    setValue("");
    event.target.value = "";
  };

  return {
    type,
    value,
    onChange,
    resetField,
  };
};
