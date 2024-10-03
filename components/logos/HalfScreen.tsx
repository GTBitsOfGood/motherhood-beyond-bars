import BackButton from "@components/atoms/BackButton";

interface Props {
  caregiver?: boolean;
  backButtonFunction?: (value: any) => void;
  hiddenOnMobile?: boolean;
}

export default function HalfScreen({
  caregiver = false,
  backButtonFunction = undefined,
  hiddenOnMobile = false,
}: Props) {
  return (
    <div
      className={`${hiddenOnMobile ? "hidden sm:flex" : "flex"} flex-col bg-custom-background w-full h-[20%] justify-center items-center sm:w-1/2 sm:h-full`}
    >
      {backButtonFunction && (
        <div className="flex sm:hidden flex-start w-[90%] mt-2 -mb-5">
          <BackButton darkerColor={true} onClick={backButtonFunction} />
        </div>
      )}
      <div className="flex flex-row relative w-full h-[40%] justify-center sm:w-[17%] sm:h-[13%] sm:mb-[5%]">
        <img
          src="/MBBLogo.svg"
          className="shrink-0 stroke-[2.1px] object-contain sm:stroke-[3px]"
        ></img>
      </div>
      <div className="flex flex-col w-full justify-center items-center shrink-0 text-white text-center font-opensans tracking-wide">
        <p className="hidden sm:flex font-bold uppercase text-3xl sm:text-4xl">
          Motherhood <br /> Beyond bars
        </p>
        {caregiver && (
          <div className="font-semibold sm:font-normal text-xl sm:text-[2rem] mt-2 sm:mt-4">
            Caregiver
          </div>
        )}
      </div>
    </div>
  );
}
