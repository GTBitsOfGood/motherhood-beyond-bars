// pages/api/saveImage.js
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../db/firebase"; // Firestore database
import { doc, setDoc, Timestamp } from "firebase/firestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Extracting the necessary data from the request body
    const { imageURL, caregiverID, caption, babyID } = req.body;

    try {
      // Create a reference to the document in the 'babies' collection and save metadata
      const docRef = doc(
        db,
        "babies",
        babyID,
        "book",
        `${caregiverID}_${Date.now()}`
      );
      await setDoc(docRef, {
        imageUrl: imageURL,
        caption: caption,
        date: Timestamp.now(),
        caregiverId: caregiverID,
      });

      res.status(200).json({ message: "Image metadata saved successfully" });
    } catch (error) {
      console.error("Error saving image metadata:", error);
      res.status(500).json({ error: "Error saving image metadata" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
