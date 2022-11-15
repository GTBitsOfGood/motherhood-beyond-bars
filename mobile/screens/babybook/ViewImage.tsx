import React, { useState, useContext, useEffect } from "react";
import { View } from "../../components/Themed";
import { StyleSheet, Text, Image } from "react-native";
import { BookStackScreenProps } from "../../types";
import { view } from "../babybook/BabyBook";

type Props = BookStackScreenProps<"ViewImage">;

export default function ViewImage(this: any, { navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={{ height: "80%" }}>
        {view && (
          <Image
            source={{ uri: view.imageURL }}
            style={{ width: "100%", height: 450 }}
          />
        )}
      </View>
      <Text style={styles.description}>{view.caption}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  description: {
    paddingTop: 12,
    fontSize: 14,
    paddingBottom: 8,
  },
});
