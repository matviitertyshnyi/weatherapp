import React from "react";
import { View, StyleSheet, Image,TouchableOpacity, Text } from "react-native";

const MenuBtn = () =>{
    const onPress = () =>{

    };
    return(
        <>
          <TouchableOpacity onPress={onPress} style={styles.menubtn}>
            <Text style={styles.text}>|||</Text>
          </TouchableOpacity>
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
 text:{
    fontSize: 50,
    color:"#000000",
    top: "0%",
    left: "12%",
    transform: [{rotate: '90deg'}],
 }

});
export default MenuBtn