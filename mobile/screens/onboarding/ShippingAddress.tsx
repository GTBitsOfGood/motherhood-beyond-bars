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

export default function ShippingAddress({
  navigation
}: OnboardingStackScreenProps<"ShippingAddress">) {

  const authData = useContext(UserContext);

  async function setShippingAddress() {
    const caregiverDoc = doc(db, "caregivers", authData?.uid as string);
    
    updateDoc(caregiverDoc, {
      // put what to update here
    })
  }
  
  return (
    <View>
      <Text>Shipping Address</Text>
      <Button
        title="Next"
        onPress={() => {
          navigation.navigate("BestContact");
        }}
      />
    </View>
  );
}