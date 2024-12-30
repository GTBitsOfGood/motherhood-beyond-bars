import { db, storage } from "../../firebase"; // import firebase storage
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc, Timestamp } from "firebase/firestore";

interface Props {
  file: File;
  caption: string;
  babyId: string;
  caregiverId: string;
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

        const docRef = doc(
          db,
          "babies",
          babyId,
          "book",
          `${caregiverId}_${Date.now()}`
        );

        try {
          await setDoc(docRef, {
            imageURL: downloadURL,
            caption: caption,
            date: Timestamp.now(),
            caregiverId: caregiverId,
          });
        } catch (error) {
          return { success: false, error: `Upload failed: ${error}` };
        }

        return {
          success: true,
          data: {
            imageURL: URL.createObjectURL(file),
            caption: caption,
            date: Timestamp.now(),
            caregiverId: caregiverId,
          },
        };
      })
      .catch((error) => {
        return { success: false, error: `Upload failed: ${error}` };
      });
  } catch (error) {
    return { success: false, error: `Upload failed: ${error}` };
  }
}
