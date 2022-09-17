import React, { useState, useEffect } from "react";
import { BiTrashAlt } from "react-icons/bi";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@lib/firebase";
import { getStaticProps } from "pages/waivers";


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
    <div>
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
      <button type="submit" onClick={() => {
        setFaqs([...faqs, { question: '', answer: '' }])
      }}>+ Add a question</button>
      <br>
      </br>
      <button type="submit" onClick={saveChanges}>Save Changes</button>
    </div >
  );

  function FaqQuestionAnswer(props) {
    return (
      <div>
        <br>
        </br>
        <form >
          {/* Q, A, and icons */}
          <div>
            {/* Q and A */}
            <div>
              {/* Q and text area*/}
              <div>
                <label htmlFor="question">Q</label>
                <input className="font-opensans text-base w-80 bg-light-gray-300 border-1 border-light-gray-700 p-2"
                  placeholder="Question" name="question" value={props.faq.question}
                  onChange={(e) => props.setQuestion(e.target.value)} required />
              </div>
              {/* A and text area */}
              <div>
                <label htmlFor="answer">A</label>
                <input className="font-opensans text-base w-80 bg-light-gray-100 border-1 border-light-gray-700 p-2"
                  type="textarea" placeholder="Answer" name="answer" value={props.faq.answer}
                  onChange={(e) => props.setAnswer(e.target.value)} required />
              </div>
            </div>
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
          </div>
          <br></br>
        </form>
      </div>
    );
  }
}