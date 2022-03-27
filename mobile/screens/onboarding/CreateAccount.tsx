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
import { sendPasswordResetEmail } from "firebase/auth";
import CreateAccountSVG from "../../assets/images/createaccount";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

const isUniqueEmail = async (email: string) =>
  (
    await getDocs(
      query(collection(db, "caregivers"), where("email", "==", email))
    )
  ).empty;
const isValidEmail = (email: string) =>
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

export default function CreateAccount({
  navigation,
}: OnboardingStackScreenProps<"CreateAccount">) {
  const authData = useContext(UserContext);
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        {/* <CreateAccountSVG /> */}
        <Text style={styles.title}>Create your account</Text>
        <Text style={styles.description}>First Name</Text>
        <TextInput
          autoFocus={true}
          style={styles.input}
          onChangeText={(first) => {
            setFirst(first);
          }}
        />
        <Text style={styles.description}>Last Name</Text>
        <TextInput
          autoFocus={true}
          style={styles.input}
          onChangeText={(last) => {
            setLast(last);
          }}
        />
        <Text style={styles.description}>Email</Text>
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
        <Text style={styles.description}>Phone Number</Text>
        <TextInput
          keyboardType="numeric"
          autoFocus={true}
          style={styles.input}
          onChangeText={(phone) => {
            setPhone(phone);
          }}
        />
        <View style={{ paddingTop: 36 }}>
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              if (!isUniqueEmail(email)) {
                alert("Email already in use. Try logging in instead.");
              } else if (!isValidEmail(email)) {
                alert("Invalid email address.");
              } else {
                navigation.navigate("CreatePassword", {
                  first: first,
                  last: last,
                  email: email,
                  phone: phone,
                });
              }
            }}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            paddingTop: 63,
          }}
        >
          <Text style={{ fontSize: 14 }}>Already have an account? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text style={{ color: "#304CD1" }}>Log in.</Text>
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
