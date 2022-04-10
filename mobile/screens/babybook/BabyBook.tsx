import React, { useContext, useEffect, useState } from "react";
import { View } from "../../components/Themed";
import {
  StyleSheet,
  Button,
  Switch,
  Text,
  TouchableOpacity,
  Image,
  TouchableHighlight,
  ScrollView
} from "react-native";
import { Book, OnboardingStackScreenProps } from "../../types";
import { BookStackScreenProps } from "../../types";
import * as ImagePicker from "expo-image-picker";
import { BabyContext } from "../../providers/Baby";
import { collection, getDocs, limit, orderBy, query, Timestamp } from "firebase/firestore";
import { db } from "../../config/firebase";
import ViewImage from "./ViewImage";
import { lightGreenA700 } from "react-native-paper/lib/typescript/styles/colors";

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

  let picDict = new Map<string, Book[][]>();

  function findTime(d: Timestamp) {
    var timestemp = new Date( d["seconds"]*1000 );
    var m = timestemp.getMonth() + 1
    var y = timestemp.getFullYear()
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return months[m] + " " + y.toString()
  }

  function categorizePics() {
    book.forEach((e) => {
        var date = findTime(e.date);
        var oldVal = picDict.get(date)
        
        if (oldVal != undefined) {
          var end = oldVal[oldVal.length - 1]
          if (end.length == 4){
            let a: Book[] = []
            a.push(e)
            oldVal.push(a)
          } else {
            var last = oldVal.pop()
            last?.push(e)
            oldVal.push(last)
          }
          picDict.set(date, oldVal)
        } else {
          let arr: Book[][] = []
          let a: Book[] = []
          a.push(e)
          arr.push(a)
          picDict.set(date, arr)
        }
    })
  }

  categorizePics()

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 2],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }

    if (image != null) {
      imageFinal = image;
    }

    navigation.navigate("SelectPicture");
  };

  var array = Array.from(picDict, ([v,k]) => ({ v, k }));

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
          <ScrollView>
              {array.map((e) => 
              <View>
                <Text style={{fontWeight: 'bold'}}>{e.v}</Text>
                  {e.k.map((i) =>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between', alignSelf: "flex-start"}}>
                    {i.map((a) => 
                      <TouchableHighlight style={{paddingRight:5}} onPress={() => goToView(a)}>
                        <Image source={{ uri: a.imageURL }} style={styles.image} />
                      </TouchableHighlight>)}
                </View>)}
                <View style={{padding: 10}}></View>
              </View>)}
            </ScrollView>
        </View>
      )
    }
  }

  var timestemp = new Date( babyContext?.dob["seconds"]*1000 );
  var date = timestemp.getDate()
  var month = timestemp.getMonth() + 1
  var year = timestemp.getFullYear()

  return (
    <View style={styles.container}>
        <Text style={styles.title}>{babyContext?.firstName} {babyContext?.lastName}'s Album</Text>
        <Text>Birthday: {month}/{date}/{year}</Text>
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
    padding: 20,
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
  image: {
    width: 83.33,
    height: 150,
  }
});
