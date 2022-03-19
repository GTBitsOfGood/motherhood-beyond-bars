import { View } from "../../components/Themed";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { OnboardingStackScreenProps } from "../../types";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../../providers/User";
import { getWaivers } from "../../lib/getWaivers";

export default function HouseholdInfo({
  navigation,
}: OnboardingStackScreenProps<"HouseholdInfo">) {
  const authData = useContext(UserContext);

  return (
    <View>
      <Text>Work In Progress</Text>
      <View style={{paddingTop: 36}}>
            <TouchableOpacity style={styles.button} onPress={async () => {
                navigation.push("SignWaiver", {
                  unsignedWaivers: await getWaivers(),
                });
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
