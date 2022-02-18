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
  const [zipCode, setZipCode] = useState(0);
  const [save, setSave] = useState(false);

  async function setShippingAddress() {
    const caregiverDoc = doc(db, "caregivers", authData?.uid as string);
    
    updateDoc(caregiverDoc, {
      address: address,
      city: city,
      state: state,
      zipCode: zipCode,
      // save address feature is not yet implemented
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
        keyboardType='numeric'
        onChangeText={(zipCode) => {
          setZipCode(Number(zipCode));
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
          if (address === '') { // if address not inputted
            alert("Please enter a street address."); // change this from alert to red message
          } else if (city === '') { // if city not inputted
            alert("Please enter a city."); // change this from alert to red message
          } else if (state === '') { // if state not inputted
            alert("Please enter a state."); // change this from alert to red message
          } else if (zipCode === 0) { // if zipCode not inputted
            alert("Please enter a zipCode."); // change this from alert to red message
          } else {
            setShippingAddress();
            navigation.navigate("BestContact");
          }
        }}
      />
    </View>
  );
}