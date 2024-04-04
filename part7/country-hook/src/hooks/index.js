// hooks/index.js

import { useState, useEffect } from "react";
<<<<<<< HEAD

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
=======
import axios from 'axios'

export const useCountry = (countryName) => {
  const [country, setCountry] = useState("");

  const onChange = (event) => {
    // TODO
  };

  useEffect(() => {});

  return country;
};
>>>>>>> 8411060e8f6066074e5874af2a70f6eb2f5b63c2
