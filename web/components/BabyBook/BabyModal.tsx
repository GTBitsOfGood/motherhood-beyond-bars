import { useState, Dispatch, SetStateAction } from "react";
import { uploadPhoto } from "db/actions/caregiver/Photo";

import { BabyBookYear } from "pages/caregiver/book/[babyId]";

import TextInput from "@components/atoms/TextInput";
import Button from "@components/atoms/Button";

interface Props {
  image: File | string;
  description?: string;
  edit: boolean;
  caregiverId: string;
  babyId: string;
  showBabyModal: Dispatch<SetStateAction<boolean>>;
  setPhotos: Dispatch<SetStateAction<BabyBookYear[]>>;
  setTotalImages: Dispatch<SetStateAction<number>>;
}

// TODO add edit and delete button (ask Annie for designs if not already)
export default function BabyModal({
  image,
  description,
  edit,
  caregiverId,
  babyId,
  showBabyModal,
  setPhotos,
  setTotalImages,
}: Props) {
  const [newDescription, setNewDescription] = useState("");
  const [photo, setPhoto] = useState<string>(
    typeof image === "string" ? image : URL.createObjectURL(image)
  );
  const [photoFile, setPhotoFile] = useState<File | undefined>(
    typeof image === "object" ? image : undefined
  );

  return (
    <div className="flex flex-col w-full h-full items-center sm:flex-row">
      <div
        className={`relative w-full bg-image-gray sm:w-[55%] sm:h-full ${edit ? "flex justify-center items-center" : "flex justify-center h-[65%] sm:items-center"}`}
      >
        <div className="sm:flex sm:flex-col">
          <img
            src={photo}
            className={`sm:w-[21rem] sm:max-h-[30rem] ${edit ? "max-h-[22rem]" : "w-4/5 object-cover"}`}
          ></img>
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
        <div className="flex-col w-[20.625rem] h-[14.938rem] justify-start items-start mt-[1.313rem] gap-[1.313rem] inline-flex sm:w-[45%] sm:pl-12 sm:pr-12">
          <div className="self-stretch text-lg font-bold sm:text-2xl">
            Add a Description
          </div>
          <div className="w-full h-32">
            {/* TODO convert to text area */}
            <TextInput
              onChange={(event) => {
                setNewDescription(event);
              }}
              placeholder="How the baby is doing, what they did today, etc."
            ></TextInput>
          </div>
          {/* TODO add "Allow for Media Release checkbox" */}
          <Button
            text="Upload"
            onClick={async () => {
              if (photoFile) {
                const results = await uploadPhoto({
                  file: photoFile,
                  caption: newDescription,
                  babyId,
                  caregiverId,
                });

                if (results.success && !results.error) {
                  showBabyModal(false);
                  setTotalImages((prevTotal) => prevTotal + 1);
                  // Add baby photo to array
                  if (!("data" in results)) return;
                  const date = results.data.date.toDate();
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
                              images: [results.data],
                            },
                          ],
                        },
                      ];
                    }

                    const photos = [...prevPhotos];
                    if (photos[0].year === photoYear) {
                      if (photos[0].months[0].month === photoMonth) {
                        photos[0].months[0].images.unshift(results.data);
                      } else {
                        photos[0].months.unshift({
                          month: photoMonth,
                          images: [results.data],
                        });
                      }
                    } else {
                      photos.unshift({
                        year: photoYear,
                        months: [
                          {
                            month: photoMonth,
                            images: [results.data],
                          },
                        ],
                      });
                    }
                    return photos;
                  });
                } else {
                  // TODO show error
                }
              }
            }}
          />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center mx-7 my-7 sm:w-[40%] sm:text-2xl">
          <div className="sm:w-2/3">{description}</div>
        </div>
      )}
    </div>
  );
}
