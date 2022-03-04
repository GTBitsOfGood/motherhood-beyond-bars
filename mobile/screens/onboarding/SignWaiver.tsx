import { StyleSheet, TextInput, Switch, ScrollView } from "react-native";
import { Text, View } from "../../components/Themed";
import { OnboardingStackScreenProps } from "../../types";
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
} from "firebase/firestore";
import { UserContext } from "../../providers/User";

export default function SignWaiver({
  navigation,
  route,
}: OnboardingStackScreenProps<"SignWaiver">) {
  console.log(route);

  const { waiverStack, index } = route.params;
  const waiver = waiverStack[index];

  const authData = useContext(UserContext);
  const [isSelected, setSelection] = useState(false);

  async function setSignedWaivers() {
    const caregiverDoc = doc(db, "caregivers", authData?.uid as string);

    updateDoc(caregiverDoc, {
      signedWaivers: arrayUnion({
        id: waiver.id,
        timestamp: Timestamp.now(),
      }),
    });
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

            if (waiverStack.length > index + 1) {
              navigation.push("SignWaiver", {
                waiverStack,
                index: index + 1,
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

          if (waiverStack.length > index + 1) {
            navigation.push("SignWaiver", {
              waiverStack,
              index: index + 1,
            });
          } else {
            navigation.navigate("RequestItems");
          }
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
