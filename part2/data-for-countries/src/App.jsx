import { useState, useEffect } from "react";
import countryService from "./services/countries";
import weatherService from "./services/weather";
import SearchBar from "./components/SearchBar";
import CountryList from "./components/CountryList";
import CountryCard from "./components/CountryCard";
import WeatherCard from "./components/WeatherCard";

function App() {
  const [countries, setCountries] = useState([]);
  const [weather, setWeather] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    countryService.getAllCountries().then((data) => {
      setCountries(data);
    });
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const capital = selectedCountry.capital[0];
      weatherService.getCountryWeather(capital).then((weatherData) => {
        console.log(weatherData);
        setWeather(weatherData);
      });
    }
  }, [selectedCountry]);

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
              <>
                <CountryCard country={selectedCountry} />
                {weather && <WeatherCard weatherData={weather} />}
              </>
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
