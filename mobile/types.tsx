/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Timestamp } from "firebase/firestore";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type OnboardingStackScreenProps<
  Screen extends keyof OnboardingParamList
> = NativeStackScreenProps<OnboardingParamList, Screen>;

export type RootTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
  SignWaiver: undefined;
};

export type OnboardingParamList = {
  Login: undefined;
  GetStarted: undefined;
  Info: undefined;
  SignWaiver: {
    waiverStack: Waiver[];
    index: number;
  };
  RequestItems: undefined;
  ShippingAddress: undefined;
  BestContact: undefined;
  AllDone: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export interface Caregiver {
  name: string;
  id: string;
  signedWaivers: Waiver[];
  itemsRequested: Item[];
  address: string;
  city: string;
  state: string;
  zipCode: Number;
  contact: string;
}

export interface Waiver {
  content: string;
  id: string;
  description: string;
  lastUpdated: string;
  name: string;
}

export interface Item {
  name: string;
  fulfilled: Boolean;
  requestedOn: Timestamp;
  gender?: string;
  size?: number;
}
