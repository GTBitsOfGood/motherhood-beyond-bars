import { View } from "../../components/Themed";
import { Button, Modal, Text, TextInput, StyleSheet, Dimensions} from "react-native";
import { Item, OnboardingStackScreenProps } from "../../types";
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
  const [size, setSize] = useState(-1);
  const [addReqs, setAddReqs] = useState("");
  const [finished, setFinished] = useState(false);

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
      const itemToWrite: Item = {
        
          name: "Baby Clothing",
          gender: gender,
          size: size,
          fulfilled: false,
          requestedOn: Timestamp.now(),
        
      }
      updateDoc(caregiverDoc, {
        itemsRequested: arrayUnion(itemToWrite)
      })
    }
    if (addReqs) {
      updateDoc(caregiverDoc, {
        itemsRequested: arrayUnion({
          name: "Additional Requests",
          request: addReqs,
          fulfilled: false,
          requestedOn: Timestamp.now(),
        })
      })
    }
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
        keyboardType='numeric'
        onChangeText={(size) => {
          setSize(Number(size));
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
          if (clothing && gender === '') { // gender is not inputted
            alert("Please enter a gender for the baby clothing.") // change this from alert to red message
          } else if (clothing && size === -1) { // size is not inputted
            alert("Please enter a size for the baby clothing.") // change this from alert to red message
          } else {
            setRequestedItems();
            setFinished(true);
          }
        }}
      />

      <Modal
        animated
        animationType="fade"
        visible={finished}
        transparent
        onRequestClose={() => {}}
      >
        <View style={styles.modalView}>
          <Text>Do you have your own carseat?</Text>
          <Text>Please confirm that you have a car seat suitable for the baby. You won't be able to take them home without it!</Text>
          <Button
            title="Yep, I do!"
            onPress={() => {
              navigation.navigate("ShippingAddress");
              setFinished(false);
            }}
          />
          <Button
            title="No, I don't."
            onPress={() => {
              setFinished(false);
              setCarSeat(true);
            }}
          />
        </View>
      </Modal>

    </View>
  );
}

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({

  modalView: {
    backgroundColor: '#FFFFFF',
    height: windowHeight / 3,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: (windowHeight * 2) / 3
  },
});