import { View, StyleSheet } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GOOGLE_PLACES_API_KEY = 'AIzaSyCYegMBJlHBHswBPktePcFD41dweqMa5U0'; // never save your real api key in a snack!

const GooglePlacesInput = () => {
  const ref = useRef();

  useEffect(() => {
    ref.current?.setAddressText('Some Text');
  }, []);

  return (
    <View style={styles.container}>
    <GooglePlacesAutocomplete 
        GooglePlacesDetailsQuery={{ fields: "geometry" }}
        fetchDetails={true} // you need this to fetch the details object onPress
        placeholder="Search"
      onPress={(data, details = null) => {
        console.log(JSON.stringify(details?.geometry?.location.lat));
      }}
      query={{
        key: GOOGLE_PLACES_API_KEY,
        language: 'en',
      }}
    />
    </View>
    
  );
  
};
const styles = StyleSheet.create({
    container:{
        top: 35,
        right: 20,
        height: 200,
        width: "70%",
        position: "absolute",
    }
  });


export default GooglePlacesInput;



