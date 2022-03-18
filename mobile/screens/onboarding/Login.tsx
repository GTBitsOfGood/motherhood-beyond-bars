import { View } from "../../components/Themed";
import { Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { OnboardingStackScreenProps } from "../../types";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../../providers/User";

export default function Login({
  navigation,
}: OnboardingStackScreenProps<"Login">) {
  const authData = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log in</Text>
      <Text style={styles.description}>Email or Phone Number</Text>
      <TextInput style={styles.input}></TextInput>
      <Text style={styles.description}>Password</Text>
      <TextInput style={styles.input /* make it specific for password */}></TextInput>
      <View style={{flexDirection: 'row', justifyContent: 'flex-end', paddingTop: 9}}>
        <TouchableOpacity onPress={() => navigation.navigate("RecoverPassword")}>
            <Text style={{color: '#304CD1'}}>Forgot Password</Text>
        </TouchableOpacity>
      </View>
      <View style={{paddingTop: 36}}>
        <TouchableOpacity style={styles.button} onPress={() => {
            // should navigate to onboarding
          }}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center', paddingTop: 215.5}}>
        <Text style={{fontSize: 14}}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}>
            <Text style={{color: '#304CD1'}}>
                Sign Up.
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