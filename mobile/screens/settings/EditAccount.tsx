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
import React, { useContext, useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { UserContext } from "../../providers/User";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
} from "firebase/auth";
import RequiredField from "../../components/app/RequiredField";
import { AntDesign } from "@expo/vector-icons";

const isUniqueEmail = async (email: string) =>
  (
    await getDocs(
      query(collection(db, "caregivers"), where("email", "==", email))
    )
  ).empty;
const isValidEmail = (email: string) =>
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
const isValidPhoneNumber = (phone: string) =>
  /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(phone);

export default function EditAccount({
  navigation,
}: SettingsStackScreenProps<"EditAccount">) {
  const authData = useContext(UserContext);
  const [first, setFirst] = useState(authData?.caregiver?.firstName as string);
  const [firstEmpty, setFirstEmpty] = useState(false);
  const [last, setLast] = useState(authData?.caregiver?.lastName as string);
  const [lastEmpty, setLastEmpty] = useState(false);
  const [email, setEmail] = useState(authData?.caregiver?.email as string);
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [phone, setPhone] = useState(
    authData?.caregiver?.phoneNumber as string
  );
  const [phoneEmpty, setPhoneEmpty] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  async function updateCaregiverInfo() {
    const caregiverDoc = doc(db, "caregivers", authData?.uid as string);
    if (auth.currentUser && auth.currentUser.email) {
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        password
      );
      reauthenticateWithCredential(auth.currentUser, credential)
        .then(function () {
          // update email
          if (auth.currentUser) {
            if (email != (authData?.caregiver?.email as string)) {
              updateEmail(auth.currentUser, email);
            }
            navigation.navigate("AccountInfo");
          }
        })
        .catch(function (e) {
          alert(e);
          if (auth.currentUser && auth.currentUser.email) {
            setEmail(auth.currentUser.email);
          }
          // wrong old password
          if (e.code === "auth/wrong-password") {
            alert("wrong password");
          }
        });
    }
    updateDoc(caregiverDoc, {
      firstName: first,
      lastName: last,
      phoneNumber: phone,
      email: email,
    });
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
            <Text style={styles.title}>Edit Account Information</Text>
            <Text style={styles.description}>First Name</Text>
            <TextInput
              autoFocus={true}
              style={[styles.input, firstEmpty && { borderColor: "#FF3939" }]}
              onChangeText={(first) => {
                first !== "" && setFirstEmpty(false);
                setFirst(first);
              }}
              defaultValue={authData?.caregiver?.firstName}
            />
            {firstEmpty && <RequiredField />}
            <Text style={styles.description}>Last Name</Text>
            <TextInput
              autoFocus={true}
              style={[styles.input, lastEmpty && { borderColor: "#FF3939" }]}
              onChangeText={(last) => {
                last !== "" && setLastEmpty(false);
                setLast(last);
              }}
              defaultValue={authData?.caregiver?.lastName}
            />
            {lastEmpty && <RequiredField />}
            <Text style={styles.description}>Email</Text>
            <TextInput
              placeholder="email"
              autoCompleteType="email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoFocus={true}
              style={[styles.input, emailEmpty && { borderColor: "#FF3939" }]}
              onChangeText={(email) => {
                email !== "" && setEmailEmpty(false) && setPasswordEmpty(false);
                setEmail(email);
              }}
              defaultValue={authData?.caregiver?.email}
            />
            {emailEmpty && <RequiredField />}
            {email != (authData?.caregiver?.email as string) && (
              <View>
                <Text style={[styles.description, { fontSize: 14 }]}>
                  Please confirm your password
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    passwordEmpty && { borderColor: "#FF3939" },
                  ]}
                  onChangeText={(password) => {
                    password !== "" && setPasswordEmpty(false);
                    setPassword(password);
                  }}
                  autoCompleteType="password"
                  secureTextEntry={true}
                  placeholder="Type your current password"
                />
              </View>
            )}
            {email != (authData?.caregiver?.email as string) &&
              passwordEmpty && <RequiredField />}
            <Text style={styles.description}>Phone Number</Text>
            <TextInput
              keyboardType="numeric"
              autoFocus={true}
              style={[styles.input, phoneEmpty && { borderColor: "#FF3939" }]}
              onChangeText={(phone) => {
                phone !== "" && setPhoneEmpty(false);
                setPhone(phone);
              }}
              defaultValue={authData?.caregiver?.phoneNumber}
            />
            {phoneEmpty && <RequiredField />}
            <View
              style={{
                flexDirection: "row",
                alignItems: "baseline",
                paddingTop: 24,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("EditPassword");
                }}
              >
                <Text style={{ color: "#304CD1" }}>Change password</Text>
              </TouchableOpacity>
            </View>
            <View style={{ paddingTop: 36 }}>
              <TouchableOpacity
                style={styles.button}
                onPress={async () => {
                  if (
                    first === "" ||
                    last === "" ||
                    email === "" ||
                    phone === "" ||
                    (email != (authData?.caregiver?.email as string) &&
                      password === "")
                  ) {
                    first === "" && setFirstEmpty(true);
                    last === "" && setLastEmpty(true);
                    email === "" && setEmailEmpty(true);
                    phone === "" && setPhoneEmpty(true);
                    email != (authData?.caregiver?.email as string) &&
                      password === "" &&
                      setPasswordEmpty(true);
                  } else {
                    if (
                      email != (authData?.caregiver?.email as string) &&
                      !(await isUniqueEmail(email))
                    ) {
                      alert("Email already in use. Try logging in instead.");
                    } else if (!isValidEmail(email)) {
                      alert("Invalid email address.");
                    } else if (!isValidPhoneNumber(phone)) {
                      alert("Invalid phone number");
                    } else {
                      await updateCaregiverInfo();
                    }
                  }
                }}
              >
                <Text style={styles.buttonText}>Save Changes</Text>
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
                        setModalVisible(!modalVisible);
                        navigation.navigate("AccountInfo");
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
