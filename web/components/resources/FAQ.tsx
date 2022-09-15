import React from "react";
import { BiTrashAlt } from "react-icons/bi";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

export default function FAQ() {
  return (
    <div>
      {/* FAQ section here! */}
      <br>
      </br>
      <form action="/send-data-here" method="post">
        <label htmlFor="question">Q</label>
        <input className="font-opensans text-base w-80 bg-light-gray-300 border-1 border-light-gray-700 p-2"
          type="text" id="question" name="question" required />
        <ol className="arrows">
          <li>
            <button type="button">
              <RiArrowUpSLine />
            </button>
          </li>
          <li>
            <button type="button">
              <RiArrowDownSLine />
            </button>
          </li>
          <li>
            <button type="button">
              <BiTrashAlt />
            </button>
          </li>
        </ol>
        <br>
        </br>
        <label htmlFor="answer">A</label>
        <input className="font-opensans text-base w-80 bg-light-gray-100 border-1 border-light-gray-700 p-2"
          type="text" id="answer" name="answer" required />
        <br></br>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
