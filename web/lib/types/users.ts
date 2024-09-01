import { Waiver } from "./common";
import { ItemRequest } from "./items";

export type Account = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
};

export interface Caregiver extends Account {
  id: string;
  numAdults: number;
  numChildren: number;
  signedWaivers: Waiver[];
  itemsRequested: ItemRequest;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  contact: string;
}
