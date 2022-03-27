/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import BabyBookSVG from "../assets/images/babybook";
import ResourcesSVG from "../assets/images/resources";
import SettingsSVG from "../assets/images/settings";
import SupportSVG from "../assets/images/support";
import HeaderBackgroundSVG from "../assets/images/headerbackground";
import LogoutButton from "../components/app/LogoutButton";
import CircleBorder from "../components/app/CircleBorder";
import FilledCircle from "../components/app/FilledCircle";
import LoginHeader from "../components/app/LoginHeader";
import CreateAccountSVG from "../assets/images/createaccount";
import HeartSVG from "../assets/images/heart";

import { Button, ColorSchemeName, Linking, View, Text } from "react-native";

import useColorScheme from "../hooks/useColorScheme";

import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import SignWaiver from "../screens/onboarding/SignWaiver";
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
import BabyBookAccess from "../screens/babybook/BabyBookAccess";
import BabyBook from "../screens/babybook/BabyBook";
import StartBook from "../screens/babybook/StartBook";
import SelectPicture from "../screens/babybook/SelectPicture";
import RequestItemsScreen from "../screens/support/RequestItemsScreen";
import ReachOut from "../screens/support/ReachOut";
import Welcome from "../screens/onboarding/Welcome";
import CreateAccount from "../screens/onboarding/CreateAccount";
import CreatePassword from "../screens/onboarding/CreatePassword";
import GetStarted from "../screens/onboarding/GetStarted";
import Login from "../screens/onboarding/Login";
import RecoverPassword from "../screens/onboarding/RecoverPassword";
import HouseholdInfo from "../screens/onboarding/HouseholdInfo";

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
    authData?.uid &&
    // authData.caregiver?.firstName &&
    // authData.caregiver?.lastName &&
    // authData.caregiver?.phoneNumber &&
    // authData.caregiver?.email &&
    authData.caregiver?.numAdults &&
    authData.caregiver?.numChildren &&
    authData.caregiver?.agesOfChildren &&
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
            headerShown: false,
            title: "Welcome",
            headerRight: () =>
              !authData?.uid ? null : (
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
          {/* The user is signed in */}
          <Onboarding.Screen
            name="GetStarted"
            component={GetStarted}
            options={{
              header: () => <LoginHeader/>
            }}
          />
          <Onboarding.Screen
            name="HouseholdInfo"
            component={HouseholdInfo}
            options={{
              headerStyle: {
                backgroundColor: "#EBEDF8",
              },
              title: "",
              headerRight: () => (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ color: "#304CD1" }}>Step 1</Text>
                  <FilledCircle />
                  <CircleBorder />
                  <CircleBorder />
                  <CircleBorder />
                  <CircleBorder />
                </View>
              ),
            }}
          />
          <Onboarding.Screen
            name="SignWaiver"
            component={SignWaiver}
            options={{
              headerStyle: {
                backgroundColor: "#EBEDF8",
              },
              title: "",
              headerRight: () => (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ color: "#304CD1" }}>Step 2</Text>
                  <FilledCircle />
                  <FilledCircle />
                  <CircleBorder />
                  <CircleBorder />
                  <CircleBorder />
                </View>
              ),
            }}
          />
          <Onboarding.Screen
            name="RequestItems"
            component={RequestItems}
            options={{
              headerStyle: {
                backgroundColor: "#EBEDF8",
              },
              title: "",
              headerRight: () => (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ color: "#304CD1" }}>Step 3</Text>
                  <FilledCircle />
                  <FilledCircle />
                  <FilledCircle />
                  <CircleBorder />
                  <CircleBorder />
                </View>
              ),
            }}
          />
          <Onboarding.Screen
            name="ShippingAddress"
            component={ShippingAddress}
            options={{
              headerStyle: {
                backgroundColor: "#EBEDF8",
              },
              title: "",
              headerRight: () => (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ color: "#304CD1" }}>Step 4</Text>
                  <FilledCircle />
                  <FilledCircle />
                  <FilledCircle />
                  <FilledCircle />
                  <CircleBorder />
                </View>
              ),
            }}
          />
          <Onboarding.Screen
            name="BestContact"
            component={BestContact}
            options={{
              headerStyle: {
                backgroundColor: "#EBEDF8",
              },
              title: "",
              headerRight: () => (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ color: "#304CD1" }}>Step 5</Text>
                  <FilledCircle />
                  <FilledCircle />
                  <FilledCircle />
                  <FilledCircle />
                  <FilledCircle />
                </View>
              ),
            }}
          />
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
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
          />
          <Onboarding.Screen
            name="CreateAccount"
            component={CreateAccount}
            options={{
              header: () => <LoginHeader/>
            }}
          />
          <Onboarding.Screen
            name="CreatePassword"
            component={CreatePassword}
            options={({ navigation }) => ({
              // headerShown: false,
              // title: "Welcome",
              // headerRight: () =>
              //   !authData?.uid ? null : (
              //     <Button
              //       title="Logout"
              //       onPress={() => {
              //         signOut(auth);
              //       }}
              //     />
              //   ),
              // headerLeft: () => (
              //   <Button
              //     title="Call"
              //     onPress={() => {
              //       Linking.openURL(`tel:${contact.phone}`);
              //     }}
              //   />
              // ),
              header: () => 
              <View>
                <CreateAccountSVG 
                  style={{
                    position: 'relative',
                    height: 168,
                  }}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    position: 'absolute',
                    left: '7%',
                    top: '30%'
                  }}
                >
                  <AntDesign 
                    name="left" 
                    size={20} 
                    color="black" 
                  />
                  <View
                    style={{
                      right: '10%',
                      bottom: '10%'
                    }}
                  >
                    <Button
                      title="Back"
                      color="black"
                      onPress={() => {
                        navigation.goBack();
                      }}
                    />
                  </View>
                  <HeartSVG
                    style={{
                      position: 'absolute',
                      height: 168,
                      left: '185%',
                      top: '60%'
                    }}
                  />
                </View>
              </View>
            })}
          />
          <Onboarding.Screen
            name="Login"
            component={Login}
            options={{
              header: () => <LoginHeader/>
            }}
          />
          <Onboarding.Screen
            name="RecoverPassword"
            component={RecoverPassword}
            options={{
              header: () => <LoginHeader/>
            }}
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
      <>
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
        />
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
      </>
    </Book.Navigator>
  );
}

const Support = createNativeStackNavigator<SupportParamList>();

function SupportNavigator() {
  const colorScheme = useColorScheme();

  return (
    <Support.Navigator>
      <Support.Screen
        name="ReachOut"
        component={ReachOut}
        options={{
          headerShown: false,
        }}
      />
      <Support.Screen
        name="RequestItemsScreen"
        component={RequestItemsScreen}
        options={{
          headerTitle: () => (
            // add progress bar/circles and styling here
            <View></View>
          ),
          // headerShown: false,
        }}
      />
    </Support.Navigator>
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
        tabBarActiveTintColor: "#fff",
        tabBarStyle: {
          backgroundColor: "#000000",
        },
        headerBackground: () => <HeaderBackgroundSVG />,
        headerStyle: {
          backgroundColor: "transparent",
          height: 87,
        },
        headerTitleStyle: { color: "#fff" },
        headerRight: () => <LogoutButton />,
      }}
    >
      <BottomTab.Screen
        name="TabOne"
        component={BookNavigator}
        options={{
          title: "Baby Book",
          tabBarIcon: ({ focused }) => (
            <BabyBookSVG color={focused ? "#fff" : "#B2B2B2"} />
          ),
        }}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={SupportNavigator}
        options={{
          title: "MBB Support",
          tabBarIcon: ({ focused }) => (
            <SupportSVG color={focused ? "#fff" : "#B2B2B2"} />
          ),
        }}
      />
      <BottomTab.Screen
        name="TabThree"
        component={BookNavigator}
        options={{
          title: "Resources",
          tabBarIcon: ({ focused }) => (
            <ResourcesSVG color={focused ? "#fff" : "#B2B2B2"} />
          ),
        }}
      />
      <BottomTab.Screen
        name="TabFour"
        component={BookNavigator}
        options={{
          title: "Settings",
          tabBarIcon: ({ focused }) => (
            <SettingsSVG color={focused ? "#fff" : "#B2B2B2"} />
          ),
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
