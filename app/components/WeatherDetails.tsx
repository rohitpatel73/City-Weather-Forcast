import { WeatherData } from '../utils/types';

interface Props {
  weather: WeatherData;
}

const WeatherDetails: React.FC<Props> = ({ weather }) => {
  return (
    <div className="bg-white rounded shadow-lg p-6 mt-4">
      <h2 className="text-2xl font-bold mb-2">{weather.name}</h2>
      <p className="capitalize mb-2">{weather.weather[0].description}</p>
      <p className="text-lg font-semibold">Temp: {weather.main.temp}&deg;C</p>
      <p>High: {weather.main.temp_max}&deg;C | Low: {weather.main.temp_min}&deg;C</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Pressure: {weather.main.pressure} hPa</p>
      <p>Wind: {weather.wind.speed} m/s</p>
    </div>
  );
};

export default WeatherDetails;
