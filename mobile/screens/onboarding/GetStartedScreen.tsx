import React, { useEffect, useState } from "react";
import { View } from "../../components/Themed";
import { Button, Text } from "react-native";
import { OnboardingStackScreenProps, Waiver } from "../../types";
import { collection, doc, getDocs, query } from "firebase/firestore";
import { db } from "../../config/firebase";
import { getWaivers } from "../../lib/getWaivers";

type Props = OnboardingStackScreenProps<"GetStarted">;

export default function GetStartedScreen({ navigation }: Props) {
  const [allWaivers, setAllWaivers] = useState<Waiver[]>([]);

  useEffect(() => {
    async function setWaivers() {
      const waivers = await getWaivers();
      setAllWaivers(waivers);
    }

    setWaivers();

    return () => {};
  }, []);

  return (
    <View>
      <Text>Get Started</Text>

      <Button
        title="Get Started"
        onPress={() => {
          navigation.navigate("SignWaiver", {
            waiverStack: allWaivers,
            index: 0,
          });
        }}
      />
    </View>
  );
}
