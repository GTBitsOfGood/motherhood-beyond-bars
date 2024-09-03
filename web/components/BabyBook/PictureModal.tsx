import DownloadIcon from "@components/Icons/DownloadIcon";
import LeftChevronIcon from "@components/Icons/LeftChevronIcon";
import RightChevronIcon from "@components/Icons/RightChevronIcon";
import { monthIndexToString } from "@lib/utils/date";
import { Timestamp } from "firebase/firestore";
import Image from "next/image";
import { BabyImage } from "pages/admin/book/[babyId]";
import { v4 } from "uuid";

const PictureModal = ({
  image,
  deselect,
  selectImage,
  currentIndexs,
}: Props) => {
  const downloadImage = async () => {
    if (image) {
      const a = document.createElement("a");
      a.href = `/api/download?imageUrl=${encodeURIComponent(
        image.imageUrl
      )}&name=${image.caption.length === 0 ? v4() : image.caption}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  if (image === undefined)
    return (
      <div className="absolute">
        No Image Found. There is probably an error.
      </div>
    );
  const date = new Timestamp(
    image.date.seconds,
    image.date.nanoseconds
  ).toDate();
  return (
    <div className="absolute flex flex-col align-center w-full h-full bg-white">
      <div className="flex mt-8 ml-8 text-highlight font-semibold">
        <div
          className="flex cursor-pointer items-center"
          onClick={() => deselect()}
        >
          <LeftChevronIcon />
          <p className="ml-2">Download</p>
        </div>
      </div>
      <div className="flex w-full justify-between flex-grow p-4">
        <div className="flex flex-grow items-center py-8 px-8 text-white">
          <button
            onClick={() =>
              selectImage(
                currentIndexs.i,
                currentIndexs.j,
                currentIndexs.k,
                false
              )
            }
            className="w-[60px] h-[60px] rounded-full flex justify-center items-center bg-dark-100"
          >
            <LeftChevronIcon />
          </button>
          <div className="relative flex-grow h-full">
            <Image src={image.imageUrl} layout={"fill"} objectFit={"contain"} />
          </div>
          <button
            onClick={() =>
              selectImage(
                currentIndexs.i,
                currentIndexs.j,
                currentIndexs.k,
                true
              )
            }
            className="w-[60px] h-[60px] rounded-full flex justify-center items-center bg-dark-100"
          >
            <RightChevronIcon />
          </button>
        </div>
        <div className="w-80 mx-4 flex-shrink-0">
          <h3 className="font-semibold text-2xl">
            {date && (
              <>
                {monthIndexToString(date.getMonth())} {date.getDate()},{" "}
                {date.getFullYear()}
              </>
            )}
          </h3>
          <p className="my-4">
            {image.caption === "" ? "No Caption" : image.caption}
          </p>
          <button
            onClick={downloadImage}
            className="rounded px-4 py-2 border border-highlight flex items-center text-highlight"
          >
            <DownloadIcon />
            <p className="ml-2">Download</p>
          </button>
        </div>
      </div>
    </div>
  );
};

interface Props {
  image: BabyImage | undefined;
  deselect: () => void;
  selectImage: (
    arg0: number,
    arg1: number,
    arg2: number,
    arg3: boolean
  ) => void;
  currentIndexs: {
    i: number;
    j: number;
    k: number;
  };
}

export default PictureModal;
