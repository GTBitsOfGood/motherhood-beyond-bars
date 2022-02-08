import { Timestamp } from "firebase/firestore";

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
}
