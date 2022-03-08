import React, { useState, useContext, useEffect } from "react";
import { View } from "../../components/Themed";
import {
  StyleSheet,
  Button,
  Switch,
  Text,
  TextInput,
  Platform,
  Alert,
  Animated,
} from "react-native";
import { BookStackScreenProps } from "../../types";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, Timestamp, setDoc } from "firebase/firestore";
import { db, storage } from "../../config/firebase";
import { UserContext } from "../../providers/User";
import { BabyContext } from "../../providers/Baby";
import { ProgressBar, Colors } from "react-native-paper";

type Props = BookStackScreenProps<"SelectPicture">;

export default function SelectPicture({ navigation }: Props) {
  const baby = useContext(BabyContext);
  const caregiver = useContext(UserContext);
  const [caption, setCaption] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  async function uploadPicture() {
    const file = new File(["test"], "file.txt", { type: "text/plain" }); // change this to image

    const babyRef = doc(db, "babies", baby?.id as string);

    // add timestamp to file name
    const extension = file.name.split(".").pop();
    const name = file.name.split(".").slice(0, -1).join(".");
    const picName = name + Date.now() + "." + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = ref(storage, baby?.id + "/" + picName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setTransferred(progress);
      },
      (error) => {
        // unsuccessful upload
        console.log(error);
      },
      () => {
        // successful upload
        getDownloadURL(ref(storage, baby?.id + "/" + picName)).then(
          async (url) => {
            setImageURL(url);

            // create baby book document
            const bookDoc = doc(babyRef, "book", picName);
            await setDoc(bookDoc, {
              imageURL: url,
              caption: caption,
              date: Timestamp.now(),
              caregiverID: caregiver?.uid as string,
            });
          }
        );

        // alert user finished uploading
        setUploading(false);
        Alert.alert(
          "Image uploaded!",
          "Your image has been uploaded successfully!"
        );
      }
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Description</Text>
      <TextInput
        placeholder="How the baby is doing, what s/he did today, etc."
        placeholderTextColor="#666666"
        onChangeText={(caption) => {
          setCaption(caption);
        }}
      ></TextInput>
      <Button
        title="Upload"
        onPress={() => {
          uploadPicture();
          // navigation.navigate("BabyBook")
        }}
      ></Button>
      {uploading && <Text>Uploading...</Text>}
      {uploading ? (
        <ProgressBar
          progress={transferred}
          color={Colors.blue800}
        ></ProgressBar>
      ) : (
        <View></View>
      )}
      {uploading && <Text>{transferred}%</Text>}
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
    textAlign: "center",
  },
});
