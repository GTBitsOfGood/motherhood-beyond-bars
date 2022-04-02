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
import { UserContext } from "../../providers/User";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

export default function EditAddress({
  navigation,
}: SettingsStackScreenProps<"EditAddress">) {
  const authData = useContext(UserContext);
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  async function updateAddress() {
    const caregiverDoc = doc(db, "caregivers", authData?.uid as string);
    updateDoc(caregiverDoc, {
      address: address,
      apartment: apartment,
      city: city,
      state: state,
      zipCode: zipCode,
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
              onChangeText={(address) => {
                setAddress(address);
              }}
              placeholder="Street number and name"
            />
            <Text style={styles.description}>Apartment/Suite (Optional)</Text>
            <TextInput
              autoFocus={true}
              style={styles.input}
              onChangeText={(apartment) => {
                setApartment(apartment);
              }}
              placeholder="Apartment number, suite number"
            />
            <Text style={styles.description}>City</Text>
            <TextInput
              autoFocus={true}
              style={styles.input}
              onChangeText={(city) => {
                setCity(city);
              }}
              defaultValue={authData?.caregiver?.city}
            />
            <Text style={styles.description}>State</Text>
            <TextInput
              autoFocus={true}
              style={styles.input}
              onChangeText={(state) => {
                setState(state);
              }}
              defaultValue={authData?.caregiver?.state}
            />
            <Text style={styles.description}>Zip Code</Text>
            <TextInput
              keyboardType="numeric"
              autoFocus={true}
              style={styles.input}
              onChangeText={(zipCode) => {
                setZipCode(zipCode);
              }}
              defaultValue={authData?.caregiver?.zipCode}
            />
            <View style={{ paddingTop: 36 }}>
              <TouchableOpacity
                style={styles.button}
                onPress={async () => {
                  await updateAddress();
                  navigation.navigate("AccountInfo");
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
