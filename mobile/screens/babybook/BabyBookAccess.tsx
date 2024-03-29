import React, { useEffect } from "react";
import { View } from "../../components/Themed";
import { StyleSheet, Text } from "react-native";
import { BookStackScreenProps } from "../../types";

type Props = BookStackScreenProps<"BabyBookAccess">;

export default function BabyBookAccess({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={{ padding: "30%" }}></View>
      <View style={{ padding: 25 }}>
        <Text style={styles.title}>Restricted Access</Text>
        <Text style={{ textAlign: "center" }}>
          Looks like your account is not assigned to a baby yet!
        </Text>
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
    textAlign: "center",
  },
});
