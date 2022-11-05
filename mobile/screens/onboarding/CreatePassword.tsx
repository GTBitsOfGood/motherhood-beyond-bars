import { View } from "../../components/Themed";
import {
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { OnboardingStackScreenProps } from "../../types";
import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  PhoneAuthProvider,
  linkWithCredential,
} from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";

export default function CreatePassword({
  navigation,
  route,
}: OnboardingStackScreenProps<"CreatePassword">) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  async function setCaregiverInfo(userCredential: any) {
    const authData = userCredential.user;
    const caregiverDoc = doc(db, "caregivers", authData?.uid as string);
    setDoc(caregiverDoc, {
      firstName: route?.params?.first,
      lastName: route?.params?.last,
      phoneNumber: route?.params?.phone,
      email: route?.params?.email,
    });
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.inner}>
            <Text style={styles.title}>Create a password</Text>
            <Text style={styles.description}>New Password</Text>
            <TextInput
              placeholder="password"
              style={styles.input}
              autoCompleteType="password"
              onChangeText={(password) => {
                setPassword(password);
              }}
              secureTextEntry={true}
            />
            <Text style={styles.description}>Confirm Password</Text>
            <TextInput
              placeholder="password"
              style={styles.input}
              autoCompleteType="password"
              onChangeText={(password) => {
                setConfirm(password);
              }}
              secureTextEntry={true}
            />
            <View style={{ paddingTop: 36 }}>
              <TouchableOpacity
                style={styles.button}
                onPress={async () => {
                  if (password === confirm) {
                    await createUserWithEmailAndPassword(
                      auth,
                      route?.params?.email.trim(),
                      password
                    )
                      .then((userCredential) => {
                        setCaregiverInfo(userCredential);
                        const credential = PhoneAuthProvider.credential(
                          route?.params?.phone,
                          password
                        );
                        linkWithCredential(userCredential.user, credential)
                          .then((res) => {
                            console.log(res);
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      })
                      .catch((error) => {
                        console.log(`account creation error: ${error}`);
                        if (error.code === "auth/invalid-password") {
                          alert("Password must be at least 6 characters.");
                        }
                      });
                  } else {
                    alert("Passwords aren't equal");
                  }
                }}
              >
                <Text style={styles.buttonText}>Get started</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                paddingTop: 200,
              }}
            >
              <Text style={{ fontSize: 14 }}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={{ color: "#304CD1" }}>Log in.</Text>
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
    paddingLeft: 8,
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
