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
import { sendPasswordResetEmail } from "firebase/auth";
import { isValidEmail, isValidPhoneNumber } from "./CreateAccount";
import { auth, db } from "../../config/firebase";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";

export default function RecoverPassword({
  navigation,
}: OnboardingStackScreenProps<"RecoverPassword">) {
  const [input, setInput] = useState("");
  const [reset, setReset] = useState(false);
  const [type, setType] = useState("");

  const sendEmail = (email: string) => {
    console.log("reset email sent to " + email);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setReset(true);
      })
      .catch(function (e) {
        console.log(e);
      });
  };

  const resetPassword = (input: string) => {
    setType("email");
    sendEmail(input);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.inner}>
            <Text style={styles.title}>Recover Password</Text>
            {reset ? (
              <View>
                {type === "phone" ? (
                  <Text style={styles.description}>
                    All done! A text has been sent to{" "}
                    <Text style={{ fontWeight: "bold" }}>{input}</Text> with
                    password recovery instructions.
                  </Text>
                ) : (
                  <Text style={styles.description}>
                    All done! An email has been sent to{" "}
                    <Text style={{ fontWeight: "bold" }}>{input}</Text> with
                    password recovery instructions.
                  </Text>
                )}
                <View style={{ paddingTop: 36 }}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      navigation.navigate("Login");
                    }}
                  >
                    <Text style={styles.buttonText}>Back to Log In</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ paddingTop: 12 }}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={async () => {
                      console.log(input.trim());
                      if (isValidEmail(input.trim())) {
                        resetPassword(input.trim());
                      } else if (isValidPhoneNumber(input.trim())) {
                        console.log("ok");
                        const docs: any = await getDocs(
                          query(
                            collection(db, "caregivers"),
                            where("phoneNumber", "==", input.trim()),
                            limit(1)
                          )
                        );
                        let temp = "";
                        await docs.forEach((doc: any) => {
                          temp = doc.data().email;
                        });

                        if (temp === "") {
                          alert(
                            "User not found, try creating an account first."
                          );
                          return;
                        }

                        resetPassword(temp);
                      } else {
                        alert("Please enter a valid phone number or email.");
                      }
                    }}
                  >
                    <Text style={styles.buttonText}>Resend email</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View>
                <Text style={styles.description}>
                  Please send your email or phone number, and we'll send
                  instructions for password recovery.
                </Text>
                <Text style={styles.description}>Email or phone number</Text>
                <TextInput
                  autoFocus={true}
                  style={styles.input}
                  onChangeText={(input) => {
                    setInput(input);
                  }}
                />
                <View style={{ paddingTop: 36 }}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={async () => {
                      if (isValidEmail(input.trim())) {
                        resetPassword(input.trim());
                      } else if (isValidPhoneNumber(input.trim())) {
                        console.log("ok");
                        const docs: any = await getDocs(
                          query(
                            collection(db, "caregivers"),
                            where("phoneNumber", "==", input.trim()),
                            limit(1)
                          )
                        );
                        let temp = "";
                        await docs.forEach((doc: any) => {
                          temp = doc.data().email;
                        });

                        if (temp === "") {
                          alert(
                            "User not found, try creating an account first."
                          );
                          return;
                        }

                        resetPassword(temp);
                      } else {
                        alert("Please enter a valid phone number or email.");
                      }
                    }}
                  >
                    <Text style={styles.buttonText}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
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
