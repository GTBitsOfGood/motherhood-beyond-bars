import React, { useContext, useEffect, useState } from "react";
import { View } from "../../components/Themed";
import {
  StyleSheet,
  Button,
  Switch,
  Text,
  TouchableOpacity,
  Image,
  TouchableHighlight
} from "react-native";
import { Book, OnboardingStackScreenProps } from "../../types";
import * as ImagePicker from "expo-image-picker";
import { BabyContext } from "../../providers/Baby";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../../config/firebase";
import ViewImage from "./ViewImage";

type Props = OnboardingStackScreenProps<"BabyBook">;

export var imageFinal: string;
export var view: Book;

export default function BabyBook({ navigation }: Props) {

  const [image, setImage] = useState<string | null>(null);
  const [book, setBook] = useState<Book[]>([]);

  const babyContext = useContext(BabyContext);
  useEffect(() => {
    async function fetchBook() {
      if (babyContext != null) {
        const queryRef = query(
          collection(db, "babies", babyContext.id, "book"),
          orderBy("date", 'desc'),
          limit(10)
        );
        const bookDocs = await getDocs(queryRef);
        setBook(
          bookDocs.docs.map((doc) => ({ ...doc.data(), id: doc.id } as unknown as Book))
        );
      }
    }
    fetchBook();
  }, []);

  function goToView(i: Book) {
    view = i
    navigation.navigate("ViewImage")
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 2],
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

  function body() {
    if (book.length == 0) {
      return (
        <View>
          <View style={{ padding: "30%" }}></View>
          <View style={{ padding: 15 }}>
            <Text style={styles.center}>No Photos Yet</Text>
            <Text style={{ textAlign: "center" }}>
              Get started by tapping this button to add a photo of {babyContext?.name}!
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

  console.log(babyContext?.name)


  return (
    <View style={styles.container}>
      <View style={styles.textbox}>
        <Text style={styles.title}>{babyContext?.name}'s Album</Text>
        <Text>Birthday</Text><Text>{babyContext?.birthday}</Text>
      </View>
      {body()}
      
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
    fontSize: 45,
  },
  image: {
    width: 83.33,
    height: 150,
  }
});
