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
import { useMap } from "@lib/hooks/useMap";
import Button from "@components/atoms/Button";
import DownloadIcon from "@components/Icons/DownloadIcon";

export default function BabyBook({
  babyBook,
  totImages,
  baby,
  content,
  iv,
}: Props) {
  const [isPictureSelected, setIsPictureSelected] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<BabyImage>();
  const [currIndexes, setCurrIndexes] = useState({ i: -1, j: -1, k: -1 });
  const selectedForDownload = useMap<string, BabyImage>();

  const selectImage = (i: number, j: number, k: number) => {
    setIsPictureSelected(true);
    setSelectedImage(babyBook[i].months[j].images[k]);
    setCurrIndexes({ i, j, k });
    selectedForDownload.clear();
  };

  const selectImageOffset = (
    i: number,
    j: number,
    k: number,
    forward: boolean
  ) => {
    const current = babyBook[i].months[j].images;
    k += forward ? 1 : -1;
    if (k === current.length || k < 0) {
      if (forward) {
        k = 0;
        j += 1;
      } else j -= 1;
      const currMonths = babyBook[i].months;
      if (j < 0 || j === currMonths.length) {
        if (forward) {
          j = 0;
          i += 1;
        } else {
          i -= 1;
          j = babyBook[i]?.months.length - 1;
          k = babyBook[i]?.months[j]?.images.length - 1;
        }
        if (i < 0 || i === babyBook.length) return;
      }
    }

    selectImage(i, j, k);
  };

  const deselectImage = () => {
    setIsPictureSelected(false);
  };

  console.log(
    selectedForDownload.size,
    Array.from(selectedForDownload.entries())
  );

  return (
    <div className="relative flex flex-col w-full h-full">
      <TopBar
        number={totImages}
        name={baby.name}
        motherName={baby.mother}
        content={content}
        iv={iv}
        isPictureSelected={isPictureSelected}
      />
      <div className="relative flex grow-0 overflow-hidden">
        <SideBar babyBook={babyBook} />
        <PictureArray
          babyBook={babyBook}
          select={selectImage}
          selectedForDownload={selectedForDownload}
        />
        {isPictureSelected && (
          <PictureModal
            image={selectedImage}
            selectImage={selectImageOffset}
            currentIndexs={currIndexes}
            deselect={deselectImage}
          />
        )}
        {selectedForDownload.size > 0 && (
          <div className="absolute w-[70vw] left-[50%] translate-x-[-50%] rounded shadow bottom-3.5 px-6 py-[1.125rem] flex justify-between bg-background">
            <div className="flex items-center gap-[18px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                className="cursor-pointer"
                onClick={() => {
                  selectedForDownload.clear();
                }}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.97474 6.97492C7.2384 6.71158 7.59583 6.56366 7.96849 6.56366C8.34115 6.56366 8.69856 6.71158 8.96224 6.97492L14.9997 13.0124L21.0372 6.97492C21.1661 6.83675 21.3213 6.72594 21.4938 6.64908C21.6663 6.57223 21.8525 6.5309 22.0413 6.52756C22.2301 6.52423 22.4176 6.55897 22.5927 6.62969C22.7679 6.70042 22.9269 6.80568 23.0604 6.93922C23.194 7.07276 23.2992 7.23183 23.3699 7.40692C23.4406 7.58203 23.4755 7.76958 23.4721 7.95839C23.4687 8.14723 23.4275 8.33343 23.3506 8.50593C23.2737 8.67843 23.1629 8.83368 23.0247 8.96242L16.9872 14.9999L23.0247 21.0374C23.1629 21.1662 23.2737 21.3215 23.3506 21.494C23.4275 21.6665 23.4687 21.8527 23.4721 22.0415C23.4755 22.2303 23.4406 22.4178 23.3699 22.5929C23.2992 22.768 23.194 22.927 23.0604 23.0605C22.9269 23.1942 22.7679 23.2994 22.5927 23.3701C22.4176 23.4408 22.2301 23.4757 22.0413 23.4723C21.8525 23.4689 21.6663 23.4277 21.4938 23.3508C21.3213 23.2739 21.1661 23.1631 21.0372 23.0249L14.9997 16.9874L8.96224 23.0249C8.69565 23.2734 8.34306 23.4085 7.97874 23.4022C7.61443 23.3956 7.26685 23.248 7.00918 22.9904C6.75154 22.7328 6.60396 22.3852 6.59753 22.0209C6.5911 21.6565 6.72634 21.304 6.97474 21.0374L13.0122 14.9999L6.97474 8.96242C6.7114 8.69876 6.56348 8.34133 6.56348 7.96867C6.56348 7.59601 6.7114 7.2386 6.97474 6.97492Z"
                  fill="#666666"
                />
              </svg>
              <p className="text-lg font-bold">
                {selectedForDownload.size} file
                {selectedForDownload.size > 1 ? "s" : ""} selected
              </p>
            </div>
            <Button
              icon={<DownloadIcon />}
              text="Download selected"
              width="auto"
              onClick={() => {
                // TODO: implement download only selected images in zip
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

interface Props {
  babyBook: BabyBookYear[];
  totImages: number;
  baby: {
    name: string;
    mother: string;
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

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
  query,
}) => {
  const props = {
    babyBook: [] as BabyBookYear[],
    totImages: 0,
    baby: { name: "", mother: "" },
    content: "",
    iv: "",
  };
  if (!params || !params.babyId || !query.iv) return { props };
  props.content = params?.babyId as string;
  props.iv = query.iv as string;
  const babyId = decrypt({
    content: params?.babyId as string,
    iv: query.iv as string,
  });

  const babyRef = doc(db, "babies", babyId as string);
  const baby = await getDoc(babyRef);
  const babyData = baby.data() as Baby;
  props.baby = {
    name: babyData.firstName + " " + babyData.lastName,
    mother: babyData.motherName,
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
