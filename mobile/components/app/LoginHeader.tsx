import React from "react";
import { View } from "react-native";
import CreateAccountSVG from "../../assets/images/createaccount";
import HeartSVG from "../../assets/images/heart";

const LoginHeader = () => {
  return (
    <View>
        <CreateAccountSVG 
            style={{
                height: 168,
            }}
        />
        <HeartSVG
            style={{
                position: 'absolute',
                height: 168,
                left: '41%',
                top: '42%'
            }}
        />
    </View>
  );
};

export default LoginHeader;
