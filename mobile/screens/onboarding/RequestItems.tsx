import { View } from "../../components/Themed";
import { Button, Text, TextInput } from "react-native";
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
  const [gender, setGender] = useState("");
  const [size, setSize] = useState("");
  const [addReqs, setAddReqs] = useState("");

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
          gender: gender,
          size: size,
          fulfilled: false,
          requestedOn: Timestamp.now(),
        })
      })
    }

    updateDoc(caregiverDoc, {
      itemsRequested: arrayUnion({
        name: "Additional Requests",
        request: addReqs,
        fulfilled: false,
        requestedOn: Timestamp.now(),
      })
    })
  }

  return (
    <View>
      <Text>Request Items</Text>
      <Text>Motherhood Beyond Bars will deliver you supplies, so you're ready for the child!</Text>
      
      <Checkbox
        value={beginBox}
      />
      <Text>Begin Box</Text>
      <Text>Clothing, blankets, bottles, pacifiers, bathing supplies, diapers, wipes, diaper cream, formula, burp cloths, and toys!</Text>
      
      <Checkbox
        value={carSeat}
        onValueChange={() => {
          setCarSeat(!carSeat);
        }}
      />
      <Text>Car Seat</Text>
      <Text>A necessity for transporting the baby</Text>

      <Checkbox
        value={sleep}
        onValueChange={() => {
          setSleep(!sleep);
        }}
      />
      <Text>A Safe Place to Sleep</Text>
      <Text>May include a portable bassinet, crib, pack and play, or play pen</Text>
      
      <Checkbox
        value={clothing}
        onValueChange={() => {
          setClothing(!clothing);
        }}
      />
      <Text>Baby Clothing</Text>
      <Text>Additional baby clothing to what's inside the Begin Box</Text>
      
      {clothing && <Text>Gender</Text>}
      {clothing && <TextInput
        onChangeText={(gender) => {
          setGender(gender);
        }}
      />}
      {clothing && <Text>Clothing Size</Text>}
      {clothing && <TextInput
        onChangeText={(size) => {
          setSize(size);
        }}
      />}

      <Text>List any additional requests or comments.</Text>
      <TextInput
        placeholder="ex. additional items, specific item dimensions"
        onChangeText={(addReqs) => {
          setAddReqs(addReqs);
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