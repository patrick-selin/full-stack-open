const CountryList = ({ countries }) => (
    <ul>
      {countries.map((country) => (
        <li key={country.cca2}>{country.name.common}</li>
      ))}
    </ul>
  );
  
  export default CountryList;
  