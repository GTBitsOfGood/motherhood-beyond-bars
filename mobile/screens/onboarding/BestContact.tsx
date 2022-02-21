import { View } from "../../components/Themed";
import { Button, Text, StyleSheet } from "react-native";
import { OnboardingStackScreenProps } from "../../types";
import React, { useContext, useEffect, useState } from "react";
import { RadioButton } from 'react-native-paper';

import {
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
  Timestamp,
} from "firebase/firestore";
import { UserContext } from "../../providers";
import { db } from "../../config/firebase";

export default function BestContact({
  navigation
}: OnboardingStackScreenProps<"BestContact">) {

  const authData = useContext(UserContext);
  const [contact, setContact] = useState("");

  async function setBestContact() {
    const caregiverDoc = doc(db, "caregivers", authData?.uid as string);
    
    updateDoc(caregiverDoc, {
      contact: contact,
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What's The Best Way To Contact You?</Text>

      <RadioButton.Group onValueChange={contact => setContact(contact)} value={contact}>
        <RadioButton.Item label="Phone" value="Phone"/>
        <RadioButton.Item label="Email" value="Email"/>
        <RadioButton.Item label="Text" value="Text"/>
      </RadioButton.Group>

      <Button
        title="Finish"
        onPress={() => {setBestContact();
          navigation.navigate("AllDone");}}/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 15,
  },
  textbox: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 10,
  },
  description: {
    color: 'gray'
  },
  input: {
    backgroundColor: 'white', 
    height: 30, 
    borderColor: 'lightgray',
    borderWidth: 0.5,
    width: '50%',
    paddingRight: 5
  }
});