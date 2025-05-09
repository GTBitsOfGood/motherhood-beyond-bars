import { BABIES_TAB, CAREGIVERS_TAB } from "@lib/utils/consts";
import {
  DocumentData,
  QueryDocumentSnapshot,
  Timestamp,
} from "firebase/firestore";

export interface User {
  name: string;
  email: string;
  // add more
}

export interface Waiver {
  content: string;
  id?: string;
  description: string;
  lastUpdated: string | Timestamp;
  name: string;
  order: number;
  onboarding: boolean;
}

export type BrowserWaiver = Omit<Waiver, "lastUpdated"> & {
  lastUpdated: string;
  caregiverName?: string;
};

export type WaiverHeader = {
  waiverName: string;
  agreedToWaiver: boolean;
  agreedDate: string;
  agreedSignature: string;
};

export type AuthFormValues = {
  email: string;
  password: string;
};

export interface PaginationInfoType {
  pageNumber: number;
  startAfter: QueryDocumentSnapshot<DocumentData>;
}

export type PaginationReferencesType = Map<
  number,
  QueryDocumentSnapshot<DocumentData>
>;

export type TabType = typeof BABIES_TAB | typeof CAREGIVERS_TAB;
