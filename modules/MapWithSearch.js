import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import HourlyForecast from './hourlyForecast';

const MapWithSearch = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handlePlaceSelected = (data, details) => {
    if (details && details.geometry && details.geometry.location) {
      const { lat, lng } = details.geometry.location;
      setSelectedLocation({ latitude: lat, longitude: lng });
      console.log(lat, lng, data.terms[0]);
    } else {
      console.warn("Selected place details are missing or invalid:", JSON.stringify(details?.geometry?.location));
      console.log(JSON.stringify(details?.geometry?.location));
    }
  };

  const Request = ({ selectedLocation }) => {
    const [weatherData, setWeatherData] = useState(null);
    const apiKey = 'a1b2c3d4e5f6g7h8i9j0';

    const lat = selectedLocation?.latitude;
    const lng = selectedLocation?.longitude;

    useEffect(() => {
      const fetchWeatherData = async () => {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}`
          );
          setWeatherData(response.data);
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      };

      fetchWeatherData();
    }, [apiKey, lat, lng]);

    if (!weatherData) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }

    const getWeatherIcon = (weatherId) => {
      if (weatherId >= 200 && weatherId <= 232) return 'thunderstorm';
      else if (weatherId >= 300 && weatherId <= 321) return 'rainy';
      else if (weatherId >= 500 && weatherId <= 531) return 'rainy';
      else if (weatherId >= 600 && weatherId <= 622) return 'snow';
      else if (weatherId >= 701 && weatherId <= 781) return 'haze';
      else if (weatherId === 800) return 'sunny';
      else if (weatherId >= 801 && weatherId <= 804) return 'partly-sunny'; // Changed to 'partly-sunny'
      else return 'cloudy';
    };

    const weatherIcon = getWeatherIcon(weatherData.weather[0].id);

    return (<>
      <View style={styles.showInfo}>
        <View style={styles.infoContainer}>
          <Ionicons name="thermometer" size={30} color="black" style={styles.icon} />
          <Text style={styles.infoText}>{Math.round(weatherData.main.temp - 273)} °C</Text>
        </View>
        <View style={styles.infoContainer}>
          <Ionicons name={weatherIcon} size={30} color="black" style={styles.icon} />
          <Text style={styles.infoText}>{weatherData.weather[0].description}</Text>
        </View>
      </View>
      <Request selectedLocation={selectedLocation} />
      <HourlyForecast selectedLocation={selectedLocation} />
      </>      
    );
  };


  return (
    <>
      <View style={styles.map} pointerEvents="none">
        <MapView
          style={styles.map}
          userInteraction={false}
          region={
            selectedLocation
              ? {
                  latitude: selectedLocation.latitude,
                  longitude: selectedLocation.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }
              : null
          }
        >
          {selectedLocation && <Marker coordinate={selectedLocation} title="Selected Location" />}
        </MapView>
        <LinearGradient
          style={styles.map}
          colors={['rgba(255,255,255,1)', 'transparent']}
          start={{ x: 0.5, y: 1 }}
          end={{ x: 0.5, y: 0 }}
        />
      </View>
      <View style={styles.container2}>
        <GooglePlacesAutocomplete
          placeholder="Search"
          GooglePlacesDetails
          Query={{ fields: "geometry" }}
          fetchDetails={true}
          onPress={(data, details = null) => handlePlaceSelected(data, details)}
          query={{
            key: 'AIzaSyCYegMBJlHBHswBPktePcFD41dweqMa5U0',
            language: 'en',
          }}
        />
      </View>
      <Request selectedLocation={selectedLocation} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 350,
  },
  container2: {
    top: 35,
    right: 20,
    height: 200,
    width: "70%",
    position: "absolute",
  },
  showInfo: {
    flex: 0,
    width: "100%",
    height: "20%",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  icon: {
    width: 34,
    height: 34,
    marginRight: 10,
  },
  infoText: {
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default MapWithSearch;