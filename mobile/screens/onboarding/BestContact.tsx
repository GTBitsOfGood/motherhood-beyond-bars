import { View } from "../../components/Themed";
import { Button, Text } from "react-native";
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
    <View>
      <Text>What's the best way to contact you?</Text>
      <RadioButton.Group onValueChange={contact => setContact(contact)} value={contact}>
        <RadioButton.Item label="Phone" value="Phone"/>
        <RadioButton.Item label="Email" value="Email"/>
        <RadioButton.Item label="Text" value="Text"/>
      </RadioButton.Group>

      <Button
        title="Finish"
        onPress={() => {
          
          setBestContact();

          navigation.navigate("AllDone");
        }}
      />
    </View>
  );
}