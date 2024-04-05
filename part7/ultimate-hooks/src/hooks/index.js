// hooks/index.js

import { useState } from "react";
import axios from "axios";

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  // TODO

  // returun an [all resources, object of recources]

  const create = (resource) => {
    // TODO
  };

  const service = {
    create,
  };

  return [resources, service];
};

//
//
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
