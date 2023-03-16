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
import { auth } from "../../config/firebase";

const isValidEmail = (email: string) =>
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
const isValidPhone = (phone: string) => /^[0]?[789]\d{9}$/;

export default function RecoverPassword({
  navigation,
}: OnboardingStackScreenProps<"RecoverPassword">) {
  const [input, setInput] = useState("");
  const [reset, setReset] = useState(false);
  const [type, setType] = useState("");
  const [error, setError] = useState(false)

  const sendEmail = (email: string) => {
    console.log("reset email sent to " + email);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setReset(true);
      })
      .catch(function (e) {
        console.log(e);
        setError(true);
      });
  };

  const resetPassword = (input: string) => {
    if (isValidEmail(input)) {
      setType("email");
      sendEmail(input);
    } else if (isValidPhone(input)) {
      setType("phone");
      // need to implement phone number verification
      console.log("this is a phone number");
    } else {
      alert("Not a valid phone number or email.");
    }
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
                    onPress={() => {
                      resetPassword(input);
                    }}
                  >
                    {type === "phone" ? (
                      <Text style={styles.buttonText}>Resend text</Text>
                    ) : (
                      <Text style={styles.buttonText}>Resend email</Text>
                    )}
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
                      resetPassword(input);
                    }}
                  >
                    <Text style={styles.buttonText}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
        <Text style={[error ? styles.errorText : styles.hidden]}>There was an error in recovering your password. You may have inputted an incorrect email or phone number.</Text>
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
  errorText: {
    paddingTop: 12,
    fontSize: 14,
    color: "#FF0000",
    padding: 20,
  },
  hidden: {
    display: "none"
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
