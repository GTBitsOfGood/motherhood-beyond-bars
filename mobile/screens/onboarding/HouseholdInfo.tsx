import { View } from "../../components/Themed";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { OnboardingStackScreenProps } from "../../types";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../providers/User";
import { getWaivers } from "../../lib/getWaivers";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

export default function HouseholdInfo({
  navigation,
}: OnboardingStackScreenProps<"HouseholdInfo">) {
  const authData = useContext(UserContext);
  const [adults, setAdults] = useState("");
  const [children, setChildren] = useState("");
  const [completed, setCompleted] = useState(false);

  async function setHousehold() {
    const caregiverDoc = doc(db, "caregivers", authData?.uid as string);

    setDoc(
      caregiverDoc,
      {
        numAdults: adults,
        numChildren: children,
      },
      { merge: true }
    );
  }

  useEffect(() => {
    if (adults !== "" && children !== "") {
      setCompleted(true);
    } else {
      setCompleted(false);
    }
  });

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.inner}>
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
                    // reset signed waivers to empty array if user navigates back to this screen
                    // prevents same waiver from being added to database twice
                    const caregiverDoc = doc(
                      db,
                      "caregivers",
                      authData?.uid as string
                    );
                    setDoc(
                      caregiverDoc,
                      { signedWaivers: [] },
                      { merge: true }
                    );
                  }}
                >
                  <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
              )}
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
