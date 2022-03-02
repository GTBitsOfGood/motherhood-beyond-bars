import React from "react";
import { View } from "../../components/Themed";
import { Button, Text } from "react-native";
import { OnboardingStackScreenProps } from "../../types";

export default function InfoScreen({
  navigation,
}: OnboardingStackScreenProps<"Info">) {
  return (
    <View>
      <Button
        title="Go Back"
        onPress={() => {
          navigation.goBack();
        }}
      />
      <Text>Info</Text>
    </View>
  );
}
