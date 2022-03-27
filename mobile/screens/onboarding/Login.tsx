import { View } from "../../components/Themed";
import {
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { OnboardingStackScreenProps } from "../../types";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../providers/User";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

export default function Login({
  navigation,
}: OnboardingStackScreenProps<"Login">) {
  const authData = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.title}>Log in</Text>
        <Text style={styles.description}>Email or Phone Number</Text>
        <TextInput
          autoCompleteType="email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoFocus={true}
          style={styles.input}
          onChangeText={(email) => {
            setEmail(email);
          }}
        />
        <Text style={styles.description}>Password</Text>
        <TextInput
          style={styles.input}
          autoCompleteType="password"
          onChangeText={(password) => {
            setPassword(password);
          }}
          secureTextEntry={true}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            paddingTop: 9,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("RecoverPassword")}
          >
            <Text style={{ color: "#304CD1" }}>Forgot Password</Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingTop: 36 }}>
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              await signInWithEmailAndPassword(
                auth,
                email.trim(),
                password
              ).catch((error) => {
                if (error.code === "auth/user-not-found") {
                  alert("User not found, try creating an account first.");
                } else if (error.code === "auth/wrong-password") {
                  alert("Incorrect password.");
                }
              });
            }}
          >
            <Text style={styles.buttonText}>Log in</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            paddingTop: 155.5,
          }}
        >
          <Text style={{ fontSize: 14 }}>Already have an account? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("CreateAccount")}
          >
            <Text style={{ color: "#304CD1" }}>Sign Up.</Text>
          </TouchableOpacity>
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
