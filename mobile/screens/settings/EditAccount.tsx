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
import { getAuth, updateEmail } from "firebase/auth";

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
  const [last, setLast] = useState(authData?.caregiver?.lastName as string);
  const [email, setEmail] = useState(authData?.caregiver?.email as string);
  const [phone, setPhone] = useState(
    authData?.caregiver?.phoneNumber as string
  );
  const [modalVisible, setModalVisible] = useState(false);

  async function updateCaregiverInfo() {
    const caregiverDoc = doc(db, "caregivers", authData?.uid as string);
    updateDoc(caregiverDoc, {
      firstName: first,
      lastName: last,
      phoneNumber: phone,
      email: email,
    });
    // updateEmail(authData, email)
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.inner}>
            <Text style={styles.title}>Edit Account Information</Text>
            <Text style={styles.description}>First Name</Text>
            <TextInput
              autoFocus={true}
              style={styles.input}
              onChangeText={(first) => {
                setFirst(first);
              }}
              defaultValue={authData?.caregiver?.firstName}
            />
            <Text style={styles.description}>Last Name</Text>
            <TextInput
              autoFocus={true}
              style={styles.input}
              onChangeText={(last) => {
                setLast(last);
              }}
              defaultValue={authData?.caregiver?.lastName}
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
              defaultValue={authData?.caregiver?.email}
            />
            <Text style={styles.description}>Phone Number</Text>
            <TextInput
              keyboardType="numeric"
              autoFocus={true}
              style={styles.input}
              onChangeText={(phone) => {
                setPhone(phone);
              }}
              defaultValue={authData?.caregiver?.phoneNumber}
            />
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
                  if (!(await isUniqueEmail(email))) {
                    alert("Email already in use. Try logging in instead.");
                  } else if (!isValidEmail(email)) {
                    alert("Invalid email address.");
                  } else if (!isValidPhoneNumber(phone)) {
                    alert("Invalid phone number");
                  } else {
                    await updateCaregiverInfo();
                    navigation.navigate("AccountInfo");
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
                        navigation.goBack();
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
    paddingTop: 28,
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
