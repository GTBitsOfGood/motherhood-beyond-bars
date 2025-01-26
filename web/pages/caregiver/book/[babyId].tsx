import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Image from "next/image";

import {
  collection,
  doc,
  DocumentReference,
  query as doQuery,
  getDoc,
  getDocs,
  orderBy,
  Timestamp,
} from "firebase/firestore";

import { db } from "db/firebase";
import { getCurrentCaregiver } from "db/actions/caregiver/Caregiver";

import { Baby } from "@lib/types/baby";
import { decrypt, encrypt } from "@lib/utils/encryption";
import { monthIndexToString, numberFormatDate } from "@lib/utils/date";

import BabyModal from "@components/BabyBook/BabyModal";
import TitleTopBar from "@components/logos/TitleTopBar";
import Dropdown from "@components/atoms/Dropdown";

import SmileIcon from "@components/Icons/SmileIcon";
import PlusIcon from "@components/Icons/PlusIcon";

export default function BabyBook({
  babyBook,
  totImages,
  baby,
  babyLinks,
  mediaFormSigned,
}: Props) {
  const router = useRouter();

  const [showBabyModal, setShowBabyModal] = useState<boolean>(false);
  const [babyPhoto, setBabyPhoto] = useState<File | string>("");
  const [photoDescription, setPhotoDescription] = useState<string>("");
  const [mediaReleaseChecked, setMediaReleaseChecked] =
    useState<boolean>(false);
  const [photoId, setPhotoId] = useState<string>("");
  const [editBabyPhoto, setEditBabyPhoto] = useState<boolean>(false);

  const [photos, setPhotos] = useState<BabyBookYear[]>(babyBook);
  const [totalImages, setTotalImages] = useState<number>(totImages);

  useEffect(() => {
    setPhotos(babyBook);
  }, [router.query.babyId]);

  return (
    <div className="w-full h-screen">
      <TitleTopBar title="Baby Book" />
      {showBabyModal ? (
        babyPhoto && (
          <BabyModal
            image={babyPhoto}
            description={photoDescription}
            editing={editBabyPhoto}
            photoId={photoId}
            mediaReleaseChecked={mediaReleaseChecked}
            mediaFormSigned={mediaFormSigned}
            babyId={baby.id}
            caregiverId={baby.caregiverId}
            showBabyModal={setShowBabyModal}
            setPhotos={setPhotos}
            setTotalImages={setTotalImages}
          />
        )
      ) : (
        <div className="flex flex-col py-6 sm:py-15 px-4 sm:px-10 items-center gap-[1.125rem] w-full h-[85%]">
          <div className="self-start">
            <h1 className="text-2xl sm:text-3xl font-bold text-primary-text">
              {baby.firstName} {baby.lastName}
              {baby.lastName[baby.lastName.length - 1] === "s"
                ? "'"
                : "'s"}{" "}
              Album
            </h1>
            <p className="text-dark-gray sm:text-xl">
              Birthday: {baby.birthday}
            </p>
            {babyLinks.length > 0 && (
              // TODO add styles so looks like Figma
              <Dropdown
                label=""
                options={babyLinks.map(({ firstName, lastName, url }) => ({
                  label: `${firstName} ${lastName}`,
                  value: url,
                }))}
                onChange={(opt) => {
                  router.push(opt.value);
                }}
                value={`${baby.firstName} ${baby.lastName}`}
              />
            )}
          </div>
          {totalImages === 0 ? (
            <div className="flex flex-col w-full self-center items-center gap-2 p-8 pt-[10%] h-full">
              <div className="rounded-full w-[160px] h-[160px] flex items-center justify-center bg-[#F2F2F2]">
                <SmileIcon />
              </div>
              <p className="text-lg sm:text-2xl font-bold text-dark-gray">
                No Photos Yet
              </p>
              <p className="sm:text-xl text-center text-dark-gray">
                Get started by adding a photo of {baby.firstName} here!
              </p>
              <img
                src="/SwirlArrow.svg"
                className="absolute right-20 bottom-20"
              ></img>
            </div>
          ) : (
            photos.flatMap(({ year, months }) => {
              return months.map(({ month, images }) => (
                <div
                  key={`${year}${month}`}
                  className="flex flex-col self-stretch"
                >
                  <h2 className="sm:text-lg font-semibold text-dark-gray">
                    {monthIndexToString(month)} {year}
                  </h2>
                  <div className="grid grid-cols-4 gap-[0.375rem] md:gap-x-4 md:gap-y-2">
                    {images.map(({ imageURL, date, caption, mediaRelease, photoId }) => (
                      <>
                        <div
                          key={imageURL}
                          className="h-[160px] md:h-[240px] overflow-hidden relative shadow-lg cursor-pointer"
                          onClick={() => {
                            setBabyPhoto(imageURL);
                            setPhotoDescription(caption);
                            setMediaReleaseChecked(mediaRelease ?? false);
                            setPhotoId(photoId);
                            setShowBabyModal(true);
                            setEditBabyPhoto(false);
                          }}
                        >
                          <Image
                            key={imageURL}
                            src={imageURL}
                            alt={`Baby image from ${new Date(date.seconds * 1000).toLocaleDateString()}`}
                            layout={"fill"}
                            objectFit={"cover"}
                          />
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              ));
            })
          )}
          <label
            className="flex items-center justify-center fixed cursor-pointer rounded-full w-[3.75rem] h-[3.75rem] bottom-6 right-6 bg-mbb-pink"
            title="Upload Photo"
            aria-roledescription="input"
          >
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const files = e.target.files;

                if (files) {
                  setBabyPhoto(files[files.length - 1]);
                  setPhotoDescription("");
                  setMediaReleaseChecked(false);
                  setPhotoId("");
                  setShowBabyModal(true);
                  setEditBabyPhoto(true);
                } else {
                  // TODO show error
                }
              }}
            />
            <PlusIcon />
          </label>
        </div>
      )}
    </div>
  );
}

interface Props {
  babyBook: BabyBookYear[];
  babyLinks: { url: string; firstName: string; lastName: string }[];
  totImages: number;
  baby: {
    firstName: string;
    lastName: string;
    mother: string;
    birthday: string;
    id: string;
    caregiverId: string;
  };
  mediaFormSigned: boolean;
}

export interface BabyBookYear {
  year: number;
  months: BabyBookMonth[];
}

export interface BabyBookMonth {
  month: number;
  images: BabyImage[];
}

export interface BabyImage {
  caption: string;
  date: {
    seconds: number;
    nanoseconds: number;
  };
  imageURL: string;
  mediaRelease?: boolean;
  photoId: string;
}

interface RawBabyImage {
  caption: string;
  date: Timestamp;
  imageURL: string;
  caregiverID: DocumentReference;
  mediaRelease?: boolean;
}

export const getServerSideProps: GetServerSideProps<
  Props,
  { babyId?: string }
> = async (context) => {
  const { params, query } = context;
  const props: Props = {
    babyBook: [],
    totImages: 0,
    babyLinks: [],
    baby: {
      firstName: "",
      lastName: "",
      mother: "",
      birthday: "",
      id: "",
      caregiverId: "",
    },
    mediaFormSigned: false,
  };

  const caregiver = await getCurrentCaregiver(context);
  if (!params || !params.babyId || !query.iv) return { props };
  if (!caregiver) return { props };

  for (const waiver of caregiver.signedWaivers) {
    if (waiver.waiverName === "Media Release" && waiver.agreedToWaiver) {
      props.mediaFormSigned = true;
      break;
    }
  }

  const babyId = decrypt({ iv: query.iv as string, content: params.babyId });

  const babyRef = doc(db, "babies", babyId);
  const baby = await getDoc(babyRef);
  const babyData = baby.data() as Baby;

  props.baby = {
    firstName: babyData.firstName,
    lastName: babyData.lastName,
    mother: babyData.motherName,
    birthday: !(babyData.dob instanceof Timestamp)
      ? ((babyData.dob as string) ?? "")
      : numberFormatDate(babyData.dob.toDate()),
    id: babyId,
    caregiverId: babyData.caretakerID,
  };

  props.babyLinks = (caregiver.babies as Baby[])
    .filter((baby) => baby.id !== props.baby.id)
    .map((baby) => {
      const { iv, content } = encrypt(baby.id);

      return {
        url: `/caregiver/book/${content}?iv=${iv}`,
        firstName: baby.firstName,
        lastName: baby.lastName,
      };
    });

  const babyBookRef = doQuery(
    collection(db, `babies/${babyId}/book`),
    orderBy("date", "desc")
  );

  const babyBookDocs = await getDocs(babyBookRef);
  babyBookDocs.docs.forEach((book) => {
    props.totImages = props.totImages + 1;
    const raw = book.data() as RawBabyImage;
    const date = raw.date.toDate();

    if (!raw.imageURL) return;

    const currYear = date.getFullYear();
    if (
      props.babyBook.length < 1 ||
      props.babyBook[props.babyBook.length - 1].year !== currYear
    )
      props.babyBook.push({ year: currYear, months: [] });
    const year = props.babyBook[props.babyBook.length - 1];

    const currMonth = date.getMonth();
    if (
      year.months.length < 1 ||
      year.months[year.months.length - 1].month !== currMonth
    )
      year.months.push({ month: currMonth, images: [] });
    year.months[year.months.length - 1].images.push({
      caption: raw.caption || "",
      imageURL: raw.imageURL,
      date: {
        seconds: raw.date.seconds,
        nanoseconds: raw.date.nanoseconds,
      },
      mediaRelease: raw.mediaRelease ?? false,
      photoId: book.id,
    });
  });

  return {
    props,
  };
};
