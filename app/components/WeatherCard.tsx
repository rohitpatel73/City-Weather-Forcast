import { WeatherData } from '../utils/types';

interface Props {
  weather: WeatherData;
}

const WeatherCard: React.FC<Props> = ({ weather }) => {
  return (
    <div className="bg-white shadow-md rounded p-4 max-w-md mx-auto text-center">
      <h2 className="text-xl font-semibold mb-2">{weather.name}</h2>
      <p className="text-gray-700">{weather.weather[0].description}</p>
      <p className="text-3xl font-bold">{weather.main.temp}&deg;C</p>
      <div className="flex justify-around mt-4">
        <div>
          <p className="text-sm">Humidity</p>
          <p>{weather.main.humidity}%</p>
        </div>
        <div>
          <p className="text-sm">Wind</p>
          <p>{weather.wind.speed} m/s</p>
        </div>
        <div>
          <p className="text-sm">Pressure</p>
          <p>{weather.main.pressure} hPa</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
