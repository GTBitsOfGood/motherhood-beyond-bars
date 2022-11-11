import { View } from "../../components/Themed";
import {
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Button,
  TouchableOpacity,
} from "react-native";
import { ResourcesStackScreenProps, ResourcesParamList } from "../../types";
import React from "react";

export default function General({
  navigation,
}: ResourcesStackScreenProps<"General">) {
  type ResourcesNavButton = {
    name: string;
    body: string;
    screenName: keyof ResourcesParamList;
  };
  const screens: ResourcesNavButton[] = [
    {
      name: "FAQ",
      body: "Answers to the most commonly asked questions",
      screenName: "FAQ",
    },
    {
      name: "Links",
      body: "Helpful websites and resources for raising a child",
      screenName: "Links",
    },
    {
      name: "Research",
      body: "Be a part of our Harvard research study.",
      screenName: "Research",
    },
  ];
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View>
            {screens.map((screen) => (
              <NavButton
                key={screen.name}
                title={screen.name}
                body={screen.body}
                onPress={() => {
                  navigation.navigate(screen.screenName);
                }}
              />
            ))}
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </View>
  );
}

function NavButton({
  title,
  body,
  onPress,
}: {
  title: string;
  body: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.inner} onPress={onPress}>
      <Text style={styles.buttonTitle}>{title}</Text>
      <Text style={styles.buttonBody}>{body}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  inner: {
    padding: 20,
    borderColor: "#eee",
    borderWidth: 1,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    paddingTop: 3,
    fontSize: 16,
  },
  buttonTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonBody: {
    marginTop: 5,
    fontSize: 16,
    color: "#555",
  },
});
