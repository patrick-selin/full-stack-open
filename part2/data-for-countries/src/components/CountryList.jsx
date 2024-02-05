const CountryList = ({ countries, onCountryClick }) => (
  <ul>
    {countries.map((country) => (
      <li key={country.cca2}>
        {country.name.common}
        <button onClick={() => onCountryClick(country)}>Show</button>
      </li>
    ))}
  </ul>
);

export default CountryList;
