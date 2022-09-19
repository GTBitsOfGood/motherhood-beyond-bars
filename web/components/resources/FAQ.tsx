import React, { useState, useEffect } from "react";
import { BiTrashAlt } from "react-icons/bi";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@lib/firebase";

export default function FAQ() {
  const [faqs, setFaqs] = useState([{ question: '', answer: '' }]);
  useEffect(() => {
    let ignore = false;
    getDoc(doc(db, "resources/faq")).then((doc) => {
      if (!ignore) {
        setFaqs(doc?.data()?.faqs);
      }
    });
    return () => {
      ignore = true;
    };
  }, []);
  async function saveChanges() {
    const qa = doc(db, "resources", "faq");
    await updateDoc(qa, {
      faqs: faqs
    });
  }

  return (
    <div className="w-full">
      <div className="h-full"
        style={{ overflowY: "scroll", overflow: "hidden", height: "100%", zIndex: 8 }}>
        {faqs.map((faq, i) => <FaqQuestionAnswer faq={faq} setQuestion={(value) => {
          setFaqs(faqs.map((_, i2) => {
            return i2 === i ? { ...faq, question: value } : _
          }))
        }}
          setAnswer={(value) => {
            setFaqs(faqs.map((_, i2) => {
              return i2 === i ? { ...faq, answer: value } : _
            }))
          }} />)}
      </div>
      <div className="bg-white border-gray-300 p-4"
        style={{ position: "sticky", bottom: "0", zIndex: 1, borderTopWidth: 1 }}>        <div className="flex flex-row justify-between w-3/4">
          <div className="text-blue-600">
            <button type="submit"
              style={{ fontWeight: "500", padding: 7 }}
              onClick={() => {
                setFaqs([...faqs, { question: '', answer: '' }])
              }}
            >+ Add a question</button>
          </div>
          <div className="text-blue-600 flex flex-justify-content-end">
            <button type="submit"
              className="rounded py-2 px-2 border-blue-600"
              style={{ fontWeight: "500", borderWidth: 2, padding: 7 }}
              onClick={saveChanges}>Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
  function FaqQuestionAnswer(props) {
    return (
      <div className="w-full">
        <br>
        </br>
        <div className="flex flex-row w-full"
        >
          <div className="flex flex-col w-3/4">
            <div className="flex flex-row">
              <label htmlFor="question" className=" p-1 font-semibold">Q</label>
              <input className="focus:outline-0 min-h-[10px] bg-gray-50 font-opensans text-base w-80 border-1 rounded py-2 px-2 border-gray-300 p-2"
                placeholder="Question" name="question"
                style={{ width: "95%", borderWidth: 1, marginBottom: 20 }}
                value={props.faq.question}
                onChange={(e) => props.setQuestion(e.target.value)} required />
            </div>
            <div className="flex flex-row">
              <label htmlFor="answer" className="flex flex-justify-content-center font-semibold p-1">A</label>
              <textarea className="focus:outline-0 min-h-[10px] font-opensans text-base w-80 bg-gray-50 border-1 rounded py-2 px-2 border-gray-300 p-2"
                placeholder="Answer" name="answer"
                style={{ width: "95%", borderWidth: 1, marginBottom: 20 }}
                value={props.faq.answer}
                onChange={(e) => props.setAnswer(e.target.value)} required />
            </div>
          </div>
          <ol className="arrows">
            <li>
              <button type="button">
                <RiArrowUpSLine className="fill-gray-300" />
              </button>
            </li>
            <li>
              <button type="button">
                <RiArrowDownSLine className="fill-gray-300" />
              </button>
            </li>
            <li>
              <button type="button">
                <BiTrashAlt className="fill-gray-300" />
              </button>
            </li>
          </ol>
        </div>
        <br></br>
      </div >
    );
  }
}