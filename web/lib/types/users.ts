import { DocumentReference } from "firebase/firestore";
import { BrowserWaiver, Waiver } from "./common";
import { ItemRequest } from "./items";

export type Caregiver = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  numAdults: number;
  numChildren: number;
  agesOfChildren: string;
  signedWaivers: Waiver[];
  itemsRequested: ItemRequest;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  contact: string;
  babies: DocumentReference[];
  babyCount: number;
};

export type OnboardingFormData = Omit<
  Caregiver,
  | "id"
  | "email"
  | "password"
  | "firstName"
  | "lastName"
  | "phoneNumber"
  | "babies"
> & {
  saveAddress: boolean;
  waivers: {
    agreedToWaiver: boolean;
    agreedDate: Date;
    agreedSignature: string;
    waiver: BrowserWaiver;
  }[];
};
