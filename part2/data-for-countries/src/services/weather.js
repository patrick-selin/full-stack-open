import axios from "axios";

// https://api.openweathermap.org/data/2.5/weather?q=finland&appid=66c59beedea90012a301b8ed1911fb99

// const apiKey = "66c59beedea90012a301b8ed1911fb99";
const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
console.log(import.meta.env.VITE_OPENWEATHER_API_KEY);
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

const getCountryWeather = (city) => {
  const request = axios.get(
    `${baseUrl}?q=${city}&appid=${apiKey}&units=metric`
  );
  return request.then((response) => response.data);
};

export default {
  getCountryWeather,
};
