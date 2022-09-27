import React from "react";
import { View, Text, Button } from "react-native";
import { ResourcesStackScreenProps } from "../../types";

export default function Research({
  navigation,
}: ResourcesStackScreenProps<"Research">) {
  return (
    <View>
      <Button
        title="Back"
        onPress={() => {
          navigation.goBack();
        }}
      />
      <Text>Research Here!</Text>
    </View>
  );
}
