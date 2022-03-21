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
import { CollectionReference, Timestamp } from "firebase/firestore";

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

export type BookStackScreenProps<Screen extends keyof BookParamList> =
  NativeStackScreenProps<BookParamList, Screen>;

export type SupportStackScreenProps<Screen extends keyof SupportParamList> =
  NativeStackScreenProps<SupportParamList, Screen>;

export type RootTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
  TabThree: undefined;
  TabFour: undefined;
};

export type OnboardingParamList = {
  Welcome: undefined;
  CreateAccount: undefined;
  CreatePassword: {
    first: string;
    last: string;
    email: string;
    phone: string;
  };
  GetStarted: undefined;
  Login: undefined;
  RecoverPassword: undefined;
  HouseholdInfo: undefined;
  Info: undefined;
  SignWaiver: {
    unsignedWaivers: Waiver[] | undefined;
  };
  RequestItems: undefined;
  ShippingAddress: undefined;
  BestContact: undefined;
  AllDone: undefined;
};

export type SupportParamList = {
  ReachOut: undefined;
  RequestItemsScreen: undefined;
};

export type BookParamList = {
  BabyBookAccess: undefined;
  BabyBook: undefined;
  StartBook: undefined;
  SelectPicture: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export interface Caregiver {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  id: string;
  numAdults: string;
  numChildren: string;
  agesOfChildren: string;
  signedWaivers: Waiver[];
  itemsRequested: Item[];
  address: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  contact: string;
}

export interface Baby {
  name: string;
  id: string;
  caregiverEmail: string;
  caregiverID: string;
}

export interface Book {
  caption: string;
  caregiverID: string;
  date: Timestamp;
  imageURL: string;
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
