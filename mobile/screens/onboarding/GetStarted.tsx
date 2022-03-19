import { View } from "../../components/Themed";
import { Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { OnboardingStackScreenProps } from "../../types";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../../providers/User";
import SignWaiver from "./SignWaiver";
import { getWaivers } from "../../lib/getWaivers";

export default function GetStarted({
  navigation,
}: OnboardingStackScreenProps<"GetStarted">) {
  const authData = useContext(UserContext);

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Let's get started</Text>
        <Text style={styles.description}>
            Motherhood Beyond Bars is here to provide whole family support for mothers, infants, and caregivers like yourself!
        </Text>
        <Text style={styles.description}>
            Before we get started, we'll need to collect some information to best meet your needs. If you have any questions, please email us at <Text style={{fontWeight: 'bold'}}>info@motherhoodbeyond.org</Text> or call us at <Text style={{fontWeight: 'bold'}}>678-404-1397</Text>.
        </Text>

        <View style={{paddingTop: 36}}>
            <TouchableOpacity style={styles.button} onPress={async () => {
                navigation.navigate("HouseholdInfo");
            }}>
            <Text style={styles.buttonText}>Next</Text>
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