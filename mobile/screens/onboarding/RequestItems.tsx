import { View } from "../../components/Themed";
import { Button, Text, TextInput, StyleSheet, Modal, ScrollView, Keyboard, TouchableWithoutFeedback } from "react-native";
import { Item, OnboardingStackScreenProps } from "../../types";
import React, { useContext, useEffect, useState } from "react";
import Checkbox from 'expo-checkbox';
//@ts-ignore
import { MarkdownView } from "react-native-markdown-view";

import {
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
  Timestamp,
} from "firebase/firestore";
import { UserContext } from "../../providers/User";
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

  async function setRequestedItems() {
    const caregiverDoc = doc(db, "caregivers", authData?.uid as string);

    const newDoc = {
      
    }
    
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

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView>
        <Text style={styles.title}>Request Items</Text>
        <Text style={{paddingBottom: 10}}>Motherhood Beyond Bars will deliver you supplies, so you're ready for the child!</Text>

        <View style={styles.textbox}>
          <View style={{flexDirection: 'row', backgroundColor: "#f5f5f5"}}>
            <Checkbox value={beginBox} disabled={true}></Checkbox><Text style={{paddingLeft: 5, fontWeight: 'bold', color: 'gray'}}>Begin Box</Text>
          </View>
          <Text style={{paddingTop: 5, paddingLeft: 20, color: 'gray'}}>Clothing, blankets, bottles, pacifiers, bathing supplies, diapers, wipes, diaper cream, formula, burp cloths, and toys!</Text>
        </View>

        <View style={{padding:5}}></View>

        <View style={styles.textbox}>
          <View style={{flexDirection: 'row', backgroundColor: "#f5f5f5"}}>
            <Checkbox value={carSeat} onValueChange={() => {setCarSeat(!carSeat);}}></Checkbox><Text style={{paddingLeft: 5, fontWeight: 'bold'}}>Car Seat</Text>
          </View>
          <Text style={{paddingTop: 5, paddingLeft: 20, color: 'gray'}}>A necessity for transporting the baby</Text>
        </View>

        <View style={{padding:5}}></View>

        <View style={styles.textbox}>
          <View style={{flexDirection: 'row', backgroundColor: "#f5f5f5"}}>
            <Checkbox value={sleep} onValueChange={() => {setSleep(!sleep);}}></Checkbox><Text style={{paddingLeft: 5, fontWeight: 'bold'}}>A Safe Place to Sleep</Text>
          </View>
          <Text style={{paddingTop: 5, paddingLeft: 20, color: 'gray'}}>May include a portable bassinet, crib, pack and play, or play pen</Text>
        </View>

        <View style={{padding:5}}></View>

        <View style={styles.textbox}>
          <View style={{flexDirection: 'row', backgroundColor: "#f5f5f5"}}>
            <Checkbox value={clothing} onValueChange={() => {setClothing(!clothing);}}></Checkbox><Text style={{paddingLeft: 5, fontWeight: 'bold'}}>Baby Clothing</Text>
          </View>
          <Text style={{paddingTop: 5, paddingLeft: 20, color: 'gray'}}>Additional baby clothing to what's inside the Begin Box</Text>
          <View style={{flexDirection: 'row', backgroundColor: "#f5f5f5", paddingLeft: 20, paddingTop: 10}}>
            {clothing && <Text style={{width: '50%'}}>Gender</Text>}{clothing && <Text style={{width: '50%'}}>Clothing Size</Text>}
          </View>
          <View style={{flexDirection: 'row', backgroundColor: "#f5f5f5", paddingLeft: 20}}>
          {clothing && <TextInput style= {styles.input} onChangeText={(gender) => {setGender(gender);}}/>}{clothing && <TextInput style= {styles.input}
            keyboardType='numeric'
            onChangeText={(size) => {
              setSize(Number(size));
            }}
          />}
          </View>
        </View>

        <Text style= {{paddingTop: 15}}>Additional requests or comments</Text>
        <TextInput
          style= {{height: 150, backgroundColor: "#f5f5f5", borderColor: "lightgray", borderWidth: 0.5, textAlign: 'left', textAlignVertical: 'top', padding: 5}}
          placeholder="Specific item dimensions, shipping directions, etc."
          onChangeText={(addReqs) => {
            setAddReqs(addReqs);
          }}
        />

        <View style={{padding:10}}></View>

        <Button
          title="Next"
          onPress={() => {
            if (clothing && gender === '') { // gender is not inputted
              alert("Please enter a gender for the baby clothing.") // change this from alert to red message
            } else if (clothing && size === -1) { // size is not inputted
              alert("Please enter a size for the baby clothing.") // change this from alert to red message
            } else {
              setModalVisible(true);
              // navigation.navigate("ShippingAddress");
            }
          }}
        />
        <Text style={{textAlign: 'center'}}>Expect a call from us to confirm the order details!</Text>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
            <View style={{padding: 20, height: '30%', marginTop: 'auto', justifyContent: 'space-around', borderRadius: 5}}>
              <Text style={{fontWeight: "bold", paddingBottom: 15}}>Do you have your own car seat?</Text>
              <Text style={{paddingBottom: 20}}>Please confirm that you have a car seat suitable for the baby. You won’t be able to take them home without it!</Text>
              <View style={{flexDirection: 'row'}}>
                <View style={{width: "50%"}}><Button title="Yep, I do!"
                  onPress={() => {
                    setRequestedItems()
                    setModalVisible(!modalVisible)
                    navigation.navigate("ShippingAddress");
                  }}/></View><View style={{width:10}}></View><View style={{width: "50%"}}><Button title="No, I don't!"
                  onPress={() => {
                    setCarSeat(true)
                    setRequestedItems()
                    setModalVisible(!modalVisible)
                    navigation.navigate("ShippingAddress");
                  }}/></View>
              </View>
            </View>
        </Modal>
      </ScrollView>
      </TouchableWithoutFeedback>
    </View>
)}

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
  description: {
    color: 'gray'
  },
  input: {
    backgroundColor: 'white', 
    height: 30, 
    borderColor: 'lightgray',
    borderWidth: 0.5,
    width: '50%',
    paddingRight: 5
  }
});