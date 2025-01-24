import Button from "@components/atoms/Button";
import PictureArray from "@components/BabyBook/PictureArray";
import PictureModal from "@components/BabyBook/PictureModal";
import SideBar from "@components/BabyBook/Sidebar";
import TopBar from "@components/BabyBook/Topbar";
import DownloadIcon from "@components/Icons/DownloadIcon";
import XIcon from "@components/Icons/XIcon";
import { useMap } from "@lib/hooks/useMap";
import { Baby } from "@lib/types/baby";
import { decrypt } from "@lib/utils/encryption";
import { db } from "db/firebase";
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
import { GetServerSideProps } from "next";
import { useState } from "react";

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
            <div className="flex items-center gap-[1.125rem]">
              <XIcon
                onClick={() => {
                  selectedForDownload.clear();
                }}
              />
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
                const ids = Array.from(selectedForDownload.entries()).map(
                  ([, img]) => img.id
                );

                const a = document.createElement("a");
                a.href = `/api/download-selected?content=${content}&iv=${iv}&ids=${encodeURIComponent(ids.join(","))}`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
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
  id: string;
  caption: string;
  date: {
    seconds: number;
    nanoseconds: number;
  };
  imageUrl: string;
  caregiverId: string;
  mediaRelease?: boolean;
}

interface RawBabyImage {
  caption: string;
  date: Timestamp;
  imageURL: string;
  caregiverID: DocumentReference;
  mediaRelease: boolean;
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
      id: book.id,
      caption: raw.caption || "",
      imageUrl: raw.imageURL,
      caregiverId: raw.caregiverID?.id || "",
      date: {
        seconds: raw.date.seconds,
        nanoseconds: raw.date.nanoseconds,
      },
      mediaRelease: raw.mediaRelease ?? false,
    });
  });

  return {
    props,
  };
};
