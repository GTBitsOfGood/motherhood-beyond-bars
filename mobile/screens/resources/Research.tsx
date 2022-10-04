import React, { useEffect, useState } from "react";
import { View, Text, Button, Linking, StyleSheet, Pressable, Image } from "react-native";
import { ResourcesStackScreenProps } from "../../types";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import ConstructionSVG from "../../assets/images/construction";

export default function Research({
  navigation,
}: ResourcesStackScreenProps<"Research">) {
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  let linkCount = link.length;

  useEffect(() => {
    let ignore = false;
    getDoc(doc(db, "resources/research")).then((doc) => {
      if (!ignore) {
        setDescription(doc?.data()?.markdown);
        setLink(doc?.data()?.url);
      }
    });

    return () => {
      ignore = true;
    };
  }, []);

  return (
    description.length > 0 ?
      <View style={{ height: '100%', flexDirection: "column", padding: 20 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 24, fontWeight: "bold", fontFamily: "Open Sans", paddingBottom: 15 }}>Research</Text>
          <Text style={{ fontSize: 16, fontFamily: "Open Sans" }}>
            General Description:
          </Text>
          <Text style={{ fontSize: 16, fontFamily: "Open Sans", paddingBottom: 15 }}>
            {description}
          </Text>
          <Text style={{ fontSize: 16, fontFamily: "Open Sans", paddingBottom: 15 }}>
            If you are interested in helping aid our research, chect out
            <Text style={{ color: '#304CD1' }}
              onPress={() => Linking.openURL(link[0].toString())}> {link[0]} </Text>
            or click the button below to direct you to our research page.
          </Text>
        </View>
        {linkCount === 1 ?
          <View>
            <Pressable
              onPress={() => {
                Linking.openURL(link[0].toString())
              }}
              style={{
                alignSelf: "flex-end", alignItems: 'center', justifyContent: 'center', borderRadius: 4,
                borderWidth: 1, borderColor: '#304CD1', width: 327, height: 45
              }}
            >
              <Text style={{ fontSize: 16, color: '#304CD1' }}>
                Be a part of our research!
              </Text>
            </Pressable>
          </View> :
          <View style={{ flexDirection: 'column', height: '25%' }}>
            <View style={{ paddingBottom: 25 }}>
              <Pressable
                onPress={() => {
                  Linking.openURL(link[1].toString())
                }}
                style={{
                  alignSelf: "flex-end", alignItems: 'center', justifyContent: 'center', borderRadius: 4,
                  borderWidth: 1, borderColor: '#304CD1', width: 327, height: 45
                }}
              >
                <Text style={{ fontSize: 16, color: '#304CD1' }}>
                  Click for more info
                </Text>
              </Pressable>
            </View>
            <View>
              <Pressable
                onPress={() => {
                  Linking.openURL(link[0].toString())
                }}
                style={{
                  alignSelf: "flex-end", alignItems: 'center', justifyContent: 'center', borderRadius: 4,
                  borderWidth: 1, borderColor: '#304CD1', width: 327, height: 45
                }}
              >
                <Text style={{ fontSize: 16, color: '#304CD1' }}>
                  Be a part of our research!
                </Text>
              </Pressable>
            </View>
          </View>
        }
      </View > :
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 30 }}>
        <View>
          <View style={{
            position: 'relative',
            width: 160,
            height: 160,
            borderRadius: 80,
            backgroundColor: '#E5E5E5',
          }} />
          <ConstructionSVG style={{ flex: 1, position: 'absolute', alignSelf: 'center', margin: 30 }} />
        </View>
        <View>
          <Text style={{ color: '#666666', fontFamily: "Open Sans", fontSize: 18, fontWeight: 'bold', textAlign: 'center', paddingBottom: 10, paddingTop: 25 }}>
            Coming Soon!
          </Text>
          <Text style={{ color: '#666666', fontFamily: "Open Sans", fontSize: 16, textAlign: 'center' }}>
            At the time, we haven't added any resources here. Check back soon!
          </Text>
        </View>
      </View>
  );
}