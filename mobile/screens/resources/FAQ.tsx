import React from "react";
import { View, Text, Button } from "react-native";
import { ResourcesStackScreenProps } from "../../types";

export default function FAQ({ navigation }: ResourcesStackScreenProps<"FAQ">) {
  return (
    <View>
      <Button
        title="Back"
        onPress={() => {
          navigation.goBack();
        }}
      />
      <Text>FAQ Here!</Text>
    </View>
  );
}
