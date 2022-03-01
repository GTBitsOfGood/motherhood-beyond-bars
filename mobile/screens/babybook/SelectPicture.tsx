import React, { useState } from "react";
import { View } from "../../components/Themed";
import { StyleSheet, Button, Switch, Text, TextInput } from "react-native";
import { OnboardingStackScreenProps } from "../../types";

type Props = OnboardingStackScreenProps<"SelectPicture">;

export default function SelectPicture({ navigation }: Props) {

  return (
    <View style={styles.container}>
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
    }
});