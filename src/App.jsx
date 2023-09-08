import { useState } from "react";
import "./App.css";

function App() {

  const BASE_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather?";
  const WEATHER_API_KEY = "6ba2d126dc7cc5c8553e08078ef62590";

  const [unit, setUnit] = useState("metric");
  const [city, setCity] = useState("");


  const [weatherData, setWeatherData] = useState({
    location: "",
    temperature: "",
    humidity: "",
    windSpeed: "",
  });
 
function handleInput (e) {
  e.target.value === "imperial"?  setUnit("imperial") : setUnit("metric")
}

// fetch the input value from city textbox
function cityInput (e){
  setCity(e.target.value);
}




  async function weatherInfo() {

    // using async await
    let response = await fetch(
      `${BASE_WEATHER_URL}q=${city}&units=${unit}&appid=${WEATHER_API_KEY}`
    );

    let weatherDataResponse = await response.json();

    let unitsObj = {
      metric: {
        temp: "°C",
        humidity: "%",
        windspeed: "m/sec",
      },
      imperial: {
        temp: "°F",
        humidity: "%",
        windspeed: "miles/hour",
      },
    };

    const weatherData = {
      location: weatherDataResponse.sys.country,
      temperature: weatherDataResponse.main.temp + `${unitsObj[unit].temp}`,
      humidity: weatherDataResponse.main.humidity + ` ${unitsObj[unit].humidity}`,
      windSpeed: weatherDataResponse.wind.speed + ` ${unitsObj[unit].windspeed}`,
    }
    
setWeatherData(weatherData);
  }

  return (
    <>
      <div id="background">
        <div id="container">
          <div id="img-area">
            <h1>Weather Scanner</h1>
            <h4>Helps you find weather conditions in cities...</h4>
          </div>
          <div id="weather-info">
            <div id="weather-container">
              <div id="radioBtn">
                <input
                  id="metricRadioBtn"
                  type="radio"
                  name="rBtn"
                  value="metric"
                  checked={unit === "metric"}
                  onChange={handleInput}
                />
                <label id="label1" htmlFor="metricRadioBtn">
                  Metric
                </label>

                <input
                  id="imperialrRadioBtn"
                  type="radio"
                  name="rBtn"
                  value="imperial"
                  checked={unit === "imperial"}
                  onChange={handleInput}
                />
                <label id="label2" htmlFor="imperialrRadioBtn">
                  Imperial
                </label>
              </div>
              <div id="input-btn-section">
                <input
                  id="cityName-input"
                  type="text"
                  placeholder="Enter City Name"
                  onChange={cityInput}
                />
                <button id="inputBtn" onClick={weatherInfo}>
                  Get Weather
                </button>
              </div>

              <div id="details">
                <span>Location:</span>{" "}
                <span className="result" id="location">{weatherData.location}</span>
                <hr />
                <span>Temperature:</span>{" "}
                <span className="result" id="temperature">{weatherData.temperature}</span>
                <hr />
                <span>Humidity:</span>{" "}
                <span className="result" id="humidity">{weatherData.humidity}</span>
                <hr />
                <span>WindSpeed:</span>{" "}
                <span className="result" id="windSpeed">{weatherData.windSpeed}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
