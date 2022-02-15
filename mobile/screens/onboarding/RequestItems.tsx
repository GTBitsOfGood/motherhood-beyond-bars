import React from "react";
import { View } from "../../components/Themed";
import { Button, Text } from "react-native";
import { OnboardingStackScreenProps } from "../../types";

type Props = OnboardingStackScreenProps<"GetStarted">;

export default function RequestItems({ navigation }: Props) {
  return (
    <View>
      <Text>Request Items</Text>
    </View>
  );
}