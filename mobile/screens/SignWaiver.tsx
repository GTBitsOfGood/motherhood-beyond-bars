import { ScrollView, ScrollViewComponent, StyleSheet, TextInput } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { Button, CheckBox } from "react-native";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { auth, db } from "../config/firebase";
import React, { useEffect, useState } from "react";
import { collection, doc, getDocs, query, setDoc, where, updateDoc, serverTimestamp } from "firebase/firestore"; 
import { Input } from "@mui/material";
import { borderBottom } from "@mui/system";

function nextButton() {
  console.log('Next Page');
}

export default function SignWaiver({
  navigation,
}: RootTabScreenProps<"SignWaiver">) {

  const [waiver, setWaiver] = useState('');
  const [id, setWaiverID] = useState('');
  const [name, setName] = useState('');

  async function setSignedWaivers(name: string) {
    const waivers = collection(db, "caregivers");
    const q = doc(db, 'caregivers', name)

    const updateTimestamp = await updateDoc(q, {
        signedWaivers: [{
          id: id,
          timestamp: serverTimestamp()
        }]
    });
  }

  useEffect(() => {
    const waivers = collection(db, "waivers");
    const q = query(waivers, where("name", "==", "Test Waiver"))
    const waiverDocs = getDocs(q).then((res) => {
      res.forEach(doc => {
        setWaiver(doc.data().content.toString());
      })
    })
  })

  const [isSelected, setSelection] = useState(false);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liability Waiver</Text>
      <TextInput style={styles.textInput} value = {waiver} editable = {false}/>

      <View style={[styles.container, {
        flexDirection: "row"
      }]}>
        <CheckBox value={isSelected}
          onValueChange={setSelection}/>
        <Text style={styles.agree}>I agree to the Liability Waiver</Text>
      </View>
  
      <Text style={styles.textLabel}>Signature</Text>
      <TextInput style={styles.sign} onChangeText={setName}/>
      <Text style={styles.textLabel}>Date</Text>
      <TextInput style={styles.sign}/>
      <Button 
        title={'Next'}
        onPress={() => setSignedWaivers}
        style={[styles.button]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  agree: {
    fontSize: 15, 
    fontWeight: "bold",
    paddingLeft: 15
  },
  container: {
    flex: 1,
    padding: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 15
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  textInput: {
      height: "50%",
      width: "100%",
      borderWidth: 1,
      padding: 5,
      borderColor: 'black',
  },
  sign: {
    height: "5%",
    width: "100%",
    borderWidth: 1,
    borderColor: 'black',
    paddingLeft: 5,
},
  textLabel: {
      fontWeight: "bold",
      fontSize: 18,
      paddingBottom: 5,
      paddingTop: 15
  },
  button: {
    borderColor: 'black',
    borderWidth: 1,
    width: '100%',
    paddingTop: 30
  }
});
