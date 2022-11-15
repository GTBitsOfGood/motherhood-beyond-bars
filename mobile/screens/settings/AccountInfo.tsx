import { View } from "../../components/Themed";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { SettingsStackScreenProps, Waiver } from "../../types";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../providers/User";
import { auth, db } from "../../config/firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { getWaivers } from "../../lib/getWaivers";
import { waiverSigned } from "../onboarding/SignWaiver";
import updatedWaivers from "../onboarding/SignWaiver";

export var waiverUpdate = false;
export var prevSignedWaivers = undefined;

if (waiverSigned) {
  waiverUpdate = false;
}

export default function AccountInfo({
  navigation,
}: SettingsStackScreenProps<"AccountInfo">) {
  const authData = useContext(UserContext);

  const [waivers, setWaivers] = useState<Waiver[]>();
  const [signedWaivers, setSignedWaivers] = useState();

  prevSignedWaivers = signedWaivers;


  useEffect(() => {
    let ignore = false;

    async function findWaiver() {
      const waivers = await getWaivers();
      setWaivers(waivers);
    }
    findWaiver();

    const caregiverDoc = doc(db, "caregivers", authData?.uid as string);
    if (caregiverDoc != undefined) {
      getDoc(caregiverDoc).then((doc) => {
        if (!ignore) {
          // const data = doc?.data()?.signedWaivers;
          setSignedWaivers(doc?.data()?.signedWaivers);
        }
        // console.log("PREV WAIVER: " + prevSignedWaivers);
        console.log("WAIVER: " + signedWaivers);

      });
    }
    return () => {
      ignore = true;
    };

  }, []);

  function checkWaiverUpdate() {
    if (waivers != undefined && signedWaivers != undefined) {
      for (let i = 0; i < waivers?.length; i++) {
        if (waivers[i].lastUpdated > signedWaivers[i].timestamp) {
          waiverUpdate = true;
          // prevSignedWaivers = updatedWaivers;
          console.log("Waiver " + i + " has been updated!" + waiverUpdate)
        } else {
          console.log("Waiver " + i + " hasn't been updated" + waiverUpdate)
        }
      }
    }
    // prevSignedWaivers = signedWaivers;
  }



  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.inner}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "baseline",
                paddingTop: 28,
              }}
            >
              <Text style={[styles.title, { paddingRight: 12 }]}>
                Account Information
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("EditAccount");
                }}
              >
                <Text style={{ color: "#304CD1", fontWeight: "bold" }}>
                  Edit
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.subtitle}>First Name</Text>
            <Text style={styles.description}>
              {authData?.caregiver?.firstName}
            </Text>
            <Text style={styles.subtitle}>Last Name</Text>
            <Text style={styles.description}>
              {authData?.caregiver?.lastName}
            </Text>
            <Text style={styles.subtitle}>Email</Text>
            <Text style={styles.description}>{authData?.caregiver?.email}</Text>
            <Text style={styles.subtitle}>Phone Number</Text>
            <Text style={styles.description}>
              {authData?.caregiver?.phoneNumber}
            </Text>
            <Text style={styles.subtitle}>Password</Text>
            <Text style={styles.description}>••••••••••</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "baseline",
                paddingTop: 36,
              }}
            >
              <Text style={[styles.title, { paddingRight: 12 }]}>Address</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("EditAddress");
                }}
              >
                <Text style={{ color: "#304CD1", fontWeight: "bold" }}>
                  Edit
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.subtitle}>Address</Text>

            <Text style={styles.description}>
              {authData?.caregiver?.address}, {authData?.caregiver?.apartment}
            </Text>

            <Text style={styles.description}>
              {authData?.caregiver?.city}, {authData?.caregiver?.state}{" "}
              {authData?.caregiver?.zipCode}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "baseline",
                paddingTop: 36,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  checkWaiverUpdate();
                  signOut(auth);
                }}
              >
                <Text style={{ color: "#304CD1", fontWeight: "bold" }}>
                  Log Out
                </Text>
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
  },
  subtitle: {
    fontSize: 14,
    color: "#666666",
    paddingTop: 18,
  },
  description: {
    paddingTop: 3,
    fontSize: 16,
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
