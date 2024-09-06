import { Timestamp } from "firebase/firestore";

export interface Item {
  name: string;
  gender?: string;
  size?: string;
}

export interface ItemRequest {
  created: Timestamp;
  updated: Timestamp;
  additionalComments: string[];
  status: string;
  items: Item[];
}
