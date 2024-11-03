import { Timestamp } from "firebase/firestore";

export interface AdditionalInfoField {
  boxTitle: string;
  placeholder: string;
  value?: string;
}

export interface Item {
  id?: string; // Optional, since Firestore generates it
  title: string;
  description: string;
  onboardingOnly: boolean;
  additionalInfo?: AdditionalInfoField[];
  checked?: boolean;
}

export interface ItemRequest {
  created: Timestamp | null;
  updated: Timestamp | null;
  additionalComments: string[];
  status: string;
  items: Item[];
}
