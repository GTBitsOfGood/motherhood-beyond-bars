import { View } from "../../components/Themed";
import { Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { OnboardingStackScreenProps } from "../../types";
import React from "react";

export default function RecoverPassword({
  navigation,
}: OnboardingStackScreenProps<"RecoverPassword">) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recover Password</Text>
      <Text style={styles.description}>
        Please send your email or phone number, and we'll send instructions for
        password recovery.
      </Text>
      <Text style={styles.description}>Email or phone number</Text>
      <TextInput style={styles.input}></TextInput>
      <View style={{ paddingTop: 36 }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            // should send confirmation to email / phone # and redirect
          }}
        >
          <Text style={styles.buttonText}>Submit</Text>
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
