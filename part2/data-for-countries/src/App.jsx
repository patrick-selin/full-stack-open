import { useState, useEffect } from "react";
import countryService from "./services/countries";
import SearchBar from "./components/SearchBar";
import CountryList from "./components/CountryList";
import CountryCard from "./components/CountryCard";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    countryService.getAllCountries().then((data) => {
      setCountries(data);
    });
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setShowPrompt(false);
    setSelectedCountry(null);
  };

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (filteredCountries.length === 1) {
      setShowPrompt(false);
      setSelectedCountry(filteredCountries[0]);
    } else if (filteredCountries.length > 10) {
      setShowPrompt(true);
    } else {
      setShowPrompt(false);
    }
  }, [filteredCountries]);

  return (
    <>
      <SearchBar value={searchQuery} onChange={handleSearch} />

      <div>
        {showPrompt && <p>Too many matches, specify another filter</p>}
        {!showPrompt && searchQuery.trim() !== "" && (
          <div>
            {selectedCountry ? (
              <CountryCard country={selectedCountry} />
            ) : (
              <CountryList
                countries={filteredCountries}
                onCountryClick={handleCountryClick}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default App;