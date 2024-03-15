import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const HourlyForecast = ({ selectedLocation }) => {
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const apiKey = '6a2f9c7c3c8a4191939248a6b25a586d';

  const lat = selectedLocation?.latitude;
  const lng = selectedLocation?.longitude;

  useEffect(() => {
    const fetchHourlyForecast = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`
        );
        setHourlyForecast(response.data.list.slice(0, 8));
      } catch (error) {
        console.error('Error fetching hourly forecast:', error);
      }
    };

    if (lat && lng) {
      fetchHourlyForecast();
    }
  }, [apiKey, lat, lng]);

  const getWeatherIcon = (weatherId) => {
    if (weatherId >= 200 && weatherId <= 232) return 'thunderstorm';
    else if (weatherId >= 300 && weatherId <= 321) return 'rainy';
    else if (weatherId >= 500 && weatherId <= 531) return 'rainy';
    else if (weatherId >= 600 && weatherId <= 622) return 'snow';
    else if (weatherId >= 701 && weatherId <= 781) return 'haze';
    else if (weatherId === 800) return 'sunny';
    else if (weatherId >= 801 && weatherId <= 804) return 'partly-sunny';
    else return 'cloudy';
  };

  const renderHourlyForecastItem = ({ item }) => {
    const weatherIcon = getWeatherIcon(item.weather[0].id);
    const time = new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
      <View style={styles.hourlyForecastItem}>
        <Text style={styles.time}>{time}</Text>
        <Ionicons name={weatherIcon} size={24} color="black" />
        <Text style={styles.temperature}>{Math.round(item.main.temp)}°C</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Hourly Forecast</Text>
      <FlatList
        data={hourlyForecast}
        renderItem={renderHourlyForecastItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.hourlyForecastContainer}
        getItemLayout={(data, index) => ({
          length: styles.hourlyForecastItem.width,
          offset: styles.hourlyForecastItem.width * index,
          index,
        })}
        initialScrollIndex={0}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  hourlyForecastContainer: {
    paddingRight: 20, // Add some padding to the right
  },
  hourlyForecastItem: {
    alignItems: 'center',
    marginRight: 20,
    width: width / 4, // Set a fixed width for each item based on screen width
},
time: {
  fontSize: 14,
  marginBottom: 5,
},
temperature: {
  fontSize: 16,
  fontWeight: 'bold',
},
});

export default HourlyForecast;