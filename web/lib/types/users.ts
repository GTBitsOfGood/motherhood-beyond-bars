import { DocumentReference, DocumentData } from "firebase/firestore";
import { BrowserWaiver, WaiverHeader } from "./common";
import { ItemRequest } from "./items";
import { Baby } from "./baby";

export type Caregiver = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  numAdults: number;
  numChildren: number;
  agesOfChildren: string;
  signedWaivers: WaiverHeader[];
  itemsRequested: ItemRequest;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  contact: string;
  babies: DocumentReference<DocumentData>[] | Baby[];
  babyCount: number;
  auth: string;
  onboarding: boolean;
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
