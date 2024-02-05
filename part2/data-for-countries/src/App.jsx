import { useState, useEffect } from "react";
import countryService from "./services/countries";
import SearchBar from "./SearchBar";
import CountryList from "./CountryList";

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
    if (filteredCountries.length === 1) {
      const countryName = filteredCountries[0].name.common;

      countryService.getCountry(countryName).then((countryInfo) => {
        console.log("Country infooo", countryInfo);
      });
    } else if (filteredCountries.length > 10) {
      setShowPrompt(true);
    } else {
      setShowPrompt(false);
    }
  }, [filteredCountries]);

  return (
    <>
      <SearchBar
        value={searchQuery}
        onChange={handleSearch}
      />

      <div>
        {showPrompt && <p>Too many matches, specify another filter</p>}
        {!showPrompt && searchQuery.trim() !== "" && (
          <div>
            {filteredCountries.length === 1 ? (
              <>
                <h2>{filteredCountries[0].name.common}</h2>
                <p>capital {filteredCountries[0].capital[0]}</p>
                <p>area: {filteredCountries[0].area}</p>
                <strong>Languages</strong>
                <ul>
                  {Object.values(filteredCountries[0].languages).map(
                    (language) => (
                      <li key={language}>{language}</li>
                    )
                  )}
                </ul>
                <img
                  src={filteredCountries[0].flags.png}
                  alt={`${filteredCountries[0].name.common} flag`}
                />
              </>
            ) : (
              <CountryList countries={filteredCountries} />
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
