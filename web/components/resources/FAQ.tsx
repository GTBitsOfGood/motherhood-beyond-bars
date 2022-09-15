import React, {useState} from "react";
import { BiTrashAlt } from "react-icons/bi";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import InputContainer from './components/input-container.component.jsx';
import ItemsContainer from './components/items-container.component.jsx';

// const inputArr = [
//   {
//     type: "text",
//     id: 1,
//     value: ""
//   }
// ]
const [arr, setArr] = useState([]);

function addForm() {
  // setArr(arr.concat(FaqQuestionAnswer()));
  // setArr(e => {
  //       return [
  //     ...e, 
  //   ]
  // })
}

export default function FAQ() {
  return (
    <div>
      <FaqQuestionAnswer/>
      <div>
        <InputContainer>
        </InputContainer>
      </div>
      <button type="submit" onClick={(FaqQuestionAnswer)}>+ Add a question</button>
    </div>
  );
}

function FaqQuestionAnswer() {
  return (
    <div>
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
        <br></br>
      </form>
    </div>
  );
}