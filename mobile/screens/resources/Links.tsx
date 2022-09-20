import React from "react";
import { View, Text, Button } from "react-native";
import { ResourcesStackScreenProps } from "../../types";

export default function Links({
  navigation,
}: ResourcesStackScreenProps<"Links">) {
  return (
    <View>
      <Button
        title="Back"
        onPress={() => {
          navigation.goBack();
        }}
      />
      <Text>Links Here!</Text>
    </View>
  );
}
