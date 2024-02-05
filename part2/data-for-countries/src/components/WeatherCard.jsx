const WeatherCard = ({ weatherData }) => (
  <div>
    <h2>Weather in {weatherData.name}</h2>
    <p>temperature {weatherData.main.temp} Celsius</p>
    <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} alt="Weather Icon" />
    <p>wind {weatherData.wind.speed} m/s</p>
  </div>
);

export default WeatherCard;