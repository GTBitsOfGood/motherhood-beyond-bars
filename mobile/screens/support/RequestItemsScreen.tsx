import React, { useContext, useState } from "react";
import { Text, View } from "../../components/Themed";
import {
  StyleSheet,
  TextInput,
  ScrollView,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { db } from "../../config/firebase";
import { SupportStackScreenProps } from "../../types";
import { SettingsContext } from "../../providers/settings";
import {
  arrayUnion,
  doc,
  getDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { UserContext } from "../../providers/User";
import { ItemRequest } from "../../types";
import Checkbox from "../../components/app/Checkbox";

type Props = SupportStackScreenProps<"RequestItemsScreen">;

export default function SupportScreen({ navigation }: Props) {
  const settings = useContext(SettingsContext);

  const length = (settings.items?.length || 0) + 1;
  const authData = useContext(UserContext);
  const [itemsCount, setItemsCount] = useState<Array<boolean>>(
    Array(length).fill(false)
  );
  const [otherItems, setOtherItems] = useState<string>("");
  const [additionalComments, setAdditionalComments] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);

  const toggleItem = (index: number) => {
    const newItemsCount = [...itemsCount];
    newItemsCount[index] = !newItemsCount[index];
    setItemsCount(newItemsCount);
  };

  const requestItems = async () => {
    if (length === 0) {
      return;
    }

    const caregiverDoc: any = doc(db, "caregivers", authData?.uid as string);
    const caregiverData: any = (await getDoc(caregiverDoc)).data();
    const itemsRequested =
      settings.items
        ?.filter((_, index) => itemsCount[index])
        .map((item) => {
          return {
            name: item.itemDisplayName,
          };
        }) || [];

    if (otherItems) {
      itemsRequested?.push({
        name: "Other",
      });
    }

    console.log(itemsRequested)

    console.log(caregiverData)

    const req: ItemRequest = {
      created: caregiverData.itemsRequested
        ? caregiverData.itemsRequested.created
        : Timestamp.now(),
      updated: Timestamp.now(),
      additionalComments: caregiverData.itemsRequested.additionalComments
        ? [
            ...caregiverData.itemsRequested.additionalComments,
            additionalComments,
          ]
        : [`Additional Requests/Comments:${additionalComments}, Other items: ${otherItems}`],
      status: "Pending",
      items: caregiverData.itemsRequested.items
        ? [...caregiverData.itemsRequested.items, ...itemsRequested]
        : itemsRequested,
    };

    console.log(req)

    updateDoc(caregiverDoc, { itemsRequested: req });
    console.log('ok')
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
              item.onboarding ? null : (
                <View style={styles.item} key={idx}>
                  <View style={styles.checkboxContainer}>
                    <Checkbox
                      onPress={() => toggleItem(idx)}
                      checked={itemsCount[idx]}
                    />
                    <Text style={styles.itemHeader}>
                      {item.itemDisplayName}
                    </Text>
                  </View>
                  <Text style={styles.itemDescription}>
                    {item.itemDescription}
                  </Text>
                </View>
              )
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
                disabled={itemsCount.every(v => v === false) ? true : false}
                style={itemsCount.every(v => v === false) ? [styles.disabledButton, { width: 350 }] : [styles.button, { width: 350 }]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={itemsCount.every(v => v === false) ? styles.disabledButtonText : styles.buttonText}>Request</Text>
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
                <Text style={styles.title}>All done!</Text>
                <Text style={styles.subheader}>
                  Please expect a call from MBB soon to confirm your requested
                  supplies!
                </Text>
                <View style={{ alignItems: "center" }}>
                  <TouchableOpacity
                    style={[styles.button, { width: 350 }]}
                    onPress={() => {
                        requestItems();
                        setModalVisible(!modalVisible);
                        navigation.navigate("ReachOut");
                    }}
                  >
                    <Text style={styles.buttonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      <View style={modalVisible && styles.overlay} />
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
  disabledButton: {
    borderWidth: 1,
    borderColor: "#808080",
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
  disabledButtonText: {
    color: "#808080",
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
