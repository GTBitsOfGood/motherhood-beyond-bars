import { View } from "../../components/Themed";
import {
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { SupportStackScreenProps } from "../../types";
import React from "react";
import ReachOutSVG from "../../assets/images/reachout";
import BabyBottleSVG from "../../assets/images/babybottle";
import CallSVG from "../../assets/images/call";
import EmailSVG from "../../assets/images/email";
import PhoneSVG from "../../assets/images/phone";

export default function ReachOut({
  navigation,
}: SupportStackScreenProps<"ReachOut">) {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.textbox}>
          <ReachOutSVG />
          <Text style={styles.title}>Reach out to us!</Text>
          <Text style={{ paddingBottom: 10 }}>
            We know childcare isn't the easiest, but we're here to help. Let us
            know if you have any questions, concerns, feedback, or just want to
            chat.
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingTop: 10,
            }}
          >
            <PhoneSVG />
            <View>
              <Text style={{ paddingBottom: 5, paddingLeft: 20 }}>Text</Text>
              <Text
                style={{ paddingBottom: 5, paddingLeft: 20, color: "gray" }}
              >
                (678) 404-1397
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingTop: 10,
            }}
          >
            <EmailSVG />
            <View>
              <Text style={{ paddingBottom: 5, paddingLeft: 20 }}>Email</Text>
              <Text
                style={{ paddingBottom: 5, paddingLeft: 20, color: "gray" }}
              >
                info@motherhoodbeyond.org
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingTop: 15,
            }}
          >
            <CallSVG />
            <View style={{ paddingLeft: 20 }}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  Linking.openURL(`tel:6784041397`);
                }}
              >
                <Text style={styles.buttonText}>Call on Google Voice</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.textbox}>
          <BabyBottleSVG />
          <Text style={styles.title}>Request Items</Text>
          <Text style={{ paddingBottom: 20 }}>
            Request additional items like diapers, baby formula, and clothing.
          </Text>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={[styles.button, { width: 300 }]}
              onPress={() => {
                navigation.navigate("RequestItemsScreen");
              }}
            >
              <Text style={styles.buttonText}>Request</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 5,
    paddingBottom: 15,
  },
  textbox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
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
  },
});
