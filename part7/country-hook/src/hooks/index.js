// hooks/index.js

import { useState, useEffect } from "react";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

// modules can have several named exports
export const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {})

  return country;
};
