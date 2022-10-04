import React, { Dispatch } from "react";
import trash from "../../public/trashcan.png";
import TrashCan from "@components/Icons/TrashCan";
import Image from "next/image";
type PropTypes = {
  url: string;
  setUrl: Dispatch<string>;
  delete: () => void;
  index: number;
};
function ResearchURL(props: PropTypes) {
  return (
    <div className="flex w-full py-5">
      <div className="flex flex-col w-5/6">
        <div className="flex pt-2">
          <label
            htmlFor={`faq-question-${props.index}`}
            className="text-base font-semibold w-1/5 py-2"
          >
            Question
          </label>

          <div className="flex flex-col w-4/5">
            <input
              className={`border-[#D9D9D9] border-[1px] w-full bg-[#FAFBFC] rounded py-2 px-2 focus:outline-0 min-h-[40px]`}
              value={props.url}
              id={`faq-question-${props.index}`}
              onChange={(e) => {
                props.setUrl(e.currentTarget.value);
              }}
              placeholder="What's the answer to the life, universe, and everything?"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-1/6 px-4 py-1 gap-y-2 pt-2">
        <div className="hover:cursor-pointer" onClick={props.delete}>
          <TrashCan className="fill-[#BFBFBF]"></TrashCan>
        </div>
      </div>
      <span className="col-span-1 pt-2">
        <Image className="static px-10" src={trash} onClick={props.delete} />
      </span>
    </div>
  );
}

export default ResearchURL;
