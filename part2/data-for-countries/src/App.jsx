import { useState, useEffect } from "react";
import countryService from "./services/countries";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    countryService.getAllCountries().then((data) => {
      setCountries(data);
    });
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setShowPrompt(false);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    // if only one country, get info
    if (filteredCountries.length === 1) {
      const countryName = filteredCountries[0].name.common;

      countryService.getCountry(countryName).then((countryInfo) => {
        console.log("Country info:", countryInfo);
        // Handle the fetched data, e.g., set it to state
      });
    } else if (filteredCountries.length > 10) {
      setShowPrompt(true);
    } else {
      setShowPrompt(false);
    }
  }, [filteredCountries]);

  return (
    <>
      <div>
        <p>find countries</p>
        <input value={searchQuery} onChange={handleSearch} />
      </div>

      <div>
        {showPrompt && <p>Too many matches, specify another filter</p>}
        {!showPrompt && searchQuery.trim() !== "" && (
          <ul>
            {filteredCountries.map((country) => (
              <li key={country.cca2}>{country.name.common}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default App;