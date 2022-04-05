import { View } from "../../components/Themed";
import {
  Text,
  TextInput,
  StyleSheet,
  Modal,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { OnboardingStackScreenProps } from "../../types";
import React, { useContext, useState } from "react";
import { doc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";
import { UserContext } from "../../providers/User";
import { db } from "../../config/firebase";
import Checkbox from "../../components/app/Checkbox";

import { SettingsContext } from "../../providers/settings";
import ThumbsUpSVG from "../../assets/images/thumbsup";
import ThumbsDownSVG from "../../assets/images/thumbsdown";

export default function RequestedItems({
  navigation,
}: OnboardingStackScreenProps<"RequestItems">) {
  const settings = useContext(SettingsContext);

  const length = (settings.items?.length || 0) + 1;
  const authData = useContext(UserContext);
  const [itemsCount, setItemsCount] = useState<Array<boolean>>(
    Array(length).fill(false)
  );
  const [otherItems, setOtherItems] = useState<string>("");
  const [additionalComments, setAdditionalComments] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);
  const [gender, setGender] = useState("");
  const [size, setSize] = useState(-1);

  const toggleItem = (index: number) => {
    const newItemsCount = [...itemsCount];
    newItemsCount[index] = !newItemsCount[index];
    setItemsCount(newItemsCount);
  };

  const requestItems = async (wantCarSeat: Boolean) => {
    if (length === 0) {
      return;
    }

    const caregiverDoc = doc(db, "caregivers", authData?.uid as string);

    const itemsRequested =
      settings.items
        ?.filter((_, index) => itemsCount[index])
        .map((item) => {
          if (item.itemName === "carSeat") {
            wantCarSeat = false;
          }
          if (item.itemName === "clothing") {
            return {
              ...item,
              itemQuantity: 1,
              fulfilled: false,
              gender: gender,
              size: size,
              requestedOn: Timestamp.now(),
            };
          } else {
            return {
              ...item,
              itemQuantity: 1,
              fulfilled: false,
              requestedOn: Timestamp.now(),
            };
          }
        }) || [];

    if (wantCarSeat) {
      itemsRequested?.push({
        itemName: "carSeat",
        itemDisplayName: "Car Seat",
        itemQuantity: 1,
        itemDescription: "A necessity for transporting the baby",
        onboarding: true,
        fulfilled: false,
        requestedOn: Timestamp.now(),
      });
    }

    itemsRequested?.push({
      itemName: "beginBox",
      itemDisplayName: "Begin Box",
      itemQuantity: 1,
      itemDescription:
        "Clothing, blankets, bottles, pacifiers, bathing supplies, diapers, wipes, diaper cream, formula, burp cloths, and toys!",
      onboarding: true,
      fulfilled: false,
      requestedOn: Timestamp.now(),
    });

    if (otherItems) {
      itemsRequested?.push({
        itemName: "Other",
        itemDisplayName: otherItems,
        itemQuantity: 1,
        itemDescription: "",
        onboarding: true,
        fulfilled: false,
        requestedOn: Timestamp.now(),
      });
    }

    if (additionalComments) {
      itemsRequested?.push({
        itemName: "Additional Comments",
        itemDisplayName: additionalComments,
        itemQuantity: 1,
        itemDescription: "",
        onboarding: true,
        fulfilled: false,
        requestedOn: Timestamp.now(),
      });
    }

    updateDoc(caregiverDoc, { itemsRequested: arrayUnion(...itemsRequested) });
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.inner}>
            <Text style={styles.title}>Request Items</Text>
            <Text style={styles.subheader}>
              Motherhood Beyond Bars will deliver you supplies, so you're ready
              for the child!
            </Text>
            {settings.items?.map((item, idx) =>
              item.onboarding ? (
                <View style={styles.item} key={idx}>
                  <View style={styles.checkboxContainer}>
                    {item.itemName === "beginBox" ? (
                      <Checkbox checked={true} onPress={() => null} />
                    ) : (
                      <Checkbox
                        onPress={() => toggleItem(idx)}
                        checked={itemsCount[idx]}
                      />
                    )}
                    <Text style={styles.itemHeader}>
                      {item.itemDisplayName}
                    </Text>
                  </View>
                  <Text style={styles.itemDescription}>
                    {item.itemDescription}
                  </Text>
                  {item.itemName === "clothing" && itemsCount[idx] && (
                    <View>
                      <View
                        style={{
                          flexDirection: "row",
                          paddingLeft: 20,
                          paddingTop: 10,
                        }}
                      >
                        <Text style={styles.clothingtext}>Gender</Text>
                        <Text style={styles.clothingtext}>Clothing Size</Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          paddingLeft: 20,
                        }}
                      >
                        <TextInput
                          style={styles.clothinginput}
                          onChangeText={(gender) => {
                            setGender(gender);
                          }}
                        />
                        <TextInput
                          style={styles.clothinginput}
                          keyboardType="numeric"
                          onChangeText={(size) => {
                            setSize(Number(size));
                          }}
                        />
                      </View>
                    </View>
                  )}
                </View>
              ) : null
            )}
            <View style={styles.item}>
              <View style={styles.checkboxContainer}>
                <Checkbox
                  onPress={() => toggleItem(length - 1)}
                  checked={itemsCount[length - 1]}
                />
                <Text style={styles.itemHeader}>Other</Text>
              </View>
              <TextInput
                style={[styles.input, styles.otherInput]}
                placeholder="Enter items"
                placeholderTextColor="#666666"
                onChangeText={setOtherItems}
                value={otherItems}
              />
            </View>
            <Text style={styles.additionalText}>
              Additional requests or comments
            </Text>
            <TextInput
              style={[styles.input, styles.additionalInput]}
              placeholder="Specific item dimensions, shipping directions, etc."
              placeholderTextColor="#666666"
              multiline
              value={additionalComments}
              onChangeText={setAdditionalComments}
            />
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={[styles.button, { width: 350 }]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.buttonText}>Request</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.footer}>
              Expect a call from us to confirm the order details!
            </Text>

            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View
                style={{
                  padding: 20,
                  height: "30%",
                  marginTop: "auto",
                  justifyContent: "space-around",
                  borderRadius: 5,
                }}
              >
                <Text style={{ fontWeight: "bold", paddingBottom: 15 }}>
                  Do you have your own car seat?
                </Text>
                <Text style={{ paddingBottom: 20 }}>
                  Please confirm that you have a car seat suitable for the baby.
                  You won’t be able to take them home without it!
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ width: "50%" }}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        requestItems(false);
                        setModalVisible(!modalVisible);
                        navigation.navigate("ShippingAddress");
                      }}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <ThumbsUpSVG />
                        <Text style={styles.buttonText}>Yep, I do!</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={{ width: 10 }}></View>
                  <View style={{ width: "50%" }}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        requestItems(true);
                        setModalVisible(!modalVisible);
                        navigation.navigate("ShippingAddress");
                      }}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <ThumbsDownSVG />
                        <Text style={styles.buttonText}>No, I don't!</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
            <View style={modalVisible && styles.overlay} />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: "#304CD1",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  buttonText: {
    color: "#304CD1",
    padding: 10,
    fontWeight: "500",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  inner: {
    padding: 20,
    flex: 1,
    justifyContent: "flex-end",
  },
  overlay: {
    position: "absolute",
    width: "120%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.7)",
    opacity: 0.5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  subheader: {
    fontSize: 16,
    marginBottom: 24,
  },
  additionalText: {
    fontSize: 16,
    marginTop: 6,
    marginBottom: 8,
  },
  item: {
    justifyContent: "space-between",
    borderRadius: 4,
    shadowColor: "#47507b",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    backgroundColor: "white",
    marginBottom: 18,
  },
  itemHeader: {
    fontSize: 16,
    fontWeight: "bold",
    width: "100%",
  },
  itemDescription: {
    fontSize: 16,
    color: "#666666",
    marginLeft: 40,
    marginBottom: 12,
    marginRight: 16,
  },

  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    marginLeft: 16,
    marginBottom: 8,
  },
  clothingtext: {
    marginRight: 66,
    fontSize: 16,
  },
  clothinginput: {
    backgroundColor: "#FAFBFC",
    height: 30,
    borderColor: "#D9D9D9",
    borderWidth: 1,
    width: 126,
    marginRight: 12,
    paddingLeft: 4,
    marginBottom: 18,
    paddingRight: 12,
  },
  input: {
    alignSelf: "stretch",
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 4,
    backgroundColor: "#FAFBFC",
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
    paddingTop: 10,
  },
  footer: {
    fontSize: 14,
    color: "#666666",
    marginTop: 8,
    marginBottom: 27,
    textAlign: "center",
  },
});
