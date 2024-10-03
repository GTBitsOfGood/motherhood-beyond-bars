import PictureArray from "@components/BabyBook/PictureArray";
import PictureModal from "@components/BabyBook/PictureModal";
import SideBar from "@components/BabyBook/Sidebar";
import TopBar from "@components/BabyBook/Topbar";
import { db } from "db/firebase";
import {
  collection,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  orderBy,
  query as doQuery,
  Timestamp,
} from "firebase/firestore";
import { GetServerSideProps } from "next";
import { Baby } from "@lib/types/baby";
import { useState } from "react";
import { decrypt } from "@lib/utils/encryption";
import SmileIcon from "@components/Icons/SmileIcon";
import PlusIcon from "@components/Icons/PlusIcon";
import { monthIndexToString } from "@lib/utils/date";
import Image from "next/image";

export default function BabyBook({
  babyBook,
  totImages,
  baby,
  content,
  iv,
}: Props) {
  return (
    <div className="flex flex-col my-6 md:my-15 mx-4 md:mx-10 items-center gap-[1.125rem] w-full">
      <div className="self-start">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary-text">
          {baby.firstName} {baby.lastName}
          {baby.lastName[baby.lastName.length - 1] === "s" ? "'" : "'s"} Album
        </h1>
        <p className="text-dark-gray">Birthday: {baby.birthday}</p>
      </div>
      {totImages === 0 ? (
        <>
          <div className="rounded-full w-[160px] h-[160px] flex items-center justify-center bg-[#F2F2F2]">
            <SmileIcon />
          </div>
          <p className="text-lg sm:text-2xl font-bold text-dark-gray">
            No Photos Yet
          </p>
          <p className="sm:text-xl text-center text-dark-gray">
            Get started by adding a photo of {baby.firstName} here!
          </p>
        </>
      ) : (
        babyBook.flatMap(({ year, months }) =>
          months.map(({ month, images }) => (
            <div key={`${year}${month}`} className="flex flex-col self-stretch">
              <h2 className="sm:text-lg font-medium text-dark-gray">
                {monthIndexToString(month)} {year}
              </h2>
              <div className="grid grid-cols-4 gap-[0.375rem] md:gap-x-4 md:gap-y-2">
                {images.map(({ imageUrl, date }) => (
                  <>
                    <div
                      key={imageUrl}
                      className="h-[160px] md:h-[240px] overflow-hidden relative shadow-lg cursor-pointer"
                      onClick={() => {
                        // TODO: view single image
                      }}
                    >
                      <Image
                        key={imageUrl}
                        src={imageUrl}
                        alt={`Baby image from ${new Date(date.seconds * 1000).toLocaleDateString()}`}
                        layout={"fill"}
                        objectFit={"cover"}
                      />
                    </div>
                  </>
                ))}
              </div>
            </div>
          ))
        )
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
            const imageFile = e.target.files?.[0];

            if (!imageFile) return;

            // TODO: Upload Image and description
          }}
        />
        <PlusIcon />
      </label>
    </div>
  );
}

interface Props {
  babyBook: BabyBookYear[];
  totImages: number;
  baby: {
    firstName: string;
    lastName: string;
    mother: string;
    birthday: string;
  };
  content: string;
  iv: string;
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
  imageUrl: string;
  caregiverId: string;
}

interface RawBabyImage {
  caption: string;
  date: Timestamp;
  imageURL: string;
  caregiverID: DocumentReference;
}

export const getServerSideProps: GetServerSideProps<
  Props,
  { babyId?: string }
> = async ({ params, query }) => {
  const props: Props = {
    babyBook: [],
    totImages: 0,
    baby: { firstName: "", lastName: "", mother: "", birthday: "" },
    content: "",
    iv: "",
  };

  if (!params || !params.babyId || !query.iv) return { props };

  props.content = params?.babyId as string;
  props.iv = query.iv as string;
  const babyId = decrypt({ iv: query.iv as string, content: params.babyId });

  const babyRef = doc(db, "babies", babyId);
  const baby = await getDoc(babyRef);
  const babyData = baby.data() as Baby;

  props.baby = {
    firstName: babyData.firstName,
    lastName: babyData.lastName,
    mother: babyData.motherName,
    birthday: babyData.dob.toString(),
  };
  const babyBookRef = doQuery(
    collection(db, `babies/${babyId}/book`),
    orderBy("date", "desc")
  );
  const babyBookDocs = await getDocs(babyBookRef);
  babyBookDocs.docs.forEach((book) => {
    props.totImages = props.totImages + 1;
    const raw = book.data() as RawBabyImage;
    const date = raw.date.toDate();

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
      imageUrl: raw.imageURL,
      caregiverId: raw.caregiverID?.id || "",
      date: {
        seconds: raw.date.seconds,
        nanoseconds: raw.date.nanoseconds,
      },
    });
  });

  return {
    props,
  };
};
