import React, { useState } from "react";
import { View, StyleSheet, Image,TouchableOpacity, Text } from "react-native";
import Animated, { useSharedValue,withSpring } from 'react-native-reanimated';


const MenuBtn = () =>{
  const left = useSharedValue(-420);
  let i = 0;
    const onPress = () =>{
      if(i==0){
        left.value = withSpring(left.value + 300);
          i = 1;
      }
        else {
          left.value = withSpring(left.value - 300);
          i = 0;
        }
    };
    return(
        <>
          <TouchableOpacity onPress={onPress} style={styles.menubtn}>
            <Text style={styles.text}>|||</Text>
          </TouchableOpacity>
          <Animated.View style={[styles.menu, {left}]}>
          <View style={styles.container}>
            <TouchableOpacity onPress={onPress} style={styles.menubtn2}>
            <Text style={styles.text}>|||</Text>
          </TouchableOpacity>
          </View>
          </Animated.View>
          
        </>
    );
};
const styles = StyleSheet.create({
 menubtn:{
    width: "15%",
    aspectRatio: 1 / 1,
    position: "absolute",
    top: 25,
    left: 15,
    borderRadius: 10,
    alignItems: "center",
 },
 menubtn2:{
  top: 0,
  left: 105,
  borderRadius: 10,
  alignItems: "center",
},
 text:{
    fontSize: 50,
    color:"#000000",
    top: "0%",
    left: "12%",
    transform: [{rotate: '90deg'}],
 },
 menu:{
    position: "absolute",
    backgroundColor: "white",
    width: "100%",
    height: "97%",
    right: "auto",
    top: "3%",
    borderRadius: 20,
    borderColor: "#E0E0E0",
    borderWidth:5,
 },
 container:{
width: "100%",
height: "9%",
borderBottomWidth: 5,
borderColor: "#E0E0E0",

 }

});
export default MenuBtn