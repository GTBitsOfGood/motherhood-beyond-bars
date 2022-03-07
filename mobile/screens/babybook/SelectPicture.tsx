import React, { useState } from "react";
import { View } from "../../components/Themed";
import { StyleSheet, Button, Switch, Text, TextInput, Image } from "react-native";
import { OnboardingStackScreenProps } from "../../types";

type Props = OnboardingStackScreenProps<"SelectPicture">;

export default function SelectPicture({ navigation }: Props) {

  return (
    <View style={styles.container}>
      <View style={{height:'80%'}}>
        <Image
            source={require("../../components/images/baby_img.jpeg")}
            style={styles.thumbnail}
          />
      </View>
          <Text style={styles.title}>Description</Text>
          <TextInput placeholder="How the baby is doing, what s/he did today, etc."
          placeholderTextColor="#666666"></TextInput>
      <Button title='Upload' onPress={() => navigation.navigate("BabyBook")}></Button>
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
      textAlign: 'center'
    },
    thumbnail: {
      width: '100%',
      height: '100%',
      resizeMode: "contain"
    }
});

function uri(uri: any) {
  throw new Error("Function not implemented.");
}
