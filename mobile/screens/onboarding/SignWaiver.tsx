import { StyleSheet, TextInput, Switch, ScrollView } from "react-native";
import { Text, View } from "../../components/Themed";
import { OnboardingStackScreenProps, Waiver } from "../../types";
import { Button } from "react-native";
import { auth, db } from "../../config/firebase";
import React, { useContext, useEffect, useState } from "react";
//@ts-ignore
import { MarkdownView } from "react-native-markdown-view";

import {
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
  Timestamp,
  setDoc,
} from "firebase/firestore";
import { UserContext } from "../../providers/User";
import { getWaivers } from "../../lib/getWaivers";

export default function SignWaiver({
  navigation,
  route,
}: OnboardingStackScreenProps<"SignWaiver">) {
  const authData = useContext(UserContext);
  const [isSelected, setSelection] = useState(false);
  const [unsigned, setUnsigned] = useState<Waiver[]>(
    route?.params?.unsignedWaivers || []
  );
  const [waiver, setWaiver] = useState<Waiver | null>(
    route.params?.unsignedWaivers?.[0] || null
  );

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

  return waiver ? (
    <View style={styles.container}>
      {/* <TextInput style={styles.textInput} value={waiver} editable={false} /> */}
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
          {waiver.content}
        </MarkdownView>
      </ScrollView>

      <View
        style={[
          styles.container,
          {
            flexDirection: "row",
          },
        ]}
      >
        {/* <CheckBox value={isSelected} onValueChange={setSelection} /> */}
      </View>

      <Switch
        value={isSelected}
        onChange={() => {
          setSelection(!isSelected);
        }}
      />
      <Text style={styles.agree}>I agree to the Liability Waiver</Text>
      {/* <Text style={styles.textLabel}>Signature</Text>
      <TextInput style={styles.sign} onChangeText={setName} />
      <Text style={styles.textLabel}>Date</Text>
      <TextInput style={styles.sign} /> */}
      <Button
        title={"Next"}
        onPress={() => {
          if (isSelected) {
            console.log("Signed waiver", waiver.id);

            setSignedWaivers();

            if (unsigned.length > 0) {
              const newWaivers = Array.from(unsigned);
              newWaivers.shift();
              navigation.push("SignWaiver", {
                unsignedWaivers: newWaivers,
              });
            } else {
              navigation.navigate("RequestItems");
            }
          } else {
            alert("You must agree to the liability waiver before continuing.");
          }
        }}
        // style={[styles.button]}
      />
    </View>
  ) : (
    <>
      <Text>no waivers</Text>
      <Button
        title={"Next"}
        onPress={() => {
          setSignedWaivers();

          navigation.navigate("RequestItems");
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  agree: {
    fontSize: 15,
    fontWeight: "bold",
    paddingLeft: 15,
  },
  container: {
    flex: 1,
    padding: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 15,
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
  button: {
    borderColor: "black",
    borderWidth: 1,
    width: "100%",
    paddingTop: 30,
  },
});
