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
import { SettingsStackScreenProps } from "../../types";
import React, { useState } from "react";

export default function EditPassword({
  navigation,
}: SettingsStackScreenProps<"EditPassword">) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function updatePassword() {}

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.inner}>
            <Text style={styles.title}>Edit Password Information</Text>
            <Text style={styles.description}>Old Password</Text>
            <TextInput
              autoFocus={true}
              style={styles.input}
              onChangeText={(oldPassword) => {
                setOldPassword(oldPassword);
              }}
              autoCompleteType="password"
              secureTextEntry={true}
              placeholder="Type your current password"
            />
            <Text style={styles.description}>New Password</Text>
            <TextInput
              autoFocus={true}
              style={styles.input}
              onChangeText={(newPassword) => {
                setNewPassword(newPassword);
              }}
              autoCompleteType="password"
              secureTextEntry={true}
              placeholder="Create a new secure password"
            />
            <Text style={styles.description}>Confirm New Password</Text>
            <TextInput
              autoFocus={true}
              style={styles.input}
              onChangeText={(confirmPassword) => {
                setConfirmPassword(confirmPassword);
              }}
              autoCompleteType="password"
              secureTextEntry={true}
              placeholder="Confirm your password"
            />
            <View style={{ paddingTop: 36 }}>
              <TouchableOpacity
                style={styles.button}
                onPress={async () => {
                  updatePassword();
                  navigation.navigate("AccountInfo");
                }}
              >
                <Text style={styles.buttonText}>Change Password</Text>
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
    fontSize: 18,
    fontWeight: "bold",
    paddingTop: 28,
    paddingBottom: 6,
  },
  description: {
    paddingTop: 12,
    fontSize: 16,
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
