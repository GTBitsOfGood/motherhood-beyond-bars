import React from "react";
import { View } from "../../components/Themed";
import { Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { ResourcesStackScreenProps } from "../../types";
import { db } from "../../config/firebase";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import ArrowDown from "../../assets/images/arrowDown";
import Construction from "../../assets/images/construction";
import { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";

type FAQ = {
  question: string;
  answer: string;
};

export default function FAQ({ navigation }: ResourcesStackScreenProps<"FAQ">) {
  const [faqs, setFaqs] = useState<FAQ[]>();
  const [expanded, setExpanded] = useState<number>();

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "resources", "faq"), (doc) => {
      setFaqs(doc.data()?.faqs);
    });

    return unsub;
  }, []);

  const setExpandedVal = (index: number) => {
    if (index == expanded) {
      setExpanded(undefined);
    } else {
      setExpanded(index);
    }
  };

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
      <View style={{ padding: 20 }}>
        {faqs && faqs.length != 0 ? (
          <>
            <Text style={styles.FAQText}>FAQ</Text>
            <View style={styles.cardsContainer}>
              {faqs.map((faq: FAQ, index: number) => {
                return (
                  <View style={styles.questionCard}>
                    <TouchableOpacity
                      onPress={() => {
                        setExpandedVal(index);
                      }}
                    >
                      <View style={styles.cardHeading}>
                        <Text style={styles.questionText}>{faq.question}</Text>
                        <ArrowDown
                          style={
                            index === expanded
                              ? styles.upsideDownArrow
                              : styles.arrow
                          }
                        />
                      </View>
                    </TouchableOpacity>
                    {index === expanded && (
                      <Text style={styles.answerText}>{faq.answer}</Text>
                    )}
                  </View>
                );
              })}
            </View>
          </>
        ) : (
          <View style={styles.constructionContainer}>
            <View style={styles.constructionIconConatainer}>
              <Construction />
            </View>
            <Text style={styles.comingSoonText}>Coming Soon!</Text>
            <Text style={styles.checkBackText}>
              At the time, we haven't added any resources here. Check back soon!
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  questionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    padding: 10,
    marginTop: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardHeading: {
    backgroundColor: "#FFF",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  questionText: {
    fontSize: 16,
    width: 300
  },
  FAQText: {
    fontSize: 24,
    fontWeight: "700",
  },
  upsideDownArrow: {
    transform: [{ rotate: "180deg" }],
    marginTop: 5,
  },
  arrow: {
    marginTop: 5,
  },
  answerText: {
    color: "#666666",
    marginTop: 5,
  },
  cardsContainer: {
    marginTop: 10,
    backgroundColor: "#FFFFFF",
  },
  constructionContainer: {
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    flexDirection: "column",
    flex: 1,
  },
  constructionIconConatainer: {
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
  },
  comingSoonText: {
    color: "#666666",
    fontWeight: "700",
    fontSize: 18,
    textAlign: "center",
    padding: 15,
  },
  checkBackText: {
    color: "#666666",
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
  },
});
