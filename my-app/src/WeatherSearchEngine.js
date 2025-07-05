import React, { useState } from "react";
import axios from "axios";

export default function WeatherSearch() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  function handleSearch(event) {
    event.preventDefault();

    const apiKey = "7ed26a6948c661d05fafe7355b41b2ec";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then((response) => {
      setWeather({
        temperature: response.data.main.temp,
        description: response.data.weather[0].description,
        humidity: response.data.main.humidity,
        wind: response.data.wind.speed,
        icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      });
    });
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter a city..."
          value={city}
          onChange={handleCityChange}
        />
        <button type="submit">Search</button>
      </form>

      {weather && (
        <div>
          <h2>
            The current weather in <em>{city}</em>
          </h2>
          <ul>
            <li>
              <strong>Temperature:</strong> {Math.round(weather.temperature)}°C
            </li>
            <li>
              <strong>Description:</strong> {weather.description}
            </li>
            <li>
              <strong>Humidity:</strong> {weather.humidity}%
            </li>
            <li>
              <strong>Wind:</strong> {weather.wind} km/h
            </li>
          </ul>
          <img src={weather.icon} alt={weather.description} />
        </div>
      )}
    </div>
  );
}
