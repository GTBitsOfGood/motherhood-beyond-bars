import React from "react";
import { View } from "../../components/Themed";
import { StyleSheet, Text } from "react-native";
import { BookStackScreenProps } from "../../types";

import { BabyContext } from "../../providers/Baby";
import { useContext } from "react";

type Props = BookStackScreenProps<"BabyBookAccess">;

export default function BabyBookAccess({ navigation }: Props) {

  var baby = useContext(BabyContext);

  if (baby != null) {
    navigation.navigate("BabyBook");
  }

  return (
    <View style={styles.container}>
      {/* <Switch
        value={isSelected}
        onChange={() => {
          setSelection(!isSelected);
          if (isSelected == false) {
            navigation.navigate("StartBook");
          }
        }}
      />
      <Text>Access to Baby Book</Text> */}
      {/* <Text>Access to Baby Book</Text> */}
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
