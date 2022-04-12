import { View } from "../../components/Themed";
import {
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { ResourcesStackScreenProps } from "../../types";
import React from "react";

export default function General({
  navigation,
}: ResourcesStackScreenProps<"General">) {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.inner}>
            <Text style={styles.title}>Resources</Text>
            <Text style={styles.description}>Work in Progress</Text>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  inner: {
    padding: 20,
    flex: 1,
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    paddingTop: 3,
    fontSize: 16,
  },
});
