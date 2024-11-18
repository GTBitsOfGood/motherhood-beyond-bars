<<<<<<< Updated upstream
=======
import { deleteDoc, doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
>>>>>>> Stashed changes
import { db, storage } from "../../firebase"; // import firebase storage
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc, Timestamp } from "firebase/firestore";

interface returnType {
  success: boolean;
  data?: { downloadURL: object };
  error?: string;
}

interface Props {
  file: File;
  caption: string;
  babyId: string;
  caregiverId: string;
}

interface PhotoPath {
  firestorePath: string; // Path to the Firestore document
  storagePath: string; // Path to the file in Firebase Storage
}

export async function uploadPhoto({
  file,
  caption,
  babyId,
  caregiverId,
}: Props) {
  try {
    const extension = file.name.split(".").pop();
    const storageRef = ref(storage, `images/${Date.now()}.${extension}`);

    return await uploadBytes(storageRef, file)
      .then(async (snapshot) => {
        const downloadURL = await getDownloadURL(snapshot.ref);

        // FIX populating baby book bc not working
        const docRef = doc(
          db,
          "babies",
          babyId,
          "book",
          `${caregiverId}_${Date.now()}`
        );

        // TODO fix logic so that caption is added after
        try {
          await setDoc(docRef, {
            imageUrl: downloadURL,
            caption: caption,
            date: Timestamp.now(),
            caregiverId: caregiverId,
          });
        } catch (error) {
          return { success: false, error: `Upload failed: ${error}` };
        }

        return { success: true, data: { downloadURL: downloadURL } };
      })
      .catch((error) => {
        return { success: false, error: `Upload failed: ${error}` };
      });
  } catch (error) {
    return { success: false, error: `Upload failed: ${error}` };
  }
}

export async function deletePhoto(
  babyId: string,
  docId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Retrieve the Firestore document
    const docRef = doc(db, "babies", babyId, "book", docId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return {
        success: false,
        error: `Document with ID ${docId} does not exist.`,
      };
    }

    // Extract the download URL from the Firestore document
    const { imageUrl } = docSnap.data();
    if (!imageUrl) {
      return {
        success: false,
        error: `Document with ID ${docId} does not contain an imageUrl.`,
      };
    }

    // Extract the storage path from the download URL
    const storagePath = extractStoragePathFromUrl(imageUrl);
    if (!storagePath) {
      return {
        success: false,
        error: "Failed to extract storage path from imageUrl.",
      };
    }

    // Delete the file from Firebase Storage
    const storageRef = ref(storage, storagePath);
    await deleteObject(storageRef);

    // Delete the Firestore document
    await deleteDoc(docRef);

    return { success: true };
  } catch (error: any) {
    console.error("Error deleting photo:", error);
    return { success: false, error: `Delete failed: ${error.message}` };
  }
}

function extractStoragePathFromUrl(downloadURL: string): string | null {
  try {
    const url = new URL(downloadURL); // Use URL parsing
    const path = url.pathname.split("/o/")[1]; // Split at `/o/` to get the encoded path
    return path ? decodeURIComponent(path) : null; // Decode the path
  } catch (error) {
    console.error("Error extracting storage path from URL:", error);
    return null;
  }
}

export async function deletePhotos(
  photoEntries: { babyId: string; docId: string }[]
): Promise<{
  success: boolean;
  results: { docId: string; success: boolean; error?: string }[];
}> {
  const results = [];

  for (const { babyId, docId } of photoEntries) {
    try {
      const response = await deletePhoto(babyId, docId);
      results.push({ docId, success: response.success, error: response.error });
    } catch (error: any) {
      results.push({
        docId,
        success: false,
        error: `Error deleting photo with ID ${docId}: ${error.message}`,
      });
    }
  }

  // Check overall success (true if all deletions succeed)
  const success = results.every((result) => result.success);

  return { success, results };
}
