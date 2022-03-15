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
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import TabThreeScreen from "../screens/TabThreeScreen";
import TabFourScreen from "../screens/TabFourScreen";
import {
  BookParamList,
  OnboardingParamList,
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
  SupportParamList,
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
import SupportScreen from "../screens/support/RequestItemsScreen";
import BabyBookAccess from "../screens/babybook/BabyBookAccess";
import BabyBook from "../screens/babybook/BabyBook";
import StartBook from "../screens/babybook/StartBook";
import SelectPicture from "../screens/babybook/SelectPicture";
import RequestItemsScreen from "../screens/support/RequestItemsScreen";
import ReachOut from "../screens/support/ReachOut";
import { blue100 } from "react-native-paper/lib/typescript/styles/colors";

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
              (!authData?.uid) ? null : <Button
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
          {/* The user is signed in */}
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
          {
            <Onboarding.Screen
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
            />
          }
          {
            <Onboarding.Screen
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
          {
            <Onboarding.Screen
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
            <Onboarding.Screen
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
          <Onboarding.Screen
            name="AllDone"
            component={AllDone}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          {/* The user is not signed in and needs to login */}
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
            /> */}
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

const Support = createNativeStackNavigator<SupportParamList>();

function SupportNavigator() {
  const colorScheme = useColorScheme();

  return (
    <Support.Navigator>
      {
        <Support.Screen
          name="ReachOut"
          component={ReachOut}
          options={{
            headerTitle: () => (
              // add progress bar/circles and styling here
              <View>
                <Text>Reach out to us!</Text>
              </View>
            ),
          }}
        />
      }
      {
        <Support.Screen
          name="RequestItemsScreen"
          component={RequestItemsScreen}
          options={{
            headerTitle: () => (
              // add progress bar/circles and styling here
              <View>
                <Text>Request Items</Text>
              </View>
            ),
          }}
        />
      }
    </Support.Navigator>
  )
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
        component={BookNavigator}
        options={{
          title: "Baby Book",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={SupportNavigator}
        options={{
          title: "MBB Support",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="TabThree"
        component={BookNavigator}
        options={{
          title: "Resources",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="TabFour"
        component={BookNavigator}
        options={{
          title: "Settings",
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
