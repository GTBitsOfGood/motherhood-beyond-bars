import { Timestamp } from "@firebase/firestore";
import { useState, Dispatch, SetStateAction } from "react";
import { uploadPhoto } from "db/actions/caregiver/Photo";

import { BabyBookYear } from "pages/caregiver/book/[babyId]";

import TextArea from "@components/atoms/TextArea";
import Button from "@components/atoms/Button";
import IconButton from "@components/atoms/IconButton";
import CheckboxText from "@components/molecules/CheckboxText";

import EditIcon from "@components/Icons/EditIcon";
import TrashCan from "@components/Icons/TrashCan";
import BackButton from "@components/atoms/BackButton";

interface Props {
  image: File | string;
  description?: string;
  editing: boolean;
  caregiverId: string;
  babyId: string;
  photoId: string;
  showBabyModal: Dispatch<SetStateAction<boolean>>;
  setPhotos: Dispatch<SetStateAction<BabyBookYear[]>>;
  setTotalImages: Dispatch<SetStateAction<number>>;
  isNew?: boolean;
  mediaReleaseChecked?: boolean; // Whether photo can be released to media
  mediaFormSigned?: boolean; // Whether the Caregiver signed the Media Release Form
}

export default function BabyModal({
  image,
  description,
  editing,
  caregiverId,
  babyId,
  photoId,
  showBabyModal,
  setPhotos,
  setTotalImages,
  mediaReleaseChecked = false, // Default to false if not provided
  mediaFormSigned = false, // Default to false if not provided
}: Props) {
  const [newDescription, setNewDescription] = useState(description);
  const [photo, setPhoto] = useState<string>(
    typeof image === "string" ? image : URL.createObjectURL(image)
  );
  const [photoFile, setPhotoFile] = useState<File | undefined>(
    typeof image === "object" ? image : undefined
  );
  const [mediaRelease, setMediaRelease] = useState(mediaReleaseChecked);
  const [edit, setEdit] = useState<boolean>(editing);

  // New if photo is a File object not a string
  const isNew = typeof image !== "string";

  // Add baby photo to array
  const updatePhotoArray = (data: {
    imageURL: string;
    caption: string;
    date: Timestamp;
    mediaRelease: boolean;
    photoId: string;
  }) => {
    const date = data.date.toDate();
    const photoYear = date.getFullYear();
    const photoMonth = date.getMonth();
    setPhotos((prevPhotos) => {
      if (!prevPhotos.length) {
        return [
          {
            year: photoYear,
            months: [
              {
                month: photoMonth,
                images: [data],
              },
            ],
          },
        ];
      }

      const photos = [...prevPhotos];
      if (photos[0].year === photoYear) {
        if (photos[0].months[0].month === photoMonth) {
          photos[0].months[0].images.unshift(data);
        } else {
          photos[0].months.unshift({
            month: photoMonth,
            images: [data],
          });
        }
      } else {
        photos.unshift({
          year: photoYear,
          months: [
            {
              month: photoMonth,
              images: [data],
            },
          ],
        });
      }
      return photos;
    });
  };

  // TODO fix mobile views
  return (
    <div className="flex flex-col w-full h-full items-center sm:flex-row">
      <div
        className={`relative w-full bg-image-gray sm:w-[55%] sm:h-full ${edit ? "flex justify-center items-center" : "flex justify-center h-[65%] sm:items-center"}`}
      >
        <div className="sm:flex sm:flex-col">
          <img
            src={photo}
            className={`sm:w-[21rem] sm:max-h-[30rem] ${edit ? "max-h-[22rem]" : "w-4/5 object-cover"}`}
          />
          {edit && (
            <label className="bg-primary-text/70 rounded-[999px] text-white text-sm font-semibold py-1 px-3 mt-5 self-end sm:static absolute bottom-3 right-3 cursor-pointer">
              <input
                className="hidden"
                type="file"
                onChange={(e) => {
                  const files = e.target.files;

                  if (files) {
                    const photoFile = files[files.length - 1];
                    setPhoto(URL.createObjectURL(photoFile));
                    setPhotoFile(photoFile);
                  } else {
                    // TODO show error
                  }
                }}
              />
              Replace Image
            </label>
          )}
        </div>
      </div>
      {edit ? (
        <div className="relative flex flex-col justify-center items-center h-screen sm:w-[45%]">
          <div className="absolute top-0 left-0 p-4">
            <BackButton onClick={() => showBabyModal(false)} />
          </div>
          <div className="relative flex-col w-full justify-center items-center mt-[1.313rem] gap-[1.313rem] inline-flex sm:pl-12 sm:pr-12">
            <div className="flex flex-row justify-between items-center w-full">
              <div className="self-stretch text-lg font-bold sm:text-2xl">
                Add a Description
              </div>
              {!isNew && (
                // TODO hook up trash to endpoint
                <IconButton icon={<TrashCan />} onClick={() => setEdit(true)} />
              )}
            </div>
            <TextArea
              onChange={(event) => {
                setNewDescription(event);
              }}
              placeholder="How the baby is doing, what they did today, etc."
              currentValue={description}
            />
            <div className="-mt-4 w-full">
              <Button
                text={isNew ? "Upload" : "Save"}
                onClick={async () => {
                  if (photoFile) {
                    const results = await uploadPhoto({
                      file: photoFile,
                      caption: newDescription ?? "",
                      babyId,
                      caregiverId,
                      mediaRelease, // Include the mediaRelease field
                    });

                    if (results.success && !results.error) {
                      showBabyModal(false);
                      setTotalImages((prevTotal) => prevTotal + 1);

                      if (!("data" in results)) return;

                      const resultsData = { ...results.data, mediaRelease };
                      updatePhotoArray(resultsData);
                    } else {
                      // TODO show error
                    }
                  }
                }}
              />
            </div>
            {mediaFormSigned && (
              <span className="font-medium self-end">
                <CheckboxText
                  value={mediaRelease}
                  label={"Allow for Media Release"}
                  onChange={() => setMediaRelease(!mediaRelease)}
                />
              </span>
            )}
          </div>
        </div>
      ) : (
        <div className="relative flex flex-col justify-center items-center h-screen sm:w-[45%] sm:text-2xl">
          <div className="absolute top-0 left-0 p-4">
            <BackButton onClick={() => showBabyModal(false)} />
          </div>
          <div className="relative flex flex-col py-8 px-16 w-full justify-center items-center text-center">
            <div className="absolute flex top-0 justify-end w-full pr-16">
              <IconButton icon={<EditIcon />} onClick={() => setEdit(true)} />
            </div>
            {description ? (
              <div className="text-primary-text text-2xl font-normal my-8">
                {description}
              </div>
            ) : (
              <div className="text-lg italic text-medium-gray font-normal my-8">
                No image description provided
              </div>
            )}
            {mediaRelease ? (
              <div className="absolute flex bottom-0 text-center text-medium-gray italic text-lg">
                Photo allowed for media release
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
