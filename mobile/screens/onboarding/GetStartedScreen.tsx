import React from "react";
import { View } from "../../components/Themed";
import { Button, Text } from "react-native";
import { OnboardingStackScreenProps } from "../../types";

type Props = OnboardingStackScreenProps<"GetStarted">;

export default function GetStartedScreen({ navigation }: Props) {
  return (
    <View>
      <Text>Get Started</Text>
      <Button
        title="Get Started"
        onPress={() => {
          navigation.navigate("Info");
        }}
      />
    </View>
  );
}
