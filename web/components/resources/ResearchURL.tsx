import React, { Dispatch } from "react";
import trash from "../../public/trashcan.png";
import Image from "next/image";
type PropTypes = { url: string; setUrl: Dispatch<string>; delete: () => void };
function ResearchURL(props: PropTypes) {
  return (
    <div className="grid grid-rows-1 grid-cols-10 gap-4 pb-6">
      <h2 className="text-md pt-2 font-bold col-span-1">URL</h2>
      <div className="col-span-8">
        <input
          value={props.url}
          onChange={(e) => {
            props.setUrl(e.currentTarget.value);
          }}
          type="text"
          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="https://example.com"
        />
      </div>
      <span className="col-span-1 pt-2">
        <Image className="static px-10" src={trash} onClick={props.delete} />
      </span>
    </div>
  );
}

export default ResearchURL;
