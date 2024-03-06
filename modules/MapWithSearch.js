import React, { useState } from 'react';
import { View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet } from 'react-native';


const MapWithSearch = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handlePlaceSelected = (data, details) => {
    if (details && details.geometry && details.geometry.location) {
      const { lat, lng } = details.geometry.location;
      setSelectedLocation({ latitude: lat, longitude: lng });
      console.log(lat, lng, data.terms[1]);
    } else {
      console.warn("Selected place details are missing or invalid:", JSON.stringify(details?.geometry?.location));
      // Handle the error gracefully, e.g., display a message to the user
        console.log(JSON.stringify(details?.geometry?.location));
    }
  };
  
  
  

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
  });
export default MapWithSearch;
