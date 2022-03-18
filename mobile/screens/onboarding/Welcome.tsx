import { View } from "../../components/Themed";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { OnboardingStackScreenProps } from "../../types";
import React from "react";
import WelcomeSVG from "../../assets/images/welcome"
import HeartSVG from '../../assets/images/heart'
import { white } from "react-native-paper/lib/typescript/styles/colors";

export default function Welcome({
  navigation,
}: OnboardingStackScreenProps<"Welcome">) {

  return (
    <View style={styles.container}>
      <WelcomeSVG
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
      <View style={{alignItems: 'center', paddingTop: '40%', backgroundColor: 'transparent'}}>
        <HeartSVG/>
        <Text style={styles.title}>MOTHERHOOD{"\n"}BEYOND BARS</Text>
        <View style={{paddingBottom: 10, backgroundColor: 'transparent'}}>
          <TouchableOpacity style={[styles.button, {width: 350}]} onPress={() => {
              navigation.navigate("CreateAccount")
          }}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View style={{paddingBottom: 10, backgroundColor: 'transparent'}}>
          <TouchableOpacity style={[styles.button, {width: 350}]} onPress={() => {
              navigation.navigate("Login")
          }}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 20,
    paddingBottom: '50%',
    color: 'white',
  },
  button: {
    borderWidth:1,
    borderColor:"#fff",
    alignItems:'center',
    justifyContent:'center',
    height:50,
    backgroundColor:'transparent',
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    padding: 10,
    fontWeight: "500",
  }

});