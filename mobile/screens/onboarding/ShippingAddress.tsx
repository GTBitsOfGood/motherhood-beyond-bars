import React from "react";
import { View } from "../../components/Themed";
import { Button, Text } from "react-native";
import { OnboardingStackScreenProps } from "../../types";

type Props = OnboardingStackScreenProps<"GetStarted">;

export default function ShippingAddress({ navigation }: Props) {
  return (
    <View>
      <Text>Shipping Address</Text>
    </View>
  );
}