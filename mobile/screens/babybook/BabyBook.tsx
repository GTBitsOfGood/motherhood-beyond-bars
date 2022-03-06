import React, { useState } from "react";
import { View } from "../../components/Themed";
import { StyleSheet, Button, Switch, Text, TouchableOpacity } from "react-native";
import { OnboardingStackScreenProps } from "../../types";

type Props = OnboardingStackScreenProps<"BabyBook">;

export default function BabyBook({ navigation }: Props) {

  return (
    <View style={styles.container}>
      <View style={styles.textbox}>
          <Text style={styles.title}>Jordan Jacobs</Text>
          <Text>Birthday 00/00/0000</Text>
      </View>
      <View style={{padding:'30%'}}></View>
      <View style={{padding:25}}>
          <Text style={styles.center}>No Photos Yet</Text>
          <Text style={{textAlign: 'center'}}>Get started by tapping this button to add a photo of Jordan!</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("SelectPicture")}
        style={styles.roundButton1}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 30,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      paddingBottom: 15
    },
    center: {
      fontSize: 20,
      fontWeight: "bold",
      paddingBottom: 15,
      textAlign: 'center'
    },
    textbox: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3
    },
    roundButton1: {
      width: 75,
      height: 75,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderRadius: 100,
      backgroundColor: '#304CD1',
    },
    buttonText: {
      color: 'white',
      fontSize: 45
    }
});