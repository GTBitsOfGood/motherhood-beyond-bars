import React, { useState } from "react";
import { View } from "../../components/Themed";
import {
  StyleSheet,
  Button,
  Switch,
  Text,
  TouchableOpacity,
} from "react-native";
import { OnboardingStackScreenProps } from "../../types";
import * as ImagePicker from "expo-image-picker";

type Props = OnboardingStackScreenProps<"BabyBook">;

export var imageFinal: string;

export default function BabyBook({ navigation }: Props) {
  // let openImagePickerAsync = async () => {
  //   let permissionResult =
  //     await ImagePicker.requestMediaLibraryPermissionsAsync();

  //   if (permissionResult.granted === false) {
  //     alert("Permission to access camera roll is required!");
  //     return;
  //   }

  //   let pickerResult = await ImagePicker.launchImageLibraryAsync();

  //   navigation.navigate("SelectPicture");
  // };

  const [image, setImage] = useState<string | null>(null);;

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);

    }

    if (image != null) {
      imageFinal = image;
    }
  
    navigation.navigate("SelectPicture");
  };

<<<<<<< Updated upstream
=======
  function body() {
    if (book.length == 0) {
      return (
        <View>
          <View style={{ padding: "30%" }}></View>
          <View style={{ padding: 15 }}>
            <Text style={styles.center}>No Photos Yet</Text>
            <Text style={{ textAlign: "center" }}>
              Get started by tapping this button to add a photo of {babyContext?.firstName}!
            </Text>
          </View>
        </View>
      )
    } else {
      return (
        <View>
          <View style={{paddingTop:25}}></View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', width: (book.length * 83.33) + ((book.length - 1)*5), alignSelf: "flex-start"}}>
            {book.map((i) => <TouchableHighlight onPress={() => goToView(i)}>
            <Image source={{ uri: i.imageURL }} style={styles.image} />
              </TouchableHighlight>)}
          </View>
        </View>
      )
    }
  }

  var timestemp = new Date( babyContext?.dob["seconds"]*1000 );
  var date = timestemp.getDate()
  var month = timestemp.getMonth() + 1
  var year = timestemp.getFullYear()
  

>>>>>>> Stashed changes


  return (
    <View style={styles.container}>
<<<<<<< Updated upstream
      <View style={styles.textbox}>
        <Text style={styles.title}>Jordan Jacobs</Text>
        <Text>Birthday 00/00/0000</Text>
      </View>
      <View style={{ padding: "30%" }}></View>
      <View style={{ padding: 15 }}>
        <Text style={styles.center}>No Photos Yet</Text>
        <Text style={{ textAlign: "center" }}>
          Get started by tapping this button to add a photo of Jordan!
        </Text>
      </View>
=======
        <Text style={styles.title}>{babyContext?.firstName} {babyContext?.lastName}'s Album</Text>
        <Text>Birthday: {month}/{date}/{year}</Text>
      {body()}
      
>>>>>>> Stashed changes
      <View style={{position: 'absolute', bottom: 15, left: 300}}>
        <TouchableOpacity
          onPress={pickImage}
          style={styles.roundButton1}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
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
  },
  center: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 15,
    textAlign: "center",
  },
  textbox: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  roundButton1: {
    width: 75,
    height: 75,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
    backgroundColor: "#304CD1",
  },
  buttonText: {
    color: "white",
    fontSize: 65,
    bottom: 13
  },
  thumbnail: {
    width: 100,
    height: 150,
    resizeMode: "contain",
  },
});
