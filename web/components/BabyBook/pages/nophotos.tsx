import UploadButton from "@components/BabyBook/UploadButton";

export default function NoPhotosScreen() {
  return (
    <div className="flex flex-col w-full h-3/4 mt-7 pl-5 pr-5">
      <div className="text-2xl font-bold">Jordan Jacob's Album</div>
      <div className="text-dark-gray text-base mt-1 mb-4">
        Birthday: 00/00/00
      </div>
      <div className="flex flex-col w-full items-center relative">
        <img src="/Ellipse.svg" className="sm:w-48"></img>
        <img src="/SadFace.svg" className="absolute top-9 sm:w-28"></img>
      </div>
      <div className="text-center text-dark-gray text-lg font-bold mt-5 mb-5 sm:mt-8 sm:mb-10">
        No Photos Yet
      </div>
      <div className="text-center">
        <span className="text-dark-gray text-base">
          Get started by adding a photo of Jordan here!
        </span>
      </div>
      <div className="flex flex-row justify-end mt-5 w-3/4">
        <img src="/SwirlArrow.svg" className="relative left-3"></img>
      </div>
      <UploadButton></UploadButton>
    </div>
  );
}
