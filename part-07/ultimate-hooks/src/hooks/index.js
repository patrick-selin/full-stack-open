// hooks/index.js

import { useState, useEffect } from "react";
import axios from "axios";

// useField Hook
//
export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      setResources(response.data);
    });
  }, [setResources, baseUrl]);

  const create = async (newResource) => {
    const res = await axios.post(baseUrl, newResource);
    console.log(`THIS is RES :: ${JSON.stringify(res)}`);
    setResources([...resources, res.data]);
  };

  const service = {
    create,
  };

  return [resources, service];
};

// useField Hook
//
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
