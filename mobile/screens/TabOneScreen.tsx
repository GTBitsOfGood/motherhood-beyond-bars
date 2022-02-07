import { StyleSheet, TextInput } from "react-native";
import React, { useState, useContext, useEffect } from "react";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { Button } from "react-native";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { auth, db } from "../config/firebase";
import { LoginContext } from "../App";
import { collection, getDocs, query, where } from "firebase/firestore";


export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authData = useContext(LoginContext);
  const [message, setMessage] = useState("");
  const [babies, setBabies] = useState<any>([]);

  useEffect(() => {
    async function getBabies() {
      const babiesArray = await getDocs(query(collection(db, "babies"), where("caregiverEmail", "==", authData?.email)))
      setBabies(babiesArray.docs.map(doc => doc.data().name));
      if (babies.length) {
        setMessage("Congrats! You're signed in.")
      } else {
        setMessage("You don't have access.")
      }
    }
    if (authData) {
      // user is logged in
      getBabies()
    }
  }, [authData])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
      <TextInput
        placeholder="email"
        onChangeText={email => {
          setEmail(email);
        }}
      />
      <TextInput
        placeholder="password"
        onChangeText={password => {
          setPassword(password);
        }}
        secureTextEntry={true}
      />
      <Button
        title="Sign in"
        onPress={async () => {
          const res = await signInWithEmailAndPassword(
            auth,
            email.trim(),
            password
          ).catch(error => {
            if (error.code === 'auth/user-not-found') {
              setMessage("User not found, try creating an account first.")
            } else if (error.code === 'auth/wrong-password') {
              setMessage("Incorrect password.")
            }
          })
        }}
      />
      <Button
        title="Create account"
        onPress={async () => {
          const res = await createUserWithEmailAndPassword(
            auth,
            email.trim(),
            password
          ).catch(error => {
            if (error.code === 'auth/email-already-in-use') {
              setMessage("Email already in use. Try logging in instead.")
            } else if (error.code === 'auth/invalid-email') {
              setMessage("Invalid email address.")
            } else if (error.code === 'auth/invalid-password') {
              setMessage("Password must be at least 6 characters.") 
            }
          })
        }}   
      />

      <Text>{message}</Text>
      <Text>{message === "Congrats! You're signed in." ? "Your email: " + authData?.email: ""}</Text>
      <Text>{message === "Congrats! You're signed in." ? "Babies under your care: " + JSON.stringify(babies) : ""}</Text>

      <Button
        title="Log Out"
        onPress={() => {
          auth.signOut();
          setMessage("Successfully logged out")
        }}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
