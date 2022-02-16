import { View } from "../../components/Themed";
import { Button, Text, TextInput } from "react-native";
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
import Checkbox from "expo-checkbox";

export default function ShippingAddress({
  navigation
}: OnboardingStackScreenProps<"ShippingAddress">) {

  const authData = useContext(UserContext);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [save, setSave] = useState(false);

  async function setShippingAddress() {
    const caregiverDoc = doc(db, "caregivers", authData?.uid as string);
    
    updateDoc(caregiverDoc, {
      address: address + city + state + zipCode,
      // what to do with save address?
    })
  }
  
  return (
    <View>
      <Text>Request Items</Text>
      <Text>Let us know where we can deliver your requested supplies!</Text>
      
      <Text>Street Address</Text>
      <TextInput
        placeholder="Street number and name, apt, suite, etc."
        onChangeText={(address) => {
          setAddress(address);
        }}
      />

      <Text>City</Text>
      <TextInput
        onChangeText={(city) => {
          setCity(city);
        }}
      />

      <Text>State</Text>
      <TextInput
        onChangeText={(state) => {
          setState(state);
        }}
      />

      <Text>Zip Code</Text>
      <TextInput
        onChangeText={(zipCode) => {
          setZipCode(zipCode);
        }}
      />

      <Checkbox
        value={save}
        onValueChange={() => {
          setSave(save);
        }}
      />
      <Text>Save address for future deliveries</Text>
      
      <Button
        title="Next"
        onPress={() => {
          navigation.navigate("BestContact");
        }}
      />
    </View>
  );
}