import React from "react";

const CountryCard = ({ country }) => (
  <div>
    <h2>{country.name.common}</h2>
    <p>capital {country.capital[0]}</p>
    <p>area: {country.area}</p>
    <strong>Languages</strong>
    <ul>
      {Object.values(country.languages).map((language) => (
        <li key={language}>{language}</li>
      ))}
    </ul>
    <img
      src={country.flags.png}
      alt={`${country.name.common} flag`}
    />
  </div>
);

export default CountryCard;