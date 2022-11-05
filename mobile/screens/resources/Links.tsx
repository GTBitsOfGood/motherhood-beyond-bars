import { AntDesign } from "@expo/vector-icons";
import Construction from "../../assets/images/construction";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Linking,
  TouchableOpacity,
} from "react-native";
import { db } from "../../config/firebase";
import { ResourcesStackScreenProps } from "../../types";
import { StopCircleSharp } from "@mui/icons-material";

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

  const [data, setData] = useState([
    {
      title: "",
      description: "",
      url: "",
      imageURL: "",
    },
  ]);
  const [noLinks, setNoLinks] = useState(false);

  useEffect(() => {
    getDoc(doc(db, "resources/links")).then((doc) => {
      setData(doc?.data()?.links);
      if (doc?.data()?.links.length == 0) {
        setNoLinks(true);
      }
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

      {!noLinks && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.inner}>
              <View>
                <Text style={styles.title}>Links</Text>
                {data.map((item) => (
                  <View key={item.title}>
                    <View style={styles.innerContainer}>
                      <View style={styles.text}>
                        {item.title !== "" && item.title !== undefined && (
                          <Text style={styles.subtitle} key={item.title}>
                            {item.title}
                          </Text>
                        )}
                        {item.description !== "" &&
                          item.description !== undefined && (
                            <Text
                              style={styles.description}
                              key={item.description}
                            >
                              {item.description}
                            </Text>
                          )}
                        {item.url !== "" && item.url !== undefined && (
                          <TouchableOpacity onPress={() => openLink(item.url)}>
                            <Text style={styles.link} key={item.url}>
                              {item.url}
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                      {item.imageURL !== "" && item.imageURL !== undefined && (
                        <Image
                          style={styles.image}
                          key={item.imageURL}
                          source={{
                            uri: item.imageURL,
                          }}
                        />
                      )}
                    </View>
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
      )}
      {noLinks && (
        <View style={styles.construction}>
          <Construction />
          <Text style={styles.constructiontitle}>Coming Soon!</Text>
          <Text style={styles.constructionsubtitle}>
            At the time, we haven't added any resources here. Check back soon!
          </Text>
        </View>
      )}
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
  image: {
    width: "25%",
    height: 100,
  },
  construction: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  constructiontitle: {
    fontSize: 18,
    color: "#666666",
    fontWeight: "bold",
    textAlign: "center",
  },
  constructionsubtitle: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
  },
  innerContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  text: {
    width: "75%",
  },
});
