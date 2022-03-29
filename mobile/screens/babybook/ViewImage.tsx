import React, { useState, useContext, useEffect } from "react";
import { View } from "../../components/Themed";
import {
  StyleSheet,
  Button,
  Switch,
  Text,
  TextInput,
  Platform,
  Alert,
  Animated,
  Image
} from "react-native";
import { BookStackScreenProps } from "../../types";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, Timestamp, setDoc } from "firebase/firestore";
import { db, storage } from "../../config/firebase";
import { UserContext } from "../../providers/User";
import { BabyContext } from "../../providers/Baby";
import { ProgressBar, Colors } from "react-native-paper";
import {view} from '../babybook/BabyBook';

type Props = BookStackScreenProps<"ViewImage">;


export default function ViewImage(this: any, { navigation }: Props) {

    
  return (
    <View style={styles.container}>
      <View style={{height:'80%'}}>
      {view && <Image source={{ uri: view.imageURL }} style={{ width: 300, height: 450 }} />}
      </View>
      <View style={{padding: 15}}></View>
      <Text>{view.caption}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 15,
    textAlign: "center",
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: "contain"
  }
});