// CountryForm.jsx

import { useField } from "../hooks";

const CountryForm = ({ setName }) => {
  const nameInput = useField("text");

  const fetchCountry = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <form onSubmit={fetchCountry}>
      <input {...nameInput} />
      <button>find</button>
    </form>
  );
};

export default CountryForm;
