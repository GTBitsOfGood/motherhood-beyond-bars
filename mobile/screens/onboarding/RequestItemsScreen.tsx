import React, { useContext, useState } from "react";
import { Text, View } from "../../components/Themed";
import {
  Button,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import { functions } from "../../config/firebase";
import { getFunctions, httpsCallable } from "firebase/functions";
import { OnboardingStackScreenProps } from "../../types";
import { Ionicons } from "@expo/vector-icons";
import { SettingsContext } from "../../providers/settings";
import mbbAxios from "../../api/api_axios";
import { auth } from "../../config/firebase";

type Props = OnboardingStackScreenProps<"RequestItems">;

function MyCheckbox({
  onPress,
  checked,
}: {
  onPress: () => void;
  checked: boolean;
}) {
  return (
    <Pressable
      style={[styles.checkboxBase, checked && styles.checkboxChecked]}
      onPress={onPress}
    >
      {checked && <Ionicons name="checkmark" size={15} color="white" />}
    </Pressable>
  );
}

export default function SupportScreen({ navigation }: Props) {
  const settings = useContext(SettingsContext);

  const length = (settings.items?.length || 0) + 1;

  const [itemsCount, setItemsCount] = useState<Array<boolean>>(
    Array(length).fill(false)
  );
  const [otherItems, setOtherItems] = useState<string>("");
  const [additionalComments, setAdditionalComments] = useState<string>("");

  const toggleItem = (index: number) => {
    const newItemsCount = [...itemsCount];
    newItemsCount[index] = !newItemsCount[index];
    setItemsCount(newItemsCount);
  };

  const requestItems = async () => {
    if (length === 0) {
      return;
    }

    const items = settings.items
      ?.filter((_, index) => itemsCount[index])
      .map((item) => {
        return {
          ...item,
          itemQuantity: 1,
        };
      });

    if (otherItems) {
      items?.push(
        {
          itemName: "other",
          itemDisplayName: otherItems,
          itemQuantity: 1,
          itemDescription: "",
        },
        {
          itemName: "additionalComments",
          itemDisplayName: additionalComments,
          itemQuantity: 1,
          itemDescription: "",
        }
      );
    }

    try {
      console.log(items);
      await httpsCallable(functions, "items")({ items });
    } catch (error) {
      alert("Unable to request items. Please try again later");
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Request Items</Text>
        <Text style={styles.subheader}>
          Motherhood Beyond Bars will deliver you supplies, so you're ready for
          the child!
        </Text>
        {settings.items?.map((item, idx) => (
          <View style={styles.item} key={idx}>
            <View style={styles.checkboxContainer}>
              <MyCheckbox
                onPress={() => toggleItem(idx)}
                checked={itemsCount[idx]}
              />
              <Text style={styles.itemHeader}>{item.itemDisplayName}</Text>
            </View>
            <Text style={styles.itemDescription}>{item.itemDescription}</Text>
          </View>
        ))}
        <View style={styles.item}>
          <View style={styles.checkboxContainer}>
            <MyCheckbox
              onPress={() => toggleItem(length - 1)}
              checked={itemsCount[length - 1]}
            />
            <Text style={styles.itemHeader}>Other</Text>
          </View>
          <TextInput
            style={[styles.input, styles.otherInput]}
            placeholder="Enter items"
            placeholderTextColor="#666666"
            placeholderMarginLeft="20"
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
          placeholderMarginLeft="20"
          multiline
          value={additionalComments}
          onChangeText={setAdditionalComments}
        />
        <View style={styles.button}>
          <Button title="Request" onPress={requestItems} color="#304CD1" />
        </View>
        <Text style={styles.footer}>
          Expect a call from us to confirm the order details!
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    height: 45,
    alignItems: "center",
    borderColor: "#304CD1",
    borderRadius: 4,
    paddingTop: 3,
  },
  container: {
    flex: 1,
    padding: 30,
    flexDirection: "column",
    backgroundColor: "#E5E5E5",
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
  checkboxBase: {
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#304CD1",
    backgroundColor: "transparent",
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: "#304CD1",
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
