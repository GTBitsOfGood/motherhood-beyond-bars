import { View } from "../../components/Themed";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { OnboardingStackScreenProps } from "../../types";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../providers/User";
import { getWaivers } from "../../lib/getWaivers";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

export default function HouseholdInfo({
  navigation,
}: OnboardingStackScreenProps<"HouseholdInfo">) {
  const authData = useContext(UserContext);
  const [adults, setAdults] = useState("");
  const [children, setChildren] = useState("");
  const [ages, setAges] = useState("");
  const [completed, setCompleted] = useState(false);

  async function setHousehold() {
    const caregiverDoc = doc(db, "caregivers", authData?.uid as string);

    setDoc(
      caregiverDoc,
      {
        numAdults: adults,
        numChildren: children,
        agesOfChildren: ages,
      },
      { merge: true }
    );
  }

  useEffect(() => {
    if (adults !== "" && children !== "" && ages !== "") {
      setCompleted(true);
    } else {
      setCompleted(false);
    }
  });

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.title}>Household Information</Text>
        <Text style={styles.description}>Number of Adults</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={(adults) => {
            setAdults(adults);
          }}
        />
        <Text style={styles.description}>Number of Children (current)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={(children) => {
            setChildren(children);
          }}
        />
        <Text style={styles.description}>Ages of Children</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={(ages) => {
            setAges(ages);
          }}
          placeholder="ex. 3, 8, 11"
        />
        <View style={{ paddingTop: 36 }}>
          {!completed && (
            <TouchableOpacity
              style={[styles.button, { borderColor: "#BFBFBF" }]}
            >
              <Text style={[styles.buttonText, { color: "#BFBFBF" }]}>
                Next
              </Text>
            </TouchableOpacity>
          )}
          {completed && (
            <TouchableOpacity
              style={styles.button}
              onPress={async () => {
                setHousehold();
                navigation.push("SignWaiver", {
                  unsignedWaivers: await getWaivers(),
                });
              }}
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
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
    paddingLeft: 5,
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
