import { DocumentReference, Timestamp } from "firebase/firestore";

export interface Baby {
  id: string;
  firstName: string;
  lastName: string;
  createdAt: Timestamp;
  hospitalName: string;
  caretakerID: string;
  caretakerName: string;
  caretaker: DocumentReference;
  dob: Timestamp;
  sex: string;
  motherName: string;
  babyBook: string;
}

export interface Book {
  caption: string;
  caregiverID: string;
  date: Timestamp;
  imageURL: string;
}
