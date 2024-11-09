import { getAuth } from "firebase-admin/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "db/firebase"; // Import Firestore db from your firebase setup
import admin from "db/firebase/admin"; // Import initialized Firebase Admin SDK

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Ensure that Firebase Admin SDK is initialized
  admin.app();

  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ success: false, error: "Token is missing" });
  }

  try {
    // Verifying the token with Firebase Admin SDK
    const decodedToken = await getAuth().verifyIdToken(token);
    const caregiverId = decodedToken.uid;
    const userEmail = decodedToken.email;

    // Check if the user is an admin by looking at the Firestore whitelist
    const adminDoc = await getDoc(doc(db, "app", "admin"));
    let isAdmin = false;
    if (adminDoc.exists()) {
      const whitelist = adminDoc.data()?.whitelist || [];
      if (whitelist.includes(userEmail)) {
        isAdmin = true;
      }
    }
    let onboarding = false;
    if (!isAdmin) {
      const caregiverRef = doc(collection(db, "caregivers"), caregiverId);
      const caregiverDoc = await getDoc(caregiverRef);
      if (caregiverDoc && caregiverDoc.exists()) {
        const caregiver = caregiverDoc.data();
        onboarding = caregiver?.onboarding ?? false;
      }
    }

    // Return the caregiver ID and admin status
    return res.status(200).json({
      success: true,
      caregiverId: caregiverId,
      isAdmin: isAdmin, // Return the admin status based on Firestore
      onboarding: onboarding,
    });
  } catch (error) {
    return res.status(401).json({ success: false, error: "Invalid token" });
  }
}
