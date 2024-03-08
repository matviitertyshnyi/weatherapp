import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet } from 'react-native';
import axios from 'axios';
import * as Font from 'expo-font';

const MapWithSearch = () => {
 
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handlePlaceSelected = (data, details) => {
    if (details && details.geometry && details.geometry.location) {
      const { lat, lng } = details.geometry.location;
      setSelectedLocation({ latitude: lat, longitude: lng });
      console.log(lat, lng, data.terms[0]);
    } else {
      console.warn("Selected place details are missing or invalid:", JSON.stringify(details?.geometry?.location));
      // Handle the error gracefully, e.g., display a message to the user
        console.log(JSON.stringify(details?.geometry?.location));
    }
  };


  const Request = ({ selectedLocation }) => {
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = '253682c0bd759acfb4255d4aa08c3dd7';


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

  return (
    <View style={styles.showInfo}>
      <Text style={styles.box}>T:</Text>
      <Text style={[styles.box , styles.tempData]}> {Math.round(weatherData.main.temp-273)} °C</Text>
      <Text style={styles.box}>I:</Text>
      <Text style={[styles.box , styles.tempData]}>{weatherData.weather[0].description}</Text>
    </View>
  );
}

  return (
    <>
        <View style={styles.map}
        pointerEvents='none'
        >

      <MapView
        style={styles.map}
        userInteraction = {false}
        region={selectedLocation ? {
          latitude: selectedLocation.latitude,
          longitude: selectedLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        } : null}
        // You can add other props as needed
      >
        {selectedLocation && (
          <Marker
            coordinate={selectedLocation}
            title="Selected Location"
          />
        )}
      </MapView>
      
      </View>
      <View style={styles.container2}>
      <GooglePlacesAutocomplete
        placeholder='Search'
        GooglePlacesDetailsQuery={{ fields: "geometry" }}
        fetchDetails={true}
        onPress={(data, details = null) => handlePlaceSelected(data, details)}
        query={{
          key: 'AIzaSyCYegMBJlHBHswBPktePcFD41dweqMa5U0',
          language: 'en',
        }}
      />
      </View>
      <Request selectedLocation={selectedLocation}></Request>
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
      top:0,
      left:0,
      width: "100%",
      height: 250,
    },
    container2:{
        top: 35,
        right: 20,
        height: 200,
        width: "70%",
        position: "absolute",
    },
    showInfo:{
      flex:0,

      width:"100%",
      height:"20%",
      alignContent:"space-around",
      flexDirection:"row",
      flexWrap:"wrap",
    },
    box:{
      textShadowColor: 'rgba(127, 127, 127, 0.75)',
      textShadowOffset: {width: 2, height: 2},
      textShadowRadius: 1,
      width:"20%",
      height:"40%",
      borderColor:"black",
      borderWidth:0,
      textAlign:"center",
      fontSize:40,
    },
    tempData:{
      width:"80%",
    }
  });
export default MapWithSearch;
