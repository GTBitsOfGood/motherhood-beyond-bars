import React, { useContext } from "react";
import { storage } from "../../db/firebase"; // import firebase storage
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export const ImageUpload = ({}) => {
  const saveFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      const file = files[0];

      const extension = file.name.split(".").pop();
      const storageRef = ref(storage, `images/${Date.now()}.${extension}`);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.error("Upload failed:", error);
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
          const response = await fetch("/api/save-image", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(metadata),
          });
          if (!response.ok) {
            const result = await response.json();
            alert(result.error || "Error uploading image metadata");
          }
        }
      );
    } catch (error) {
      console.error("Upload failed:", error);
      alert("An error occurred while uploading the image.");
    }
  };
  return <input type="file" onChange={saveFile} />;
};
