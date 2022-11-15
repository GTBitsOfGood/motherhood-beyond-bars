import {
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { Text, View } from "../../components/Themed";
import { OnboardingStackScreenProps, Waiver } from "../../types";
import { db } from "../../config/firebase";
import React, { useContext, useEffect, useState } from "react";
//@ts-ignore
import { MarkdownView } from "react-native-markdown-view";
import { doc, arrayUnion, Timestamp, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { UserContext } from "../../providers/User";
import { getWaivers } from "../../lib/getWaivers";
import Checkbox from "../../components/app/Checkbox";
import { waiverUpdate } from "../settings/AccountInfo";

export var waiverSigned = false;

export default function SignWaiver({
  navigation,
  route,
}: OnboardingStackScreenProps<"SignWaiver">) {
  const authData = useContext(UserContext);
  const [isSelected, setSelection] = useState(false);
  const [signature, setSignature] = useState("");
  const [date, setDate] = useState("");
  const [unsigned, setUnsigned] = useState<Waiver[]>(
    route?.params?.unsignedWaivers || []
  );
  const [waiver, setWaiver] = useState<Waiver | null>(
    route.params?.unsignedWaivers?.[0] || null
  );
  const [prevSignedWaivers, setPrevSignedWaivers] = useState();


  useEffect(() => {
    if (
      route?.params?.unsignedWaivers === undefined ||
      route?.params?.unsignedWaivers === null
    ) {
      // If the waivers do not exist, find them
      async function setWaviers() {
        const allWaivers = await getWaivers();
        setUnsigned(allWaivers);
        setWaiver(allWaivers[0]);
      }
      setWaviers();
    }

    if (waiverUpdate) {
      const caregiverDoc = doc(db, "caregivers", authData?.uid as string);
      getDoc(caregiverDoc).then((doc) => {
        setPrevSignedWaivers(doc?.data()?.signedWaivers);
      })
    }
  }, []);

  async function setSignedWaivers() {
    const caregiverDoc = doc(db, "caregivers", authData?.uid as string);

    waiver &&
      setDoc(
        caregiverDoc,
        {
          signedWaivers: arrayUnion({
            id: waiver.id,
            timestamp: Timestamp.now(),
          }),
        },
        { merge: true }
      );
  }

  async function updateSignedWaivers() {
    const caregiverDoc = doc(db, "caregivers", authData?.uid as string);
    console.log("UPDATE WAIVER")

    waiver && prevSignedWaivers &&
      updateDoc(caregiverDoc, {
        signedWaivers: prevSignedWaivers.map((w: { id: string; }) => w.id === waiver.id ? { ...w, timestamp: Timestamp.now() } : w)
      });

    if (waiver && prevSignedWaivers) {
      setPrevSignedWaivers(map((w: { id: string; }) => w.id === waiver.id ? { ...w, timestamp: Timestamp.now() } : w));
    }
  }


  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.inner}>
            <Text style={styles.title}>Liability Waiver</Text>
            <ScrollView
              style={{
                backgroundColor: "#f5f5f5",
                borderRadius: 10,
                padding: 20,
                maxHeight: "60%",
              }}
            >
              <MarkdownView
                styles={{
                  heading1: {
                    fontSize: 24,
                  },
                }}
              >
                {waiver?.content}
              </MarkdownView>
            </ScrollView>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingTop: 16,
              }}
            >
              <Checkbox
                onPress={() => setSelection(!isSelected)}
                checked={isSelected}
              />
              <Text onPress={() => setSelection(!isSelected)} style={styles.description}>
                I agree to the Liability Waiver
              </Text>
            </View>
            <Text style={styles.description}>Signature</Text>
            <TextInput
              style={styles.input}
              onChangeText={(signature) => setSignature(signature)}
            />
            <Text style={styles.description}>Date</Text>
            <TextInput
              style={styles.input}
              onChangeText={(date) => setDate(date)}
            />
            <View style={{ paddingTop: 36 }}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  if (isSelected && signature.trim() && date.trim()) {
                    // setSignedWaivers();

                    if (waiverUpdate) {
                      updateSignedWaivers();
                    } else {
                      setSignedWaivers();
                    }
                    if (unsigned.length > 0) {
                      const newWaivers = Array.from(unsigned);
                      newWaivers.shift();
                      navigation.push("SignWaiver", {
                        unsignedWaivers: newWaivers,
                      });
                    } else {
                      if (!waiverUpdate) {
                        navigation.navigate("RequestItems");
                      } else {
                        waiverSigned = true;
                        navigation.navigate("BabyBookAccess")
                      }
                    }
                  } else {
                    alert(
                      "You must agree to the liability waiver before continuing."
                    );
                  }
                }}
              >
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  textInput: {
    height: "50%",
    width: "100%",
    borderWidth: 1,
    padding: 5,
    borderColor: "black",
  },
  sign: {
    height: "5%",
    width: "100%",
    borderWidth: 1,
    borderColor: "black",
    paddingLeft: 5,
  },
  textLabel: {
    fontWeight: "bold",
    fontSize: 18,
    paddingBottom: 5,
    paddingTop: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 5,
    paddingBottom: 15,
  },
  textbox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
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
    paddingLeft: 8,
  },
});
