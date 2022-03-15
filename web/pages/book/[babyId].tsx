import PictureArray from "@components/BabyBook/PictureArray";
import PictureModal from "@components/BabyBook/PictureModal";
import SideBar from "@components/BabyBook/Sidebar";
import TopBar from "@components/BabyBook/Topbar";
import { formatDate } from "@lib/date";
import { db } from "@lib/firebase";
import { collection, DocumentReference, getDocs, orderBy, query, Timestamp } from "firebase/firestore";
import { GetServerSideProps } from "next";
import { useState } from "react";

export default function BabyBook({ babyId, babyBook }: Props) {
  const [isPictureSelected, setIsPictureSelected] = useState(false)
  return <div className="flex flex-col w-full h-full">
    <TopBar />
    <div className="flex grow-0 overflow-hidden">
      <SideBar babyBook={babyBook}/>
      <PictureArray babyBook={babyBook} />
      {isPictureSelected && <PictureModal />}
    </div>
    </div>;
}

interface Props {
  babyId?: string;
  babyBook: BabyBook;
}

export interface BabyBook {
  [year: string]: BabyBookMonths
}

export interface BabyBookMonths {
  [month: string] : BabyImage[]
}

export interface BabyImage {
  caption: string,
  date: string,
  imageUrl: string,
  caregiverId: DocumentReference,
}

interface RawBabyImage {
  caption: string,
  date: Timestamp,
  imageURL: string,
  caregiverID: DocumentReference,
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
}) => {
  const props = {
    babyId: params?.babyId as string,
    babyBook: {} as BabyBook
  }
  if (!params || !params.babyId) return { props }
  const babyBookRef = query(collection(db, `babies/${params.babyId}/book`), orderBy("date", "desc"));
  const babyBookDocs = await getDocs(babyBookRef);
  babyBookDocs.docs.forEach(book => {
    const raw = book.data() as RawBabyImage
    const date = raw.date.toDate();
    if (!props.babyBook[date.getFullYear()]) props.babyBook[date.getFullYear()] = {} as BabyBookMonths
    const year = props.babyBook[date.getFullYear()]
    if (!year[date.getMonth()]) year[date.getMonth()] = [] as BabyImage[]
    year[date.getMonth()].push({
      caption: raw.caption,
      imageUrl: raw.imageURL,
      caregiverId: raw.caregiverID,
      date: formatDate(raw.date.toString())
    })
  })

  return {
    props
  };
};
