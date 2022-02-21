import { View } from "../../components/Themed";
import { Button, Text, TextInput, StyleSheet } from "react-native";
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
    <View style={styles.container}>
      <Text style={styles.title}>Shipping Address</Text>
      <Text style={{paddingBottom: 10}}>Let us know where we can deliver your requested supplies!</Text>

      <Text style={styles.text}>Street Address</Text>
      <TextInput style={styles.input} placeholder="Street number and name, apt, suite, etc."
         onChangeText={(address) => {setAddress(address);}}></TextInput>

      <Text style={styles.text}>City</Text>
      <TextInput style={styles.input} onChangeText={(city) => {setCity(city);}}></TextInput>

      <Text style={styles.text}>State</Text>
      <TextInput style={styles.input} onChangeText={(state) => {setState(state);}}></TextInput>

      <Text style={styles.text}>Zip Code</Text>
      <TextInput style={styles.input} keyboardType='numeric' onChangeText={(zipCode) => {setZipCode(Number(zipCode));}}></TextInput>

      <View style={{padding:10}}></View>

      <View style={{flexDirection: 'row'}}>
        <Checkbox value={save} onValueChange={() => {setSave(save);}}></Checkbox><Text style={{paddingLeft: 5}}>Save address for future deliveries</Text>
      </View>

      <View style={{padding:10}}></View>

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
  text: {
    paddingTop: 10,
    paddingBottom: 10
  },
  input: {
    backgroundColor: "#f5f5f5", 
    height: 40, 
    borderColor: 'lightgray',
    borderWidth: 0.5,
    width: '100%',
    paddingLeft: 5,
    borderRadius: 5
  }
});