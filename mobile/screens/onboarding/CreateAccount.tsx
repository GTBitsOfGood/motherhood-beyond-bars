import { View } from "../../components/Themed";
import { Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { OnboardingStackScreenProps } from "../../types";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../../providers/User";

export default function CreateAccount({
  navigation,
}: OnboardingStackScreenProps<"CreateAccount">) {
  const authData = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create your account</Text>
      <Text style={styles.description}>First Name</Text>
      <TextInput style={styles.input}></TextInput>
      <Text style={styles.description}>Last Name</Text>
      <TextInput style={styles.input}></TextInput>
      <Text style={styles.description}>Email</Text>
      <TextInput style={styles.input}></TextInput>
      <Text style={styles.description}>Phone Number</Text>
      <TextInput style={styles.input}></TextInput>
      <View style={{paddingTop: 36}}>
        <TouchableOpacity style={styles.button} onPress={() => {
            navigation.navigate("CreatePassword")
          }}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center', paddingTop: 63}}>
        <Text style={{fontSize: 14}}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{color: '#304CD1'}}>
                Log in.
            </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    paddingBottom: 6,
  },
  description: {
    paddingTop: 12,
    fontSize: 14,
    paddingBottom: 8,
  },
  input: {
    backgroundColor: '#FAFBFC', 
    height: 44, 
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: 4,
    width: '100%'
  },
  button: {
    borderWidth:1,
    borderColor:"#304CD1",
    alignItems:'center',
    justifyContent:'center',
    height:50,
    backgroundColor:'#fff',
    borderRadius: 5,
  },
  buttonText: {
    color: "#304CD1",
    padding: 10,
    fontWeight: "500",
    fontSize: 16,
  }
});