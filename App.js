import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  Image,
} from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import MapViewModule from "./modules/MapViewModule";
import GooglePlacesInput from "./modules/SearchBar";


const Waiting_Driver_Screen = () => {
  
  return (
    <View style={styles.container}>
      
      <MapViewModule></MapViewModule>
      <GooglePlacesInput></GooglePlacesInput>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Waiting_Driver_Screen;