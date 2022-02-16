import { View } from "../../components/Themed";
import { Button, Text } from "react-native";
import { OnboardingStackScreenProps } from "../../types";
import React, { useContext, useEffect, useState } from "react";

import {
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
  Timestamp,
} from "firebase/firestore";
import { UserContext } from "../../providers";
import { db } from "../../config/firebase";
import { Picker } from "@react-native-picker/picker";

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
      <Picker
        selectedValue={contact}
        onValueChange={(contact) => {
          setContact(contact);
        }}
      >
        <Picker.Item label="Phone" value="Phone"/>
        <Picker.Item label="Text" value="Text"/>
        <Picker.Item label="Email" value="Email"/>
      </Picker>

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