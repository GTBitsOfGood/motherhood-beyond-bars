import { View } from "../../components/Themed";
import { Text } from "react-native";
import { OnboardingStackScreenProps } from "../../types";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../../providers";

export default function AllDone({
  navigation,
}: OnboardingStackScreenProps<"AllDone">) {
  const authData = useContext(UserContext);

  return (
    <View>
      <Text>Loading</Text>
    </View>
  );
}
