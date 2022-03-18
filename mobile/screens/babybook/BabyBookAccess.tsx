import React, { useState } from "react";
import { View } from "../../components/Themed";
import { StyleSheet, Button, Switch, Text } from "react-native";
import { BookStackScreenProps } from "../../types";

type Props = BookStackScreenProps<"BabyBookAccess">;

export default function BabyBookAccess({ navigation }: Props) {
  const [isSelected, setSelection] = useState(false);
  return (
    <View style={styles.container}>
      <Switch
        value={isSelected}
        onChange={() => {
          setSelection(!isSelected);
          if (isSelected == false) {
            navigation.navigate("StartBook");
          }
        }}
      />
      <Text>Access to Baby Book</Text>
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
