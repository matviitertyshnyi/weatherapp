import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = '253682c0bd759acfb4255d4aa08c3dd7';
  const lat = 33;
  const lon = 32;
  const part = 'current';
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${apiKey}`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, [apiKey, lat, lon, part]);

  if (!weatherData) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Temperature: {Math.round(weatherData.main.temp-273)} °C</Text>
      <Text>Description: {weatherData.weather[0].description}</Text>
    </View>
  );
};

export default WeatherApp;
