import { View } from "../../components/Themed";
import {
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Caregiver, OnboardingStackScreenProps } from "../../types";
import React, { useContext, useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { UserContext } from "../../providers/User";
import { db } from "../../config/firebase";
import Checkbox from "../../components/app/Checkbox";

export default function ShippingAddress({
  navigation,
}: OnboardingStackScreenProps<"ShippingAddress">) {
  const authData = useContext(UserContext);
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [save, setSave] = useState(false);
  const [completed, setCompleted] = useState(false);

  async function setShippingAddress() {
    const caregiverDoc = doc(db, "caregivers", authData?.uid as string);

    updateDoc(caregiverDoc, {
      address: address,
      apartment: apartment,
      city: city,
      state: state,
      zipCode: zipCode,
      saveAddressForFutureDelivery: save,
    } as Partial<Caregiver>);
  }

  useEffect(() => {
    if (address !== "" && city !== "" && state !== "" && zipCode !== "") {
      setCompleted(true);
    } else {
      setCompleted(false);
    }
  });

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.inner}>
            <Text style={styles.title}>Shipping Address</Text>
            <Text style={{ paddingBottom: 10 }}>
              Let us know where we can deliver your requested supplies!
            </Text>

            <Text style={styles.text}>Street Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Street number and name"
              onChangeText={(address) => {
                setAddress(address);
              }}
            ></TextInput>

            <Text style={styles.text}>Apartment/Suite (Optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="Apartment number, suite number"
              onChangeText={(apartment) => {
                setApartment(apartment);
              }}
            ></TextInput>

            <Text style={styles.text}>City</Text>
            <TextInput
              style={styles.input}
              onChangeText={(city) => {
                setCity(city);
              }}
            ></TextInput>

            <Text style={styles.text}>State</Text>
            <TextInput
              style={styles.input}
              onChangeText={(state) => {
                setState(state);
              }}
            ></TextInput>

            <Text style={styles.text}>Zip Code</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              onChangeText={(zipCode) => {
                setZipCode(zipCode);
              }}
            ></TextInput>

            <View style={{ padding: 10 }}></View>

            <View style={{ flexDirection: "row" }}>
              <Checkbox
                checked={save}
                onPress={() => {
                  setSave(!save);
                }}
              />
              <Text style={{ paddingLeft: 5 }}>
                Save address for future deliveries
              </Text>
            </View>

            <View style={{ padding: 10 }}></View>

            <View style={{ paddingTop: 36 }}>
              {!completed && (
                <TouchableOpacity
                  style={[styles.button, { borderColor: "#BFBFBF" }]}
                >
                  <Text style={[styles.buttonText, { color: "#BFBFBF" }]}>
                    Next
                  </Text>
                </TouchableOpacity>
              )}
              {completed && (
                <TouchableOpacity
                  style={styles.button}
                  onPress={async () => {
                    setShippingAddress();
                    navigation.navigate("BestContact");
                  }}
                >
                  <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
              )}
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
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 15,
  },
  textbox: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 10,
  },
  text: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  input: {
    backgroundColor: "#f5f5f5",
    height: 40,
    borderColor: "lightgray",
    borderWidth: 0.5,
    width: "100%",
    paddingLeft: 5,
    borderRadius: 5,
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
