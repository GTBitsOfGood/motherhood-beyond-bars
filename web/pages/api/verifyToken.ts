import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "firebase-admin/auth";
import { initializeApp, cert } from "firebase-admin/app";
import { getApps } from "firebase-admin/app";

// Initialize Firebase Admin SDK only once
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

// This API route verifies the token and checks the user role
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { token } = req.body; // Extract token from the request body

  if (!token) {
    return res.status(400).json({ error: "No token provided" });
  }

  try {
    // Verify the Firebase ID token
    const decodedToken = await getAuth().verifyIdToken(token);
    const isAdmin = decodedToken.admin || false;

    // Respond with user info and roles
    return res.status(200).json({ success: true, isAdmin });
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ error: "Invalid token" });
  }
}
