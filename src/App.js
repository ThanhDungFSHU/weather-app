import React, { useState, useEffect } from "react";
import "./App.css";

const api = {
  API_KEY: "f3eaa23b9efcd00ee82c11e60462c731",
  base: "https://api.openweathermap.org/data/2.5/",
};
function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    // console.log("Searching");
    const fetchWeatherData = async () => {
      if (!searchCity) return;
      // console.log("searching...");
      setLoading(true);
      //Loading process
      try {
        const url = `${api.base}weather?q=${searchCity}&units=metric&APPID=${api.API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
          setWeatherInfo(
            `Name: ${data.name}.
            Country: ${data.sys.country}.
            Weather desription: ${data.weather[0].description}
            `
            // JSON.stringify(data)
          );
          setErrorMessage("");
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
      setLoading(false);
    };
    fetchWeatherData();
  }, [searchCity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCity(searchInput);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Weather App</h1>
        <label id="city-name">Input the city's name you want to find</label>
        <br />
        <input
          type="text"
          placeholder="input city"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button>Search</button>
      </form>
      <br />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {errorMessage ? (
            <div style={{ color: "red" }}>{errorMessage}</div>
          ) : (
            <div>{weatherInfo}</div>
          )}
        </>
      )}
    </>
  );
}

export default App;
