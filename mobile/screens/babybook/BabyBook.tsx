import React, { useState } from "react";
import { View } from "../../components/Themed";
import {
  StyleSheet,
  Button,
  Switch,
  Text,
  TouchableOpacity,
} from "react-native";
import { OnboardingStackScreenProps } from "../../types";
import * as ImagePicker from "expo-image-picker";

type Props = OnboardingStackScreenProps<"BabyBook">;

export default function BabyBook({ navigation }: Props) {
  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    navigation.navigate("SelectPicture");
  };

  return (
    <View style={styles.container}>
      <View style={styles.textbox}>
        <Text style={styles.title}>Jordan Jacobs</Text>
        <Text>Birthday 00/00/0000</Text>
      </View>
      <View style={{ padding: "30%" }}></View>
      <View style={{ padding: 25 }}>
        <Text style={styles.center}>No Photos Yet</Text>
        <Text style={{ textAlign: "center" }}>
          Get started by tapping this button to add a photo of Jordan!
        </Text>
      </View>
      <View style={{ paddingTop: "50%", paddingLeft: "75%" }}>
        <TouchableOpacity
          onPress={openImagePickerAsync}
          style={styles.roundButton1}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
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
    paddingBottom: 15,
  },
  center: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 15,
    textAlign: "center",
  },
  textbox: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  roundButton1: {
    width: 75,
    height: 75,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
    backgroundColor: "#304CD1",
  },
  buttonText: {
    color: "white",
    fontSize: 45,
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
});
