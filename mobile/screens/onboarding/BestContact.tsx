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

export default function BestContact({
  navigation
}: OnboardingStackScreenProps<"BestContact">) {

  const authData = useContext(UserContext);

  async function setBestContact() {
    const caregiverDoc = doc(db, "caregivers", authData?.uid as string);
    
    updateDoc(caregiverDoc, {
      // put what to update here
    })
  }

  return (
    <View>
      <Text>Best Method of Contact</Text>
      <Button
        title="Finish"
        onPress={() => {
          alert("You've finished this donation request!")
        }}
      />
    </View>
  );
}