import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const WeatherInfo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.temperatureInfo}>
        <Ionicons name="thermometer" size={24} color="black" style={styles.temperatureIcon} />
        <Text>25°C                    </Text>
      </View>
      <View style={styles.weatherInfo}>
        <Ionicons name="partly-sunny" size={24} color="black" style={styles.weatherIcon} />
        <Text>Partly Cloudy</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    height:100,
    width:"100%",
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  temperatureInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  temperatureIcon: {
    marginRight: 10,
  },
  weatherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherIcon: {
    marginRight: 10,
  },
});

export default WeatherInfo;