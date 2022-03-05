import React, { useState } from "react";
import { View } from "../../components/Themed";
import { StyleSheet, Button, Switch, Text } from "react-native";
import { BookStackScreenProps } from "../../types";

type Props = BookStackScreenProps<"BabyBook">;

export default function BabyBook({ navigation }: Props) {

  return (
    <View style={styles.container}>
      <View style={styles.textbox}>
          <Text style={styles.title}>Jordan Jacobs</Text>
          <Text style={styles.title}>Birthday 00/00/0000</Text>
      </View>
      <View style={{padding:25}}>
          <Text style={styles.title}>No Photos Yet</Text>
          <Text style={{textAlign: 'center'}}>Get started by tapping this button to add a photo of Jordan!</Text>
      </View>
      <Button title='+' onPress={() => navigation.navigate("SelectPicture")}></Button>
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