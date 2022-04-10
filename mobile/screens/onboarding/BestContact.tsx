import { View } from "../../components/Themed";
import { Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { OnboardingStackScreenProps } from "../../types";
import React, { useContext, useState } from "react";
import { RadioButton } from "react-native-paper";

import { doc, updateDoc } from "firebase/firestore";
import { UserContext } from "../../providers/User";
import { db } from "../../config/firebase";

export default function BestContact({
  navigation,
}: OnboardingStackScreenProps<"BestContact">) {
  const authData = useContext(UserContext);
  const [contact, setContact] = useState("");

  async function setBestContact() {
    const caregiverDoc = doc(db, "caregivers", authData?.uid as string);

    updateDoc(caregiverDoc, {
      contact: contact,
    });
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.inner}>
          <Text style={styles.title}>What's The Best Way To Contact You?</Text>

          <RadioButton.Group
            onValueChange={(contact) => setContact(contact)}
            value={contact}
          >
            <RadioButton.Item
              position="leading"
              value="Phone"
              label="Phone"
              color="#304CD1"
              mode="android"
              labelStyle={{
                textAlign: "left",
              }}
            />
            <RadioButton.Item
              position="leading"
              label="Email"
              value="Email"
              color="#304CD1"
              mode="android"
              labelStyle={{
                textAlign: "left",
              }}
            />
            <RadioButton.Item
              position="leading"
              label="Text"
              value="Text"
              color="#304CD1"
              mode="android"
              labelStyle={{
                textAlign: "left",
              }}
            />
          </RadioButton.Group>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              paddingTop: 24,
            }}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setBestContact();
                navigation.navigate("AllDone");
              }}
            >
              <Text style={styles.buttonText}>Finish</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  button: {
    borderWidth: 1,
    borderColor: "#304CD1",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 15,
  },
  textbox: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 10,
  },
  description: {
    color: "gray",
  },
  input: {
    backgroundColor: "white",
    height: 30,
    borderColor: "lightgray",
    borderWidth: 0.5,
    width: "50%",
    paddingRight: 5,
  },
  buttonText: {
    color: "#304CD1",
    padding: 10,
    fontWeight: "500",
    fontSize: 16,
  },
});
