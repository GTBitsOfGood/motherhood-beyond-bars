/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { Button, ColorSchemeName, Linking, Pressable } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import SignWaiver from "../screens/onboarding/SignWaiver";
import LoginScreen from "../screens/LoginScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import {
  OnboardingParamList,
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import { UserContext, UserContextType } from "../providers";
import { useContext } from "react";
import GetStartedScreen from "../screens/onboarding/GetStartedScreen";
import LogoutButton from "../components/app/LogoutButton";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import InfoScreen from "../screens/onboarding/InfoScreen";
import SupportScreen from "../screens/onboarding/RequestItemsScreen";
import { SettingsContext } from "../providers/settings";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const validateAuthData = (authData: UserContextType) => {
  // Determine if a user is ready to see the app yet, or if they still need to be onboarded
  return (
    authData?.uid && authData.caregiver?.address && authData.caregiver?.name
  );
};

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const authData = useContext(UserContext);
  const { settings } = useContext(SettingsContext);

  // TODO: add navigation items to this flow
  // The users should only have to complete onboarding if they're a new user.
  return (
    <Stack.Navigator>
      {validateAuthData(authData) ? (
        <>
          <Stack.Screen
            name="Root"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NotFound"
            component={NotFoundScreen}
            options={{ title: "Oops!" }}
          />
          <Stack.Group screenOptions={{ presentation: "modal" }}>
            <Stack.Screen name="Modal" component={ModalScreen} />
          </Stack.Group>
        </>
      ) : (
        <Stack.Screen
          name="Root"
          component={OnboardingNavigator}
          options={({ navigation }) => ({
            headerShown: true,
            title: "Welcome",
            headerRight: () => (
              <Button
                title="Logout"
                onPress={() => {
                  signOut(auth);
                }}
              />
            ),
            headerLeft: () => (
              <Button
                title="Call"
                onPress={() => {
                  Linking.openURL(`tel:${settings.contact.phone}`);
                }}
              />
            ),
          })}
        />
      )}
    </Stack.Navigator>
  );
}

const Onboarding = createNativeStackNavigator<OnboardingParamList>();

function OnboardingNavigator() {
  const authData = useContext(UserContext);

  return (
    <Onboarding.Navigator>
      {Boolean(authData) ? (
        <>
          <Onboarding.Screen
            name="RequestItems"
            options={{ title: "Request Items" }}
            component={SupportScreen}
          />
          <Onboarding.Screen
            name="GetStarted"
            options={{ headerShown: false }}
            component={GetStartedScreen}
          />
          <Onboarding.Screen
            name="SignWaiver"
            component={SignWaiver}
            options={{
              title: "Sign Waiver",
            }}
          />
          <Onboarding.Screen
            name="Info"
            component={InfoScreen}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <Onboarding.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      )}
    </Onboarding.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="TabOne"
        component={LoginScreen}
        options={({ navigation }: RootTabScreenProps<"TabOne">) => ({
          title: "Tab One",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Modal")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: "Tab Two",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
