import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Linking,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { ResourcesStackScreenProps } from "../../types";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import ConstructionSVG from "../../assets/images/construction";
import { AntDesign } from "@expo/vector-icons";
//@ts-ignore
import { MarkdownView } from "react-native-markdown-view";

type URL = {
  title: string;
  url: string;
  id: string;
};

export default function Research({
  navigation,
}: ResourcesStackScreenProps<"Research">) {
  const [description, setDescription] = useState("");
  const [link, setLink] = useState<URL[]>();

  useEffect(() => {
    let ignore = false;
    getDoc(doc(db, "resources/research")).then((doc) => {
      if (!ignore) {
        setDescription(doc?.data()?.markdown);
        setLink(doc?.data()?.url);
      }
    });

    return () => {
      ignore = true;
    };
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
      {description.length > 0 ? (
        <View
          style={{
            height: "100%",
            flexDirection: "column",
            padding: 20,
          }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.contentContainer}>
              <Text
                style={{ fontSize: 24, fontWeight: "bold", paddingBottom: 15 }}
              >
                Research
              </Text>
              <Text style={{ fontSize: 16 }}>General Description:</Text>

              <MarkdownView style={{ fontSize: 16, paddingBottom: 15 }}>
                {description}
              </MarkdownView>
              <Text style={{ fontSize: 16 }}>
                If you are interested in helping aid our research, check out
              </Text>
              <Text
                style={{ fontSize: 16, color: "#304CD1" }}
                onPress={() =>
                  Linking.openURL("https://www.motherhoodbeyond.org/")
                }
              >
                motherhoodbeyond.org
              </Text>
              <Text style={{ fontSize: 16, paddingBottom: 15 }}>
                or click the button below to direct you to our research page.
              </Text>
            </View>
          </ScrollView>
          <View style={styles.footer}>
            {link?.map((url, index) => {
              if (url.title.length > 0 && url.url.length > 0) {
                return (
                  <Pressable
                    onPress={() => {
                      Linking.openURL(url.url);
                    }}
                    style={styles.button}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#304CD1",
                      }}
                    >
                      {url.title}
                    </Text>
                  </Pressable>
                );
              }
            })}
          </View>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            padding: 30,
          }}
        >
          <View>
            <View
              style={{
                position: "relative",
                width: 160,
                height: 160,
                borderRadius: 80,
                backgroundColor: "#E5E5E5",
              }}
            />
            <ConstructionSVG
              style={{
                flex: 1,
                position: "absolute",
                alignSelf: "center",
                margin: 30,
              }}
            />
          </View>
          <View>
            <Text
              style={{
                color: "#666666",
                fontSize: 18,
                fontWeight: "bold",
                textAlign: "center",
                paddingBottom: 10,
                paddingTop: 25,
              }}
            >
              Coming Soon!
            </Text>
            <Text
              style={{ color: "#666666", fontSize: 16, textAlign: "center" }}
            >
              At the time, we haven't added any resources here. Check back soon!
            </Text>
          </View>
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
  button: {
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#304CD1",
    width: "100%",
    height: 45,
    marginTop: 10,
  },
  contentContainer: {
    flex: 1,
  },
  footer: {
    marginBottom: 50,
  },
});
