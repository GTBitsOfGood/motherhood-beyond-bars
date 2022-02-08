import { StyleSheet, TextInput, Switch } from "react-native";
import React, { useState, useContext, useEffect } from "react";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../config/firebase";
import { UserContext } from "../providers";
import { collection, getDocs, query, where } from "firebase/firestore";
import LogoutButton from "../components/app/LogoutButton";
import PrimaryButton from "../components/app/PrimaryButton";

export default function LoginScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authData = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [babies, setBabies] = useState<any>([]);

  useEffect(() => {
    async function getBabies() {
      const babiesArray = await getDocs(
        query(
          collection(db, "babies"),
          where("caregiverEmail", "==", authData?.email)
        )
      );
      setBabies(babiesArray.docs.map((doc) => doc.data().name));
      if (babies.length) {
        setMessage("Congrats! You're signed in.");
      } else {
        setMessage("You don't have access.");
      }
    }
    if (authData) {
      // user is logged in
      getBabies();
    }

    return () => {
      // cleanup
    };
  }, [authData]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="email"
        autoCompleteType="email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoFocus={true}
        style={styles.input}
        onChangeText={(email) => {
          setEmail(email);
        }}
      />
      <TextInput
        placeholder="password"
        style={styles.input}
        autoCompleteType="password"
        onChangeText={(password) => {
          setPassword(password);
        }}
        secureTextEntry={true}
      />

      {/* Don't show sign in / sign out if the user is logged in  */}
      {!authData && (
        <>
          <PrimaryButton
            text="Sign In"
            onPress={async () => {
              await signInWithEmailAndPassword(
                auth,
                email.trim(),
                password
              ).catch((error) => {
                if (error.code === "auth/user-not-found") {
                  setMessage("User not found, try creating an account first.");
                } else if (error.code === "auth/wrong-password") {
                  setMessage("Incorrect password.");
                }
              });
            }}
          />
          <PrimaryButton
            text="Create Account"
            onPress={async () => {
              await createUserWithEmailAndPassword(
                auth,
                email.trim(),
                password
              ).catch((error) => {
                if (error.code === "auth/email-already-in-use") {
                  setMessage("Email already in use. Try logging in instead.");
                } else if (error.code === "auth/invalid-email") {
                  setMessage("Invalid email address.");
                } else if (error.code === "auth/invalid-password") {
                  setMessage("Password must be at least 6 characters.");
                }
              });
            }}
          />
        </>
      )}

      <Text>{message}</Text>
      {authData && <Text>Your email: {authData?.email}</Text>}
      {authData && (
        <Text>Babies under your care: {JSON.stringify(babies)}</Text>
      )}

      {authData && (
        <LogoutButton
          onPress={() => {
            setMessage("Successfully logged out");
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#eee",
  },
});
