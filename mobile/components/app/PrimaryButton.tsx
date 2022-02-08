import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

export default function PrimaryButton({
  text,
  onPress,
}: {
  text: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.primaryButton} onPress={onPress}>
      <Text style={{ fontSize: 16, fontWeight: "500" }}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: "#fff",
    borderColor: "black",
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    alignItems: "center",
    width: "100%",
  },
});
