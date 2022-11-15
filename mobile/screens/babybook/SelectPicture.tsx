import React, { useState, useContext, useEffect } from "react";
import { View } from "../../components/Themed";
import {
  StyleSheet,
  Button,
  Text,
  TextInput,
  Alert,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { BookStackScreenProps } from "../../types";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, Timestamp, setDoc } from "firebase/firestore";
import { db, storage } from "../../config/firebase";
import { UserContext } from "../../providers/User";
import { BabyContext } from "../../providers/Baby";
import { ProgressBar, Colors } from "react-native-paper";
import { imageFinal } from "../babybook/BabyBook";
import * as ImagePicker from "expo-image-picker";

type Props = BookStackScreenProps<"SelectPicture">;

export default function SelectPicture(this: any, { navigation, route }: Props) {
  const baby = useContext(BabyContext);
  const caregiver = useContext(UserContext);
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [img, setImg] = useState<string | null>(route?.params?.image || null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 2],
      quality: 1,
    });

    if (!result.cancelled) {
      setImg(result.uri);
    }
  };

  async function uploadPicture() {
    if (!img) return;
    const response = await fetch(img);
    const blob = await response.blob();

    const extension = img.split(".").pop();
    const picName = baby!.id + Date.now() + "." + extension;

    const babyRef = doc(db, "babies", baby?.id as string);
    console.log("babyRef");
    console.log("picName", picName);

    setUploading(true);
    setTransferred(0);

    uploadBytes(ref(storage, picName), blob).then(async (snapshot) => {
      getDownloadURL(ref(storage, picName)).then(async (url) => {
        setImg(url);

        // create baby book document
        const bookDoc = doc(babyRef, "book", picName);
        await setDoc(bookDoc, {
          imageURL: url,
          caption: caption,
          date: Timestamp.now(),
          caregiverID: caregiver?.uid as string,
        });
      });

      // alert user finished uploading
      setUploading(false);
      Alert.alert(
        "Image uploaded!",
        "Your image has been uploaded successfully!"
      );
    });
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.inner}>
            <View style={{ paddingLeft: 30, paddingRight: 30 }}>
              {img && (
                <Image
                  source={{ uri: img }}
                  style={{ width: "100%", height: 450 }}
                />
              )}
              <View
                style={{
                  position: "absolute",
                  bottom: "2%",
                  left: "64%",
                  backgroundColor: "transparent",
                }}
              >
                <TouchableOpacity onPress={pickImage} style={styles.replace}>
                  <Text style={styles.replaceText}>Replace Image</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.title}>Add a Description</Text>
            <TextInput
              style={styles.input}
              multiline={true} // adding these two lines prevents auto-scrolling when keyboard appears
              numberOfLines={4} // and this line
              placeholder="How the baby is doing, what s/he did today, etc."
              placeholderTextColor="#666666"
              onChangeText={(caption) => {
                setCaption(caption);
              }}
            ></TextInput>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                uploadPicture();
                navigation.navigate("BabyBook");
              }}
            >
              <Text style={styles.buttonText}>Upload</Text>
            </TouchableOpacity>
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
        </TouchableWithoutFeedback>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  inner: {
    padding: 20,
    flex: 1,
    justifyContent: "flex-end",
  },
  title: {
    paddingTop: 15,
    fontSize: 20,
    fontWeight: "bold",
  },
  thumbnail: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  input: {
    marginTop: 10,
    backgroundColor: "#f5f5f5",
    height: 100,
    borderColor: "lightgray",
    borderWidth: 0.5,
    width: "100%",
    paddingLeft: 5,
    paddingTop: 5,
    textAlignVertical: "top",
    borderRadius: 5,
  },
  replace: {
    width: 125,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    borderRadius: 100,
    overflow: "hidden",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  replaceText: {
    color: "white",
    fontSize: 14,
  },
  button: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#304CD1",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  buttonText: {
    padding: 10,
    fontWeight: "500",
    fontSize: 16,
    color: "#304CD1",
  },
});
