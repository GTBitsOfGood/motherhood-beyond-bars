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
import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { UserContext } from "../../providers/User";

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
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  async function updateCaregiverInfo() {
    const caregiverDoc = doc(db, "caregivers", authData?.uid as string);
    updateDoc(caregiverDoc, {
      firstName: first,
      lastName: last,
      phoneNumber: phone,
      email: email,
    });
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
