import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';

import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import humidity_icon from '../assets/humidity.png';

const Weather = () => {
    const inputRef = useRef();
    const [weatherData, setWeatherData] = useState(false);

    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
    };

    const getAQIDescription = (aqi) => {
        switch (aqi) {
            case 1: return "Good";
            case 2: return "Fair";
            case 3: return "Moderate";
            case 4: return "Poor";
            case 5: return "Very Poor";
            default: return "Unknown";
        }
    };

    const search = async (city) => {
        if (city === "") {
            alert("Enter City Name");
            return;
        }
        try {
            const apiKey = import.meta.env.VITE_APP_ID;
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            const icon = allIcons[data.weather[0].icon] || clear_icon;

            const airUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${apiKey}`;
            const airRes = await fetch(airUrl);
            const airData = await airRes.json();
            const aqi = airData.list[0].main.aqi;

            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                feelsLike: Math.floor(data.main.feels_like),
                precipitation: data.rain?.['1h'] || 0,
                location: data.name,
                icon: icon,
                description: data.weather[0].description,
                aqi: getAQIDescription(aqi),
                mainWeather: data.weather[0].main,
            });
        } catch (error) {
            setWeatherData(false);
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    fetchFromCoords(lat, lon);
                },
                () => search("London")
            );
        } else {
            search("London");
        }
    }, []);

    const fetchFromCoords = async (lat, lon) => {
        try {
            const apiKey = import.meta.env.VITE_APP_ID;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            const icon = allIcons[data.weather[0].icon] || clear_icon;

            const airUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
            const airRes = await fetch(airUrl);
            const airData = await airRes.json();
            const aqi = airData.list[0].main.aqi;

            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                feelsLike: Math.floor(data.main.feels_like),
                precipitation: data.rain?.['1h'] || 0,
                location: data.name,
                icon: icon,
                description: data.weather[0].description,
                aqi: getAQIDescription(aqi),
                mainWeather: data.weather[0].main,
            });
        } catch (error) {
            setWeatherData(false);
            console.error("Error fetching location-based data:", error);
        }
    };

    const getBackgroundClass = () => {
        if (!weatherData) return 'weather clear';
        const main = weatherData.mainWeather?.toLowerCase();
        if (main.includes("rain")) return "weather rainy";
        if (main.includes("cloud")) return "weather cloudy";
        if (main.includes("snow")) return "weather snowy";
        if (main.includes("clear")) return "weather clear";
        if (main.includes("drizzle")) return "weather drizzle";
        return "weather default";
    };

    return (
        <div className={getBackgroundClass()}>
            <div className="search-bar">
                <input ref={inputRef} placeholder="Search" />
                <img src={search_icon} alt="Search" onClick={() => search(inputRef.current.value)} />
            </div>

            {weatherData && (
                <>
                    <img src={weatherData.icon} alt="Weather Icon" className="weather-icon" />
                    <p className="temperature">{weatherData.temperature}°C</p>
                    <p className="location">{weatherData.location}</p>
                    <p className="description">{weatherData.description}</p>

                    <div className="weather-data">
                        <div className="col">
                            <img src={humidity_icon} alt="Humidity Icon" />
                            <div>
                                <p>{weatherData.humidity}%</p>
                                <span>Humidity</span>
                            </div>
                        </div>
                        <div className="col">
                            <img src={wind_icon} alt="Wind Icon" />
                            <div>
                                <p>{weatherData.windSpeed} m/s</p>
                                <span>Wind Speed</span>
                            </div>
                        </div>
                        <div className="col">
                            <div>
                                <p>{weatherData.feelsLike}°C</p>
                                <span>Feels Like</span>
                            </div>
                        </div>
                        <div className="col">
                            <div>
                                <p>{weatherData.precipitation} mm</p>
                                <span>Precipitation</span>
                            </div>
                        </div>
                        <div className="col">
                            <div>
                                <p>{weatherData.aqi}</p>
                                <span>Air Quality</span>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Weather;
