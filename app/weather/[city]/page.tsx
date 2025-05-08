import { fetchWeatherByCityName } from '@/app/utils/api';
import MapComponent from '@/app/components/MapComponent';

interface PageProps {
  params: Promise<{ city: string }>;
}

const WeatherPage = async ({ params }: PageProps) => {
  const { city } = await params;
  const weather = await fetchWeatherByCityName(city);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">Weather in {city}</h1>
      <p className="mb-4">Temperature: {weather.main.temp}°C</p>
      <MapComponent lat={weather.coord.lat} lon={weather.coord.lon} />
    </div>
  );
};

export default WeatherPage;