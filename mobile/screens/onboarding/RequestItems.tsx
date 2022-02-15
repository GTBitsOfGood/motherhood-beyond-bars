import { View } from "../../components/Themed";
import { Button, Switch, Text } from "react-native";
import { OnboardingStackScreenProps } from "../../types";
import React, { useContext, useEffect, useState } from "react";
import Checkbox from 'expo-checkbox';

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
  const [beginBox, setBeginBox] = useState(true);
  const [carSeat, setCarSeat] = useState(false);
  const [sleep, setSleep] = useState(false);
  const [clothing, setClothing] = useState(false);

  async function setRequestedItems() {
    const caregiverDoc = doc(db, "caregivers", authData?.uid as string);
    
    updateDoc(caregiverDoc, {
      itemsRequested: arrayUnion({
        name: "Begin Box",
        fulfilled: false,
        requestedOn: Timestamp.now(),
      })
    })

    if (carSeat) {
      updateDoc(caregiverDoc, {
        itemsRequested: arrayUnion({
          name: "Car Seat",
          fulfilled: false,
          requestedOn: Timestamp.now(),
        })
      })
    }
    if (sleep) {
      updateDoc(caregiverDoc, {
        itemsRequested: arrayUnion({
          name: "Safe Place to Sleep",
          fulfilled: false,
          requestedOn: Timestamp.now(),
        })
      })
    }

    if (clothing) {
      updateDoc(caregiverDoc, {
        itemsRequested: arrayUnion({
          name: "Baby Clothing",
          // get gender and size too
          fulfilled: false,
          requestedOn: Timestamp.now(),
        })
      })
    }

    // add additional requests and comments
  }

  return (
    <View>
      <Text>Request Items</Text>
      <Checkbox
        value={beginBox}
      />
      <Checkbox
        value={carSeat}
        onValueChange={() => {
          setCarSeat(!carSeat);
        }}
      />
      <Checkbox
        value={sleep}
        onValueChange={() => {
          setSleep(!sleep);
        }}
      />
      <Checkbox
        value={clothing}
        onValueChange={() => {
          setClothing(!clothing);
        }}
      />
      <Button
        title="Next"
        onPress={() => {

          setRequestedItems();
          
          navigation.navigate("ShippingAddress");
        }}
      />
    </View>
  );
}