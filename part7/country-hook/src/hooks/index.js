// hooks/index.js

import { useState, useEffect } from "react";
import axios from 'axios'

export const useCountry = (countryName) => {
  const [country, setCountry] = useState("");

  const onChange = (event) => {
    // TODO
  };

  useEffect(() => {});

  return country;
};
