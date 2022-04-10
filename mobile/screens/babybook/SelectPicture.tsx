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
  Image,
  TouchableOpacity,
  ImageEditor
} from "react-native";
import { BookStackScreenProps } from "../../types";
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { doc, Timestamp, setDoc } from "firebase/firestore";
import { db, storage } from "../../config/firebase";
import { UserContext } from "../../providers/User";
import { BabyContext } from "../../providers/Baby";
import { ProgressBar, Colors } from "react-native-paper";
import {imageFinal} from '../babybook/BabyBook';
import * as ImagePicker from "expo-image-picker";

type Props = BookStackScreenProps<"SelectPicture">;

export default function SelectPicture(this: any, { navigation }: Props) {
  
  const baby = useContext(BabyContext);
  const caregiver = useContext(UserContext);
  const [caption, setCaption] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [img, setImg] = useState<string | null>(null);

  var display = imageFinal

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

    if (img != null) {
      display = img;
    }
  };
  
  

  async function uploadPicture() {
      const response = await fetch(display);
      const blob = await response.blob();

      console.log(display);
    
      const extension = display.split(".").pop();
      var picName = baby?.id + Date.now() + '.' + extension

      const babyRef = doc(db, "babies", baby?.id as string);
      console.log('babyRef');
      console.log('picName', picName);
      
      

      setUploading(true);
      setTransferred(0);

      uploadBytes(ref(storage, picName), blob).then(async (snapshot) => {
          getDownloadURL(ref(storage, picName)).then(
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
      //   getDownloadURL(ref(storage, baby?.id + "/" + picName)).then(
      //     async (url) => {
      //       setImageURL(url);

      //       // create baby book document
      //       const bookDoc = doc(babyRef, "book", picName);
      //       await setDoc(bookDoc, {
      //         imageURL: url,
      //         caption: caption,
      //         date: Timestamp.now(),
      //         caregiverID: caregiver?.uid as string,
      //       });
      //     }
      // )});
    }
    

  //   const babyRef = doc(db, "babies", baby?.id as string);

  //   // add timestamp to file name
  //   // const extension = file.name.split(".").pop();
  //   // const name = file.name.split(".").slice(0, -1).join(".");
  //   // const picName = name + Date.now() + "." + extension;

  //   const picName = Date.now() + ".img"

  //   setUploading(true);
  //   setTransferred(0);

  //   const storageRef = ref(storage, baby?.id + "/" + picName);
  //   const uploadTask = uploadBytesResumable(storageRef, image as Blob);

  //   uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {
  //       const progress = Math.round(
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //       );
  //       setTransferred(progress);
  //     },
  //     (error) => {
  //       // unsuccessful upload
  //       console.log(error);
  //     },
  //     () => {
  //       // successful upload
  //       getDownloadURL(ref(storage, baby?.id + "/" + picName)).then(
  //         async (url) => {
  //           setImageURL(url);

  //           // create baby book document
  //           const bookDoc = doc(babyRef, "book", picName);
  //           await setDoc(bookDoc, {
  //             imageURL: url,
  //             caption: caption,
  //             date: Timestamp.now(),
  //             caregiverID: caregiver?.uid as string,
  //           });
  //         }
  //       );

  //       // alert user finished uploading
  //       setUploading(false);
  //       Alert.alert(
  //         "Image uploaded!",
  //         "Your image has been uploaded successfully!"
  //       );
  //     }
  //   );
  // }

  return (
    <View style={styles.container}>
      <View style={{height:'80%'}}>
        {display && <Image source={{ uri: display }} style={{ width: 300, height: 450 }} />}
        <View style={{position: 'absolute', bottom: 15, left: 225}}>
          <TouchableOpacity
            onPress={pickImage}
            style={styles.replace}>
            <Text style={styles.buttonText}>Replace Image</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={{fontSize: 20, fontWeight: "bold", paddingBottom: 15}}>Add a Description</Text>
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
          navigation.navigate("BabyBook")
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
  thumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: "contain"
  },
  replace: {
    width: 125,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    borderRadius: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  buttonText: {
    color: "white",
    fontSize: 14,
  },
});
