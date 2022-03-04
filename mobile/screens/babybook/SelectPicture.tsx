import React, { useState, useContext } from "react";
import { View } from "../../components/Themed";
import { StyleSheet, Button, Switch, Text, TextInput } from "react-native";
import { OnboardingStackScreenProps } from "../../types";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { doc, updateDoc, arrayUnion, getDoc, Timestamp } from "firebase/firestore";
import { db } from "../../config/firebase";
import { UserContext } from "../../providers/User";
import { BabyContext } from "../../providers/Baby";

type Props = OnboardingStackScreenProps<"SelectPicture">;

export default function SelectPicture({ navigation }: Props) {

  const baby = useContext(BabyContext);
  const caregiver = useContext(UserContext);
  const [caption, setCaption] = useState("");
  const [imageURL, setImageURL] = useState("");

  const storage = getStorage();
//   https://firebase.google.com/docs/storage/web/upload-files
//   var storageRef = ref(storage, 'dummy.png');
//   uploadBytes(storageRef, file).then((snapshot) => { // file from File API
//       console.log("uploaded file?")
//   })

async function addPicture() {
  const babyDoc = doc(db, "babies", baby?.uid as string); 
  // const babyDoc = doc(db, "babies", "4tzVD1aHglb287A9UHgC");

  updateDoc(babyDoc, { // fix this too
      book: arrayUnion({
          imageURL: imageURL,
          caption: caption,
          date: Timestamp.now(),
          caregiverID: caregiver?.uid as string,
      })
  })
}

  return (
    <View style={styles.container}>
          <Text style={styles.title}>Description</Text>
          <TextInput placeholder="How the baby is doing, what s/he did today, etc."
          placeholderTextColor="#666666"></TextInput>
      <Button
        title='Upload'
        onPress={() => {
          addPicture();
          navigation.navigate("BabyBook")
        }}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 30,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      paddingBottom: 15,
      textAlign: 'center'
    }
});