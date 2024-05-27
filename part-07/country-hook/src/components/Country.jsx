// Country.jsx
import { useCountry } from "../hooks";

const Country = ({ name }) => {
  const country = useCountry(name);

  if (!country) {
    return null;
  }

  if (!country.isFound) {
    return <div>not found...</div>;
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img
        src={country.data.flag}
        height="200"
        alt={`picture of ${country.data.name} flag`}
      />
    </div>
  );
};
export default Country;
