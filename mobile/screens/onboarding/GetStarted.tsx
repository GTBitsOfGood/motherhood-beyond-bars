import { View } from "../../components/Themed";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { OnboardingStackScreenProps } from "../../types";
import React from "react";
import { useState, useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";

interface contact {
  email: string,
  phone: string
}

export default function GetStarted({
  navigation,
}: OnboardingStackScreenProps<"GetStarted">) {
  const [contact, setContact] = useState<contact>();
  useEffect(() => {
    const docRef = doc(db, "app", "settings");
    getDoc(docRef).then((snapshot) => {
      const data = snapshot.data();
      if (data) {
        setContact(data.contact);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let's get started</Text>
      <Text style={styles.description}>
        Motherhood Beyond Bars is here to provide whole family support for
        mothers, infants, and caregivers like yourself!
      </Text>
      <Text style={styles.description}>
        Before we get started, we'll need to collect some information to best
        meet your needs. If you have any questions, please email us at {"info@motherhoodbeyond.org"}
        <Text style={{ fontWeight: "bold" }}>{contact?.email}</Text> or
        call us at <Text style={{ fontWeight: "bold" }}>{contact?.phone}</Text>.
      </Text>

      <View style={{ paddingTop: 36 }}>
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            navigation.navigate("HouseholdInfo");
          }}
        >
          <Text style={styles.buttonText}>Next</Text>
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
    fontSize: 24,
    fontWeight: "bold",
    paddingBottom: 6,
  },
  description: {
    paddingTop: 12,
    fontSize: 14,
    paddingBottom: 8,
  },
  input: {
    backgroundColor: "#FAFBFC",
    height: 44,
    borderColor: "#D9D9D9",
    borderWidth: 1,
    borderRadius: 4,
    width: "100%",
  },
  button: {
    borderWidth: 1,
    borderColor: "#304CD1",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  buttonText: {
    color: "#304CD1",
    padding: 10,
    fontWeight: "500",
    fontSize: 16,
  },
});
