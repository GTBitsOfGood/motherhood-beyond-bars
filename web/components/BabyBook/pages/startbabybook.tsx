import Button from "@components/atoms/Button";

export default function StartBabyBookScreen() {
  return (
    <div className="flex flex-col w-full h-full items-center">
      <div className="flex flex-col bg-custom-background w-full h-20 justify-center items-center">
        <div className="flex flex-row w-full items-center">
          <button className="ml-7 h-3.5 w-[21px]">
            <img src="/HamburgerIcon.svg" />
          </button>
          <div className="flex-grow flex justify-center">
            <img src="/MBBLogo.svg" className="h-10" />
          </div>
          <div className="w-[21px] mr-7"></div>
        </div>
      </div>
      <div className="flex flex-col w-full h-1/2 mt-7 pl-5 pr-5">
        <div className="text-2xl font-bold">Start a Baby Book</div>
        <div className="text-base font-normal mt-7 mb-7">
          The Baby Book is a place where you can document the baby’s journey by
          uploading images and descriptions. Motherhood Behind Bars will then
          deliver the images to the mothers, so they can stay updated on their
          baby’s growth.
        </div>
        <Button text="Get Started"></Button>
      </div>
    </div>
  );
}
