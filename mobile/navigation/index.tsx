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

import {
  Button,
  ColorSchemeName,
  Linking,
  Pressable,
  View,
  Text,
} from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import SignWaiver from "../screens/onboarding/SignWaiver";
import LoginScreen from "../screens/LoginScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import {
  BookParamList,
  OnboardingParamList,
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import { UserContext, UserContextType } from "../providers/User";
import { useContext } from "react";

import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import InfoScreen from "../screens/onboarding/InfoScreen";
import RequestItems from "../screens/onboarding/RequestItems";
import ShippingAddress from "../screens/onboarding/ShippingAddress";
import BestContact from "../screens/onboarding/BestContact";
import AllDone from "../screens/onboarding/AllDone";

import { SettingsContext } from "../providers/settings";
import SupportScreen from "../screens/onboarding/RequestItemsScreen";
import BabyBookAccess from "../screens/babybook/BabyBookAccess";
import BabyBook from "../screens/babybook/BabyBook";
import StartBook from "../screens/babybook/StartBook";
import SelectPicture from "../screens/babybook/SelectPicture";

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
  console.log("caregiver", authData?.caregiver, Date.now());

  console
    .log
    // authData?.uid, // && authData.caregiver?.name
    // authData?.caregiver?.signedWaivers
    // authData.caregiver?.address &&
    // authData.caregiver?.city &&
    // authData.caregiver?.state &&
    // authData.caregiver?.zipCode &&
    // authData.caregiver?.itemsRequested &&
    // authData.caregiver?.contact
    ();

  return (
    authData?.uid && // && authData.caregiver?.name
    authData.caregiver?.signedWaivers &&
    authData.caregiver?.address &&
    authData.caregiver?.city &&
    authData.caregiver?.state &&
    authData.caregiver?.zipCode &&
    authData.caregiver?.itemsRequested &&
    authData.caregiver?.contact
  );
};

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const authData = useContext(UserContext);
  const { contact } = useContext(SettingsContext);

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
                  Linking.openURL(`tel:${contact.phone}`);
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
          {
            <Onboarding.Screen
              name="SignWaiver"
              component={SignWaiver}
              options={{
                headerTitle: () => (
                  // add progress bar/circles and styling here
                  <View>
                    <Text>Step 2</Text>
                  </View>
                ),
              }}
            />
          }
          {
            <Onboarding.Screen
              name="Info"
              component={InfoScreen}
              options={{ headerShown: false }}
            />
          }
          {
            <Onboarding.Screen
              name="RequestItems"
              component={RequestItems}
              options={{
                headerTitle: () => (
                  // add progress bar/circles and styling here
                  <View>
                    <Text>Step 3</Text>
                  </View>
                ),
              }}
            />
          }
          {
            <Onboarding.Screen
              name="ShippingAddress"
              component={ShippingAddress}
              options={{
                headerTitle: () => (
                  // add progress bar/circles and styling here
                  <View>
                    <Text>Step 4</Text>
                  </View>
                ),
              }}
            />
          }
          {
            <Onboarding.Screen
              name="BestContact"
              component={BestContact}
              options={{
                headerTitle: () => (
                  // add progress bar/circles and styling here
                  <View>
                    <Text>Step 5</Text>
                  </View>
                ),
              }}
            />
          }
          <Onboarding.Screen
            name="AllDone"
            component={AllDone}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
        <Onboarding.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        </>
      )}
    </Onboarding.Navigator>
  );
} 

const Book = createNativeStackNavigator<BookParamList>();

function BookNavigator() {
  return (
    <Book.Navigator>
      {
        <>
          {/*
            <Book.Screen
              name="BabyBookAccess"
              component={BabyBookAccess}
              options={{
                headerTitle: () => (
                  // add progress bar/circles and styling here
                  <View>
                    <Text>Baby Book Access</Text>
                  </View>
                ),
              }}
            /> */
          }
          {
            <Book.Screen
              name="StartBook"
              component={StartBook}
              options={{
                headerTitle: () => (
                  // add progress bar/circles and styling here
                  <View>
                    <Text>Start A Baby Book</Text>
                  </View>
                ),
              }}
            />
          }
          {
            <Book.Screen
              name="SelectPicture"
              component={SelectPicture}
              options={{
                headerTitle: () => (
                  // add progress bar/circles and styling here
                  <View>
                    <Text>Picture and Caption</Text>
                  </View>
                ),
              }}
            />
          }
          {
            <Book.Screen
              name="BabyBook"
              component={BabyBook}
              options={{
                headerTitle: () => (
                  // add progress bar/circles and styling here
                  <View>
                    <Text>Baby Book</Text>
                  </View>
                ),
              }}
            />
          }
        </>
      }
    </Book.Navigator>
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
        component={BookNavigator}
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
