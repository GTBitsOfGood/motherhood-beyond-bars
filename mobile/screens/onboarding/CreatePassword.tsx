import { View } from "../../components/Themed";
import { Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { OnboardingStackScreenProps } from "../../types";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../providers/User";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { doc, updateDoc } from "firebase/firestore";

export default function CreatePassword({
  navigation,
  route,
}: OnboardingStackScreenProps<"CreatePassword">) {
  const authData = useContext(UserContext);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  async function setCaregiverInfo() {
    const caregiverDoc = doc(db, "caregivers", authData?.uid as string);
    updateDoc(caregiverDoc, {
      firstName: route?.params?.first,
      lastName: route?.params?.last,
      phoneNumber: route?.params?.phone,
      email: route?.params?.email
    })
  }

  return (
    <View style={styles.container}>
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
        <View style={{paddingTop: 36}}>
            <TouchableOpacity style={styles.button} onPress={async () => {
                if (password === confirm) {
                  await createUserWithEmailAndPassword(
                    auth,
                    route?.params?.email.trim(),
                    password
                  ).catch((error) => {
                    if (error.code === "auth/email-already-in-use") {
                      // ("Email already in use. Try logging in instead.");
                    } else if (error.code === "auth/invalid-email") {
                      // ("Invalid email address.");
                    } else if (error.code === "auth/invalid-password") {
                      // ("Password must be at least 6 characters.");
                    }
                  });
                  await setCaregiverInfo();
                  navigation.navigate("GetStarted")
                }
                // else, alert that passwords aren't equal
            }}>
            <Text style={styles.buttonText}>Get started</Text>
            </TouchableOpacity>
        </View>
      <View style={{flexDirection: 'row', justifyContent: 'center', paddingTop: 249.5}}>
        <Text style={{fontSize: 14}}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{color: '#304CD1'}}>
                Log in.
            </Text>
        </TouchableOpacity>
      </View>
    </View>
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
    backgroundColor: '#FAFBFC', 
    height: 44, 
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: 4,
    width: '100%',
    paddingLeft: 8,
  },
  button: {
    borderWidth:1,
    borderColor:"#304CD1",
    alignItems:'center',
    justifyContent:'center',
    height:50,
    backgroundColor:'#fff',
    borderRadius: 5,
  },
  buttonText: {
    color: "#304CD1",
    padding: 10,
    fontWeight: "500",
    fontSize: 16,
  }
});