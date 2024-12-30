import UploadButton from "@components/BabyBook/UploadButton";

export default function CurrentBabyBookScreen() {
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
      <div className="flex flex-col w-full h-3/4 mt-7 pl-5 pr-5">
        <div className="text-2xl font-bold mb-6">Current Baby Books</div>
        <div className="flex flex-col w-full h-full sm:flex-wrap sm:pl-11 sm:pr-20 sm:gap-10">
          <button className="h-[4.625rem] px-4 py-2 bg-white rounded border border-mbb-pink justify-start items-center inline-flex mb-6 sm:w-1/2 sm:h-32">
            <div className="w-[9.75rem] h-[2.875rem] relative sm:w-64 sm:ml-4 sm:mb-2">
              <div className="w-[9.563rem] left-[0.188rem] top-0 absolute text-mbb-pink text-base font-bold text-left sm:text-[1.375rem]">
                Jordan Jacob
              </div>
              <div className="left-0 top-[27px] absolute text-dark-gray text-sm sm:text-xl sm:mt-1">
                Birthday: 00/00/00
              </div>
            </div>
          </button>
          <button className="h-[4.625rem] px-4 py-2 bg-white rounded border border-mbb-pink justify-start items-center inline-flex mb-6 sm:w-1/2 sm:h-32">
            <div className="w-[9.75rem] h-[2.875rem] relative sm:w-64 sm:ml-4 sm:mb-2">
              <div className="w-[9.563rem] left-[0.188rem] top-0 absolute text-mbb-pink text-base font-bold text-left sm:text-[1.375rem]">
                Jordan Jacob
              </div>
              <div className="left-0 top-[27px] absolute text-dark-gray text-sm sm:text-xl sm:mt-1">
                Birthday: 00/00/00
              </div>
            </div>
          </button>
          <button className="h-[4.625rem] px-4 py-2 bg-white rounded border border-mbb-pink justify-start items-center inline-flex mb-6 sm:w-1/2 sm:h-32">
            <div className="w-[9.75rem] h-[2.875rem] relative sm:w-64 sm:ml-4 sm:mb-2">
              <div className="w-[9.563rem] left-[0.188rem] top-0 absolute text-mbb-pink text-base font-bold text-left sm:text-[1.375rem]">
                Jordan Jacob
              </div>
              <div className="left-0 top-[27px] absolute text-dark-gray text-sm sm:text-xl sm:mt-1">
                Birthday: 00/00/00
              </div>
            </div>
          </button>
          <button className="h-[4.625rem] px-4 py-2 bg-white rounded border border-mbb-pink justify-start items-center inline-flex mb-6 sm:w-1/2 sm:h-32">
            <div className="w-[9.75rem] h-[2.875rem] relative sm:w-64 sm:ml-4 sm:mb-2">
              <div className="w-[9.563rem] left-[0.188rem] top-0 absolute text-mbb-pink text-base font-bold text-left sm:text-[1.375rem]">
                Jordan Jacob
              </div>
              <div className="left-0 top-[27px] absolute text-dark-gray text-sm sm:text-xl sm:mt-1">
                Birthday: 00/00/00
              </div>
            </div>
          </button>
        </div>
      </div>
      <UploadButton></UploadButton>
    </div>
  );
}
