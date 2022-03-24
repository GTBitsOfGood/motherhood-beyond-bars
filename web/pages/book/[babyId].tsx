import PictureArray from "@components/BabyBook/PictureArray";
import PictureModal from "@components/BabyBook/PictureModal";
import SideBar from "@components/BabyBook/Sidebar";
import TopBar from "@components/BabyBook/Topbar";
import { db } from "@lib/firebase";
import { collection, DocumentReference, getDocs, orderBy, query, Timestamp } from "firebase/firestore";
import { GetServerSideProps } from "next";
import { useState } from "react";

export default function BabyBook({ babyId, babyBook, totImages }: Props) {
  const [isPictureSelected, setIsPictureSelected] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState<BabyImage>()
  const selectImage = (i: number, j: number, k: number) => {
    setIsPictureSelected(true)
    setSelectedImage(babyBook[i].months[j].images[k])
  }
  const deselectImage = () => {
    setIsPictureSelected(false)
  }
  return <div className="flex flex-col w-full h-full">
    <TopBar number={totImages}/>
    <div className="relative flex grow-0 overflow-hidden">
      <SideBar babyBook={babyBook}/>
      <PictureArray babyBook={babyBook} select={selectImage}/>
      {isPictureSelected && <PictureModal image={selectedImage} deselect={deselectImage}/>}
    </div>
    </div>;
}

interface Props {
  babyId?: string;
  babyBook: BabyBookYear[];
  totImages: number
}

export interface BabyBookYear {
  year: number
  months: BabyBookMonth[]
}

export interface BabyBookMonth {
  month: number
  images : BabyImage[]
}

export interface BabyImage {
  caption: string,
  date: {
    seconds: number,
    nanoseconds: number
  },
  imageUrl: string,
  caregiverId: string,
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
    babyBook: [] as BabyBookYear[],
    totImages: 0
  }
  if (!params || !params.babyId) return { props }
  const babyBookRef = query(collection(db, `babies/${params.babyId}/book`), orderBy("date", "desc"));
  const babyBookDocs = await getDocs(babyBookRef);
  babyBookDocs.docs.forEach(book => {
    props.totImages = props.totImages + 1
    const raw = book.data() as RawBabyImage
    const date = raw.date.toDate();

    const currYear = date.getFullYear()
    if (props.babyBook.length < 1 || props.babyBook[props.babyBook.length-1].year !== currYear) props.babyBook.push({ year: currYear, months: [] })
    const year = props.babyBook[props.babyBook.length-1]

    const currMonth = date.getMonth()
    if (year.months.length < 1 || year.months[year.months.length-1].month !== currMonth) year.months.push({ month: currMonth, images: []})
    year.months[year.months.length-1].images.push({
      caption: raw.caption || '',
      imageUrl: raw.imageURL,
      caregiverId: raw.caregiverID?.id || '',
      date: {
        seconds: raw.date.seconds,
        nanoseconds: raw.date.nanoseconds
      }
    })
  })

  return {
    props
  };
};
