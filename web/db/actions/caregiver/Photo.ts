import React from "react";
import { db, storage } from "../../firebase"; // import firebase storage
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc, Timestamp } from "firebase/firestore";

interface returnType {
  success: boolean;
  data?: { downloadURL: object };
  error?: string;
}

export function uploadPhoto(
  e: React.ChangeEvent<HTMLInputElement>
): returnType {
  const files = e.target.files;
  if (!files || files.length === 0) {
    return { success: false, error: "File attempted to be uploaded was empty" };
  }

  try {
    const file = files[0];

    const extension = file.name.split(".").pop();
    const storageRef = ref(storage, `images/${Date.now()}.${extension}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (error) => {
        return { success: false, error: `Upload failed: ${error}` };
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        // TODO: Incorporate baby and caregiver context
        // https://github.com/GTBitsOfGood/motherhood-beyond-bars/blob/_original/mobile/screens/babybook/SelectPicture.tsx#L28
        // TODO: Incorporate caption
        const metadata = {
          imageURL: downloadURL,
          caregiverID: "test-caregiverId",
          caption: "test-caption",
          babyID: "test-babyId",
        };

        const { imageURL, caregiverID, caption, babyID } = metadata;

        const docRef = doc(
          db,
          "babies",
          babyID,
          "book",
          `${caregiverID}_${Date.now()}`
        );

        // TODO fix logic os that caption is added after
        try {
          await setDoc(docRef, {
            imageUrl: imageURL,
            caption: caption,
            date: Timestamp.now(),
            caregiverId: caregiverID,
          });
        } catch (error) {
          return { success: false, error: `Upload failed: ${error}` };
        }

        return { success: true, data: { downloadURL: downloadURL } };
      }
    );

    return {
      success: false,
      error: `Upload failed: Something has gone wrong, please try again`,
    };
  } catch (error) {
    return { success: false, error: `Upload failed: ${error}` };
  }
}
