import React, { useState } from "react";
import { View } from "../../components/Themed";
import { StyleSheet, Button, Switch, Text } from "react-native";
import { BookStackScreenProps } from "../../types";

type Props = BookStackScreenProps<"StartBook">;

export default function StartBook({ navigation }: Props) {

  return (
    <View style={styles.container}>
          <Text style={styles.title}>Start a Baby Book</Text>
          <Text>The Baby Book is a place where you can document the baby's journey by uploading images and descriptions. Motherhood Beyond Bars will then deliver the images to the mothers, so they can stay updated on their baby's growth.</Text>
      <Button title='Get Started' onPress={() => navigation.navigate("BabyBook")}></Button>
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
    textbox: {
        backgroundColor: "#f5f5f5",
        borderRadius: 10,
        padding: 10
    }
});