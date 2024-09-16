import { DocumentReference } from "firebase/firestore";
import { Waiver } from "./common";
import { ItemRequest } from "./items";

export type Account = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
};

export type Caregiver = Account & {
  id: string;
  numAdults: number | undefined;
  numChildren: number | undefined;
  agesChildren: string | undefined;
  signedWaivers: Waiver[];
  itemsRequested: ItemRequest;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  contact: string;
  babies: DocumentReference[];
};

export type OnboardingFormData = Omit<
  Caregiver,
  | "bbChecked"
  | "spsChecked"
  | "csChecked"
  | "bcChecked"
  | "id"
  | "email"
  | "password"
  | "firstName"
  | "lastName"
  | "phoneNumber"
  | "babies"
> & {
  saveAddress: boolean;
};