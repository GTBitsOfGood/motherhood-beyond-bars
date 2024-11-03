import { Timestamp } from "firebase/firestore";

export interface AdditionalInfoField {
  boxTitle: string;
  placeholder: string;
}

export interface Item {
  id?: string; // Optional, since Firestore generates it
  title: string;
  description: string;
  onboardingOnly: boolean;
  additionalInfo?: AdditionalInfoField[];
}

export interface ItemRequest {
  created: Timestamp;
  updated: Timestamp;
  additionalComments: string[];
  status: string;
  items: Item[];
}
