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

export default function RequestItems({
  navigation
}: OnboardingStackScreenProps<"RequestItems">) {

  const authData = useContext(UserContext);

  async function setRequestedItems() {
    const caregiverDoc = doc(db, "caregivers", authData?.uid as string);
    
    updateDoc(caregiverDoc, {
      // put what to update here
    })
  }

  return (
    <View>
      <Text>Request Items</Text>
      <Button
        title="Next"
        onPress={() => {
          navigation.navigate("ShippingAddress");
        }}
      />
    </View>
  );
}