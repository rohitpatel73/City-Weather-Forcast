import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import WeatherDetails from '../../app/components/WeatherDetails';
import MapComponent from '../../app/components/MapComponent';
import { WeatherData } from '../../app/utils/types';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

export default function CityWeatherPage() {
  const router = useRouter();
  const { cityId } = router.query;
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!cityId) return;

    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityId}&appid=${API_KEY}&units=metric`
        );
        setWeather(response.data);
      } catch (err) {
        console.error('Failed to fetch weather data:', err);
        setError('Weather information not found for this city.');
      }
    };

    fetchWeather();
  }, [cityId]);

  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (!weather) return <div className="p-4">Loading weather data...</div>;

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-sky-100 to-white">
      <h1 className="text-3xl font-bold mb-4">Weather in {cityId}</h1>
      <WeatherDetails weather={weather} />
      <MapComponent lat={weather.coord.lat} lon={weather.coord.lon} />
    </div>
  );
}
