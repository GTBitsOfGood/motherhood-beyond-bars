import { AntDesign } from "@expo/vector-icons";
import { stringLength } from "@firebase/util";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Linking,
  TouchableOpacity,
} from "react-native";
import { db } from "../../config/firebase";
import { ResourcesStackScreenProps } from "../../types";

export default function Links({
  navigation,
}: ResourcesStackScreenProps<"Links">) {
  // const metascraper = require("metascraper")([
  //   require("metascraper-description")(),
  //   require("metascraper-image")(),
  //   require("metascraper-title")(),
  //   require("metascraper-url")(),
  // ]);

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  // const data = [
  //   {
  //     description:
  //       "We're a young and inspired team that leverages technical knowledge to turn ideas into creative and efficient digital solutions.",
  //     title: "OSEDEA | Digital Efficiency & Creativity",
  //     url: "http://osedea.com",
  //   },
  //   {
  //     description:
  //       "We're a young and inspired team that leverages technical knowledge to turn ideas into creative and efficient digital solutions.",
  //     title: "OSEDEA | Digital Efficiency & Creativity",
  //     url: "http://osedea.com",
  //   },
  // ];

  const [data, setData] = useState([{ title: "", description: "", url: "" }]);

  useEffect(() => {
    getDoc(doc(db, "resources/links")).then((doc) => {
      setData(doc?.data()?.links);
    });
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ paddingLeft: 10, paddingTop: 10 }}
        onPress={() => {
          navigation.navigate("General");
        }}
      >
        <AntDesign name="left" size={30} color="black" />
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.inner}>
            <View>
              <Text style={styles.title}>Links</Text>
              {data.map((item) => (
                <View>
                  {item.title !== "" && (
                    <Text style={styles.subtitle} key={item.title}>
                      {item.title}
                    </Text>
                  )}
                  {item.description !== "" && (
                    <Text style={styles.description} key={item.description}>
                      {item.description}
                    </Text>
                  )}
                  {item.url !== "" && (
                    <TouchableOpacity onPress={() => openLink(item.url)}>
                      <Text style={styles.link} key={item.url}>
                        {item.url}
                      </Text>
                    </TouchableOpacity>
                  )}
                  <View
                    style={{
                      borderBottomColor: "black",
                      borderBottomWidth: StyleSheet.hairlineWidth,
                      marginBottom: 18,
                    }}
                  />
                </View>
              ))}
            </View>
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
    fontSize: 24,
    fontWeight: "bold",
    paddingBottom: 24,
  },
  subtitle: {
    fontSize: 16,
    paddingBottom: 6,
  },
  description: {
    fontSize: 16,
    color: "#666666",
    paddingBottom: 6,
  },
  link: {
    fontSize: 16,
    color: "#304CD1",
    paddingBottom: 18,
    fontWeight: "bold",
  },
});
