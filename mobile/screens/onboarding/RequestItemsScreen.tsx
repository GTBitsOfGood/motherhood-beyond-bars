import React, { useState } from "react";
import { Text, View } from "../../components/Themed";
import { Button, StyleSheet, Pressable, TextInput, ScrollView } from "react-native";
import { OnboardingStackScreenProps } from "../../types";
import { Ionicons } from "@expo/vector-icons";

type Props = OnboardingStackScreenProps<"SupportScreen">;

function MyCheckbox() {
  const [checked, onChange] = useState(false);

  function onCheckmarkPress() {
    onChange(!checked);
  }

  return (
    <Pressable
      style={[styles.checkboxBase, checked && styles.checkboxChecked]}
      onPress={onCheckmarkPress}>
      {checked && <Ionicons name="checkmark" size={15} color="white" />}
    </Pressable>
  );
}

export default function SupportScreen({ navigation }: Props) {
  return (
    <ScrollView>
      <View style={styles.container}>
          <Text style={styles.title}>Request Items</Text>
          <Text style={styles.subheader}>Motherhood Beyond Bars will deliver you supplies, so you're ready for the child!</Text>
          <View style={styles.item}>
            <View style={styles.checkboxContainer}>
                <MyCheckbox />
                <Text style={styles.itemHeader}>Diapers</Text>
            </View>
            <Text style={styles.itemDescription}>144 diapers something something</Text>
          </View>
          <View style={styles.item}>
            <View style={styles.checkboxContainer}>
              <MyCheckbox />
              <Text style={styles.itemHeader}>Baby Formula</Text>
            </View>
            <Text style={styles.itemDescription}>Good tasty formula mm</Text>
          </View>
          <View style={styles.item}>
            <View style={styles.checkboxContainer}>
                <MyCheckbox />
                <Text style={styles.itemHeader}>Baby Clothing</Text>
            </View>
            <Text style={styles.itemDescription}>5 baby outfits</Text>
          </View>
          <View style={styles.item}>
            <View style={styles.checkboxContainer}>
              <MyCheckbox />
              <Text style={styles.itemHeader}>Other</Text>
            </View>
            <TextInput
              style={[styles.input, styles.otherInput]}
              placeholder="Enter items"
              placeholderTextColor='#666666'
              placeholderMarginLeft='20'
            />
          </View>
          <Text style={styles.additionalText}>Additional requests or comments</Text>
          <TextInput
              style={[styles.input, styles.additionalInput]}
              placeholder="Specific item dimensions, shipping directions, etc."
              placeholderTextColor='#666666'
              placeholderMarginLeft='20'
              multiline
            />
          <View style={styles.button}>
            <Button
              title="Request"
              onPress={() => {
                /*TODO implement request item functionality*/
              }}
              color='#304CD1'
            />
          </View>
          <Text style={styles.footer}>Expect a call from us to confirm the order details!</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    height: 45,
    alignItems: 'center',
    borderColor: '#304CD1',
    borderRadius: 4,
    paddingTop: 3
  },
  container: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    backgroundColor: '#E5E5E5',
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    
  },
  subheader: {
    fontSize: 16,
    marginBottom: 24
  },
  additionalText: {
    fontSize: 16,
    marginTop: 6,
    marginBottom: 8
  },
  item: {
    justifyContent: 'space-between',
    borderRadius: 4,
    shadowColor: '#47507b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    backgroundColor: 'white',
    marginBottom: 18,
  },
  itemHeader: {
    fontSize: 16,
    fontWeight: "bold",
    width: '100%'
  },
  itemDescription: {
    fontSize: 16,
    color: '#666666',
    marginLeft: 40,
    marginBottom: 12,
    marginRight: 16
  },
  checkboxBase: {
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#304CD1',
    backgroundColor: 'transparent',
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: '#304CD1'
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginLeft: 16,
    marginBottom: 8
  },
  input: {
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 4,
    backgroundColor: '#FAFBFC',
    paddingLeft: 8,
    fontSize: 16,
  },
  otherInput: {
    width: 263,
    height: 44,
    marginLeft: 40,
    marginBottom: 18,
  },
  additionalInput: {
    height: 197,
    marginBottom: 36,
    flexGrow: 1,
    paddingTop: 10
  },
  footer: {
    fontSize: 14,
    color: '#666666',
    marginTop: 8,
    marginBottom: 27,
    textAlign: 'center'
  }
});
