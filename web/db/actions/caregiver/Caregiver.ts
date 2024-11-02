import { GetServerSidePropsContext } from "next";
import { getAuth } from "firebase-admin/auth";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "db/firebase";

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
      const caregiver = caregiverQuery.docs[0].data();

      for (let i = 0; i < caregiver.babies.length; i++) {
        const baby = await getDoc(caregiver.babies[i]);
        const babyData: Array<object> = baby.data() as object[];
        caregiver.babies[i] = { ...babyData, id: caregiver.babies[i].id };
      }

      return caregiver;
    }
  }

  return null;
}
