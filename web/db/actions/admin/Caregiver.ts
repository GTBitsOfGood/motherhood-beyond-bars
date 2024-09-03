import {
  doc,
  deleteDoc,
  collection,
  getDoc,
  getDocs,
  query,
} from "firebase/firestore";

import { formatPhoneNumber } from "@lib/utils/contactInfo";
import { db } from "db/firebase";

import { CaregiverDisplay } from "pages/admin/caregivers";

export async function getCaregivers() {
  const itemsRef = query(collection(db, "caregivers"));
  const caregiverDocs = await getDocs(itemsRef);

  const caregivers: Partial<CaregiverDisplay>[] = [];

  // TODO update for multiple children
  caregiverDocs.forEach(async (doc) => {
    const data = doc.data();
    const child: any = data.baby ? (await getDoc(data.baby)).data() : null;
    caregivers.push({
      id: doc.id,
      name: data.firstName + " " + data.lastName,
      email: data.email || "N/A",
      phone: (data.phoneNumber && formatPhoneNumber(data.phoneNumber)) || "N/A",
      registeredDate: data.createdAt
        ? data.createdAt.toDate().toLocaleDateString()
        : null,
      assigned: child ? true : false,
      address: `${data.address}, ${
        data.apartment ? `${data.apartment}, ` : ""
      }${data.city}, ${data.state}`,
      prefferedCommunication: data.prefferedCommunication || "N/A",
      childName: child ? child.firstName + " " + child.lastName : null,
      houseHoldInfo: `${data.numAdults} adults, ${data.numChildren} children`,
      // liabilityWaiver: data.signedWaivers?.at(-1).id || null,
      liabilityWaiver: "",
    });
  });

  // TODO catch errors

  return caregivers;
}

export const deleteCaretaker = async (caretakerID: string) => {
  // TODO catch errors
  await deleteDoc(doc(db, "caregivers", caretakerID));
};
