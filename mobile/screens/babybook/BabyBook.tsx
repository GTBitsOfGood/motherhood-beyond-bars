import React, { useContext, useEffect, useState } from "react";
import { View } from "../../components/Themed";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import {
  Book,
  BookStackScreenProps,
  OnboardingStackScreenProps,
} from "../../types";

import * as ImagePicker from "expo-image-picker";
import { BabyContext } from "../../providers/Baby";
import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { useBabyBook } from "../../providers/BabyBook";

type Props = BookStackScreenProps<"BabyBook">;

export var imageFinal: string;
export var view: Book;

export default function BabyBook({ navigation }: Props) {
  const babyContext = useContext(BabyContext);
  const babyBook = useBabyBook();

  function goToView(i: Book) {
    view = i;
    navigation.navigate("ViewImage");
  }

  let picDict = new Map<string, Book[][]>();

  function findTime(d: Timestamp) {
    const timestamp = new Date(d["seconds"] * 1000);
    const month = timestamp.getMonth() + 1;
    const year = timestamp.getFullYear();
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return months[month] + " " + year.toString();
  }

  function categorizePics() {
    babyBook.forEach((e) => {
      const date = findTime(e.date);
      const oldVal = picDict.get(date);

      if (oldVal != undefined) {
        const end = oldVal[oldVal.length - 1];
        if (end.length == 4) {
          let a: Book[] = [];
          a.push(e);
          oldVal.push(a);
        } else {
          var last = oldVal.pop();
          last?.push(e);
          last && oldVal.push(last);
        }
        picDict.set(date, oldVal);
      } else {
        let arr: Book[][] = [];
        let a: Book[] = [];
        a.push(e);
        arr.push(a);
        picDict.set(date, arr);
      }
    });
  }

  categorizePics();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 2],
      quality: 1,
    });

    if (!result.cancelled) {
      navigation.navigate("SelectPicture", {
        image: result.uri,
      });
    }
  };

  const picsByMonth = Array.from(picDict, ([month, picsInMonth]) => ({
    month,
    picsInMonth,
  }));

  const Body =
    babyBook.length == 0 ? (
      <View>
        <View style={{ padding: "30%" }}></View>
        <View style={{ padding: 15 }}>
          <Text style={styles.center}>No Photos Yet</Text>
          <Text style={{ textAlign: "center" }}>
            Get started by tapping this button to add a photo of{" "}
            {babyContext?.firstName}!
          </Text>
        </View>
      </View>
    ) : (
      <View>
        <View style={{ paddingTop: 25 }}></View>
        <ScrollView>
          {picsByMonth.map((month, i) => (
            <View key={month.month}>
              <Text style={{ fontWeight: "bold" }}>{month.month}</Text>
              {month.picsInMonth.map((picInMonth) => (
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignSelf: "flex-start",
                    }}
                  >
                    {picInMonth.map((a) => (
                      <TouchableHighlight
                        style={{ paddingRight: 5 }}
                        onPress={() => goToView(a)}
                      >
                        <Image
                          source={{ uri: a.imageURL }}
                          style={styles.image}
                        />
                      </TouchableHighlight>
                    ))}
                  </View>
                  <View style={{ padding: 2.5 }}></View>
                </View>
              ))}
              <View style={{ padding: 10 }}></View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  const timestamp = babyContext?.dob && new Date(babyContext.dob);
  const date = timestamp && timestamp.getDate();
  const month = timestamp && timestamp.getMonth() + 1;
  const year = timestamp && timestamp.getFullYear();


  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {babyContext?.firstName} {babyContext?.lastName}'s Album
      </Text>
      {month && date && year && (
        <Text>
          Birthday: {month}/{date}/{year}
        </Text>
      )}
      {Body}
      <View style={{ position: "absolute", bottom: 15, left: 300 }}>
        <TouchableOpacity onPress={pickImage} style={styles.roundButton1}>
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
    bottom: 13,
  },
  image: {
    width: 83.33,
    height: 150,
  },
});
