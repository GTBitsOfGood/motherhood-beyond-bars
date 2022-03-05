import React, { useState, useContext } from "react";
import { View } from "../../components/Themed";
import { StyleSheet, Button, Switch, Text, TextInput, Platform, Alert, Animated } from "react-native";
import { BookStackScreenProps } from "../../types";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { doc, updateDoc, arrayUnion, getDoc, Timestamp, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { UserContext } from "../../providers/User";
import { BabyContext } from "../../providers/Baby";
import { firebase } from "@react-native-firebase/storage";
import ImagePicker from 'react-native-image-picker';
import { ProgressBar, Colors } from 'react-native-paper';


type Props = BookStackScreenProps<"SelectPicture">;

export default function SelectPicture({ navigation }: Props) {

  const baby = useContext(BabyContext);
  const caregiver = useContext(UserContext);
  const [caption, setCaption] = useState("");
  const [imageURL, setImageURL] = useState("");
  const options = {
    title: 'Select Image',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  

async function addPicture(this: any) {
  // const babyRef = doc(db, "babies", baby?.uid as string); 
  const babyRef = doc(db, "babies", "4tzVD1aHglb287A9UHgC");
  const bookDoc = doc(babyRef, "book", Timestamp.now().valueOf().trim());
  await setDoc(bookDoc, {
    imageURL: imageURL,
    caption: caption,
    date: Timestamp.now(),
    caregiverID: caregiver?.uid as string,
  })

  /* const {imageName, uploadUri} = this.state;
  firebase
    .storage()
    .ref(imageName)
    .putFile(uploadUri)
    .then((snapshot: any) => {
      //You can check the image is now uploaded in the storage bucket
      console.log(`${imageName} has been successfully uploaded.`);
    })
    .catch((e: any) => console.log('uploading image error => ', e)); */

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
        <Text>
          Uploading...
        </Text>
        <ProgressBar progress={0.5} color={Colors.blue800}></ProgressBar>
        <Text>50%</Text>
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