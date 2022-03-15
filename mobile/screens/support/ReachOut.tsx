import { View } from "../../components/Themed";
import { Text, StyleSheet, Button } from "react-native";
import { SupportStackScreenProps } from "../../types";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../../providers/User";

export default function ReachOut({
  navigation,
}: SupportStackScreenProps<"ReachOut">) {
  const authData = useContext(UserContext);

  return (
    <View style={styles.container}>
      <View style={styles.textbox}>
        <Text style={styles.title}>Reach out to us!</Text>
        <Text>We know childcare isn't the easiest, but we're here to help. Let us know if you have any questions, concerns, feedback, or just want to chat.</Text>
        <Text>Text</Text>
        <Text>(678) 404-1397</Text>
        <Text>Email</Text>
        <Text>info@motherhoodbeyond.org</Text>
        <Button
            title="Call on Google Voice"
            onPress={() => {
                // call 678 404 1397
            }}
        />
      </View>
      
      <View style={styles.textbox}>
        <Text style={styles.title}>Request Items</Text>
        <Text>Request additional items like diapers, baby formula, and clothing.</Text>
        <Button
            title="Request"
            onPress={() => {
                navigation.navigate("RequestItemsScreen")
            }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 30,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      paddingBottom: 15,
    },
    center: {
      fontSize: 20,
      fontWeight: "bold",
      paddingBottom: 15,
      textAlign: "center",
    },
    textbox: {
      backgroundColor: "white",
      borderRadius: 10,
      padding: 10,
      shadowColor: "#171717",
      shadowOffset: { width: -2, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
    thumbnail: {
      width: 300,
      height: 300,
      resizeMode: "contain",
    }
  });
  