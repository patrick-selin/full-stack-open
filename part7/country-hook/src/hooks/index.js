// hooks/index.js

import { useState, useEffect } from "react";
import axios from "axios";

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

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const url = `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`;

    const fetchCountry = async () => { 
      try {
        const response = await axios.get(url);
        console.log(`RES :: ${JSON.stringify(response.data.name)}`);
        if (response.data.length === 0 ) {
          setCountry({
            isFound: false,
            data: null,
          });
        } else {
          const fetchedCountry = response.data;
          setCountry({
            isFound: true,
            data: {
              name: fetchedCountry.name.common,
              capital: fetchedCountry.capital,
              population: fetchedCountry.population,
              flag: fetchedCountry.flags.svg,
            },
          });
        }
      } catch (error) {
        setCountry({
          isFound: false,
          data: null,
        });
      }
    };

    if (name.length > 0) {
      fetchCountry();
    } else {
      setCountry(null);
    }
  }, [name]);

  return country;
};
