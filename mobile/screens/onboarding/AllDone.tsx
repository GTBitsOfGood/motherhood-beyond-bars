import { View } from "../../components/Themed";
import { Text } from "react-native";
import { OnboardingStackScreenProps } from "../../types";
import React from "react";

export default function AllDone({
  navigation
}: OnboardingStackScreenProps<"AllDone">) {
  
  return (
    <View>
      <Text>ALL DONE!</Text>
      <Text>Please expect a call from MBB soon to confirm the order.</Text>
    </View>
  );
}