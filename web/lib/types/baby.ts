import { Timestamp } from "firebase/firestore";

// TODO change DOB to Date
export interface Baby {
  firstName: string;
  lastName: string;
  id: string;
  createdAt: Timestamp;
  hospitalName: string;
  caretakerID: string;
  dob: string;
}

export interface Book {
  caption: string;
  caregiverID: string;
  date: Timestamp;
  imageURL: string;
}
