import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  Image,
} from "react-native";
import MenuBtn from "./modules/MenuBtn";
import MapWithSearch from "./modules/MapWithSearch";
import WeatherApp from "./modules/Request";


const Waiting_Driver_Screen = () => {
  
  return (
    <View style={styles.container}>
      
      <MapWithSearch></MapWithSearch>
      <MenuBtn></MenuBtn>
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