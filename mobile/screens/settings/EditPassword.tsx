import { View } from "../../components/Themed";
import {
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Modal,
} from "react-native";
import { SettingsStackScreenProps } from "../../types";
import React, { useContext, useState } from "react";
import { UserContext } from "../../providers/User";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { auth } from "../../config/firebase";
import { AntDesign } from "@expo/vector-icons";
import RequiredField from "../../components/app/RequiredField";

export default function EditPassword({
  navigation,
}: SettingsStackScreenProps<"EditPassword">) {
  const authData = useContext(UserContext);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  async function updatePass() {
    if (auth.currentUser && auth.currentUser.email) {
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        oldPassword
      );

      reauthenticateWithCredential(auth.currentUser, credential)
        .then(function () {
          // update password
          if (newPassword === confirmPassword && auth.currentUser) {
            updatePassword(auth.currentUser, newPassword);
            navigation.navigate("AccountInfo");
          } else {
            alert("Passwords do not match");
          }
        })
        .catch(function (e) {
          // wrong old password
          if (e.code === "auth/wrong-password") {
            alert("Wrong password");
          }
        });
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ paddingLeft: 10, paddingTop: 10 }}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <AntDesign name="left" size={30} color="black" />
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.inner}>
            <Text style={styles.title}>Edit Password Information</Text>
            <Text style={styles.description}>Old Password</Text>
            <TextInput
              autoFocus={true}
              style={[
                styles.input,
                oldPassword.length === 0 && { borderColor: "#FF3939" },
              ]}
              onChangeText={(oldPassword) => {
                setOldPassword(oldPassword);
              }}
              autoCompleteType="password"
              secureTextEntry={true}
              placeholder="Type your current password"
            />
            {oldPassword.length === 0 && <RequiredField />}
            <Text style={styles.description}>New Password</Text>
            <TextInput
              autoFocus={true}
              style={[
                styles.input,
                newPassword.length === 0 && { borderColor: "#FF3939" },
              ]}
              onChangeText={(newPassword) => {
                setNewPassword(newPassword);
              }}
              autoCompleteType="password"
              secureTextEntry={true}
              placeholder="Create a new secure password"
            />
            {newPassword.length === 0 && <RequiredField />}
            <Text style={styles.description}>Confirm New Password</Text>
            <TextInput
              autoFocus={true}
              style={[
                styles.input,
                confirmPassword.length === 0 && { borderColor: "#FF3939" },
              ]}
              onChangeText={(confirmPassword) => {
                setConfirmPassword(confirmPassword);
              }}
              autoCompleteType="password"
              secureTextEntry={true}
              placeholder="Confirm your password"
            />
            {confirmPassword.length === 0 && <RequiredField />}
            <View style={{ paddingTop: 36 }}>
              <TouchableOpacity
                style={styles.button}
                onPress={async () => {
                  if (
                    !(
                      oldPassword === "" ||
                      newPassword === "" ||
                      confirmPassword === ""
                    )
                  ) {
                    updatePass();
                    navigation.navigate("AccountInfo");
                  }
                }}
              >
                <Text style={styles.buttonText}>Change Password</Text>
              </TouchableOpacity>
            </View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View
                style={{
                  padding: 20,
                  height: "30%",
                  marginTop: "auto",
                  justifyContent: "space-around",
                  borderRadius: 5,
                }}
              >
                <Text style={styles.title}>Your changes won't be saved.</Text>
                <Text style={styles.subheader}>
                  If you return to the previous screen, your changes will not be
                  saved.
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ width: "50%" }}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        navigation.navigate("AccountInfo");
                        setModalVisible(!modalVisible);
                      }}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Text style={styles.buttonText}>Don't save</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={{ width: 10 }}></View>
                  <View style={{ width: "50%" }}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        setModalVisible(!modalVisible);
                      }}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Text style={styles.buttonText}>Keep editing</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      <View style={modalVisible && styles.overlay} />
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
  subheader: {
    fontSize: 16,
    marginBottom: 24,
  },
  overlay: {
    position: "absolute",
    width: "120%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.7)",
    opacity: 0.5,
  },
});
