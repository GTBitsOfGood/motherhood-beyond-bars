import React from "react";
import { View, Text } from "react-native";
import Alert from "../../assets/images/alert";

const RequiredField = () => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 8 }}>
      <Alert />
      <Text style={{ paddingLeft: 10, color: "#FF3939" }}>
        This field is required
      </Text>
    </View>
  );
};

export default RequiredField;
