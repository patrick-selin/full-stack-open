// App.jsx

import React, { useState } from "react";
import Country from "./components/Country";
import CountryForm from "./components/CountryForm";

const App = () => {
  const [name, setName] = useState("");

  return (
    <div>
      <h2>Countries App</h2>
      <CountryForm setName={setName} />
      <Country name={name} /> 
    </div>
  );
};

export default App;