import axios from 'axios';
import { WeatherData, CityData } from './types';

const OPEN_WEATHER_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const OPEN_WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

const CITY_DATA_URL = 'https://public.opendatasoft.com/api/records/1.0/search/';
const CITY_DATA_PARAMS = {
  dataset: 'geonames-all-cities-with-a-population-1000',
  rows: 100, 
  sort: 'name'
};

export const fetchWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    const response = await axios.get(
      `${OPEN_WEATHER_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching weather by coordinates:', error);
    throw new Error('Failed to fetch weather data');
  }
};

export const fetchWeatherByCityName = async (city: string): Promise<WeatherData> => {
  try {
    const response = await axios.get(
      `${OPEN_WEATHER_BASE_URL}/weather?q=${city}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching weather by city name:', error);
    throw new Error('Failed to fetch weather data');
  }
};

export const getCityData = async (): Promise<CityData[]> => {
  try {
    const response = await axios.get(CITY_DATA_URL, {
      params: CITY_DATA_PARAMS
    });

    type CityRecord = {
  fields: {
    name: string;
    cou_name_en: string;
    timezone: string;
  };
  recordid: string;
};

return response.data.records.map((record: CityRecord) => ({
  name: record.fields.name,
  country: record.fields.cou_name_en,
  timezone: record.fields.timezone,
  geonameid: record.recordid,
}));

  } catch (error) {
    console.error('Error fetching city data:', error);
    throw new Error('Failed to fetch city data');
  }
};
