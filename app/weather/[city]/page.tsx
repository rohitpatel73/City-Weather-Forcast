import { fetchWeatherByCityName } from '@/app/utils/api'; 
import { notFound } from 'next/navigation';

export default async function WeatherPage({ params }: { params: { city: string } }) {
  // console.log('City:', params.city); 

  try {
    const weatherData = await fetchWeatherByCityName(params.city);
    
    if (!weatherData) {
      return notFound(); 
    }

    return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
  <h1 className="text-3xl font-semibold text-gray-800 mb-4 text-center">
    Weather in {weatherData.name}
  </h1>
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <span className="text-lg text-gray-700 font-medium">Temperature:</span>
      <span className="text-xl text-blue-500 font-bold">
        {weatherData.main.temp}°C
      </span>
    </div>
    <div className="flex items-center justify-between">
      <span className="text-lg text-gray-700 font-medium">Humidity:</span>
      <span className="text-xl text-green-500 font-bold">
        {weatherData.main.humidity}%
      </span>
    </div>
    <div className="flex items-center justify-between">
      <span className="text-lg text-gray-700 font-medium">Wind Speed:</span>
      <span className="text-xl text-teal-500 font-bold">
        {weatherData.wind.speed} m/s
      </span>
    </div>
    <div className="flex items-center justify-between">
      <span className="text-lg text-gray-700 font-medium">Pressure:</span>
      <span className="text-xl text-yellow-500 font-bold">
        {weatherData.main.pressure} hPa
      </span>
    </div>
  </div>
</div>

    );
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return notFound(); 
  }
}
