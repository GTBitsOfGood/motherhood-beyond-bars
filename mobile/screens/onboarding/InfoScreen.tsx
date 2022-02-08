import React from "react";
import { View } from "../../components/Themed";
import { Button, Text } from "react-native";
import { OnboardingStackScreenProps } from "../../types";

type Props = OnboardingStackScreenProps<"GetStarted">;

export default function InfoScreen({ navigation }: Props) {
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
