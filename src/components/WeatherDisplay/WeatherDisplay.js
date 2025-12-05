import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import "./WeatherDisplay.css";

export default function WeatherDisplay({ data }) {
  if (!data || !data.hourly) return <p>No Weather Available</p>;

  const today = new Date().getDate();
  const dailyData = data.daily.slice(1, 6);

  const hourlyData = data.hourly
    .filter(hour => new Date(hour.dt * 1000).getDate() === today)
    .map(hour => {
      const hourNum = new Date(hour.dt * 1000).getHours();
      const formattedHour = hourNum.toString().padStart(2, "0") + "00";
      return {
        time: formattedHour,
        temp: hour.temp,
      };
    });

  return (
    <div>

      <div className="weather-dashboard">
        <div className="hourly-chart">
          <h2>Hourly Forecast</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" tickFormatter={(h) => `${h}`} />
              <YAxis unit="°F" />
              <Tooltip />
              <Line type="monotone" dataKey="temp" stroke="red" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="daily-forecast">
          <h2>5-Day Forecast</h2>
          {dailyData.map((day, index) => (
            <div key={index} className="daily-forecast-card">
              <p>{new Date(day.dt * 1000).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</p>
              <img
                src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt={day.weather[0].description}
              />
              <p>{Math.round(day.temp.day)}°</p>
              <p>{day.weather[0].main}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}