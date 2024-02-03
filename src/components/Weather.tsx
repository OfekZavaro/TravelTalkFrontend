import React, { useEffect, useState } from 'react';
import { apiClient } from '../utils/apiClient';

interface WeatherProps {
  city: string;
}

interface WeatherData {
  temperature: number;
  description: string;
  icon: string;
}

const Weather: React.FC<WeatherProps> = ({ city }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await apiClient.get(`/weather/${city}`);
        const { temperature, description, icon } = response.data;
        setWeather({
            temperature,
            description,
            icon,
        });
      } catch (error) {
        console.error('Failed to fetch weather', error);
      }
    };

    if (city) {
      fetchWeather();
    }
  }, [city]);

  if (!weather) return <div style={{ color: '#6c757d' }}>Loading weather...</div>;

  const iconUrl = `http://openweathermap.org/img/wn/${weather.icon}.png`;

  return (
    <div>
      <img src={iconUrl} alt={weather.description} style={{ width: '50px', height: '50px' }} />  
      <p style={{ margin: '0', fontSize: '0.85rem', color: '#4169E1' }}>Temperature: {weather.temperature}°C</p>
      <p style={{ margin: '0', fontSize: '0.80rem', color: '#4169E1' }}>Description: {weather.description}</p>
    </div>
  );
};

export default Weather;
