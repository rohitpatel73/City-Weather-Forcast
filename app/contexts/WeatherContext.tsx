import React, { createContext, useContext, useState, ReactNode } from 'react';
import { WeatherData } from '../utils/types';

interface WeatherContextType {
  weatherData: Record<string, WeatherData>;
  setWeatherData: (cityId: string, data: WeatherData) => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [weatherDataStore, setWeatherDataStore] = useState<Record<string, WeatherData>>({});

  const setWeatherData = (cityId: string, data: WeatherData) => {
    setWeatherDataStore((prev) => ({ ...prev, [cityId]: data }));
  };

  return (
    <WeatherContext.Provider value={{ weatherData: weatherDataStore, setWeatherData }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeatherContext = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeatherContext must be used within a WeatherProvider');
  }
  return context;
};
