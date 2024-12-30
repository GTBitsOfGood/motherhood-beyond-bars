import { GetServerSidePropsContext } from "next";
import { getAuth } from "firebase-admin/auth";
import {
  collection,
  DocumentReference,
  DocumentData,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "db/firebase";
import { Caregiver } from "@lib/types/users";
import { Baby } from "@lib/types/baby";

// ONLY use in getServerSideProps
export async function getCurrentCaregiver(context: GetServerSidePropsContext) {
  const { req } = context;

  if (!req.headers.cookie) {
    return null;
  }

  const token = req.headers.cookie
    .split("; ")
    .find((row) => row.startsWith("authToken="))
    ?.split("=")[1];

  if (!token) {
    return null;
  }

  const decodedToken = await getAuth().verifyIdToken(token);

  if (!decodedToken.isAdmin) {
    const caregiverQuery = await getDocs(
      query(collection(db, "caregivers"), where("auth", "==", decodedToken.uid))
    );

    if (!caregiverQuery.empty) {
      const caregiverData = caregiverQuery.docs[0].data() as Caregiver;
      const caregiver = {
        ...caregiverData,
        id: caregiverQuery.docs[0].id,
      };

      if ("createdAt" in caregiver) {
        delete caregiver.createdAt;
      }

      if (caregiver.babies) {
        for (let i = 0; i < caregiver.babies.length; i++) {
          const baby = await getDoc(
            caregiver.babies[i] as DocumentReference<DocumentData>
          );
          const babyData: Baby = baby.data() as Baby;
          caregiver.babies[i] = { ...babyData, id: caregiver.babies[i].id };
        }
      } else {
        caregiver.babies = [];
      }

      return caregiver;
    }
  }

  return null;
}
