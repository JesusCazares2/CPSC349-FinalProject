import { useEffect, useState } from "react";
import WeatherDisplay from "../../components/WeatherDisplay/WeatherDisplay";

export default function Weather() {
    const [weather, setWeather] = useState(null);

    const API_KEY = process.env.REACT_APP_API_KEY;
    const LAT = 33.876118;
    const LON = -117.921410;

    useEffect(() => {
        async function fetchWeather() {
            try {
                const res = await fetch(
                    `https://api.openweathermap.org/data/3.0/onecall?lat=${LAT}&lon=${LON}&exclude=minutely,alerts&units=imperial&appid=${API_KEY}`
                );
                const data = await res.json();
                setWeather(data);
            } catch (err) {
                console.error(err);
            }
        }

        fetchWeather();
    }, []);

    if (!weather) return <p>No Weather Data</p>;

    return <WeatherDisplay data={weather} />;
}