import { useState } from "react";

interface BannerProps {
  text: string;
}

export default function Banner({ text }: BannerProps) {
  const [open, setOpen] = useState(true);

  if (!open) return <></>;

  return (
    <div className="w-full p-2 bg-white rounded border border-error-red justify-start items-start gap-2 inline-flex mb-2 mt-1 sm:mb-[6%]">
      <div className="w-4 h-4 relative">
        <img src="/warning.svg"></img>
      </div>
      <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
        <div className="self-stretch text-error-red font-medium font-opensans text-sm">
          {text}
        </div>
      </div>
      <div className="w-4 h-4 justify-center items-center flex">
        <button
          onClick={() => setOpen(false)}
          className="w-4 h-4 relative flex-col justify-start items-start flex"
        >
          <img src="/x.svg"></img>
        </button>
      </div>
    </div>
  );
}
