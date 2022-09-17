import React, { useState, useEffect } from "react";
import { BiTrashAlt } from "react-icons/bi";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@lib/firebase";


export default function FAQ() {
  // const [faqs, setFaqs] = useState([{ question: '', answer: '' }]);

  // return (
  //   <div>
  //     {faqs.map(faq => <FaqQuestionAnswer faq={faq} />)}
  //     <button type="submit" onClick={() => {
  //       setFaqs([...faqs, { question: '', answer: '' }])
  //     }}>+ Add a question</button>
  //     <br>
  //     </br>
  //     {/* <button type="submit" onSubmit={saveChanges}>Save Changes</button> */}
  //   </div >
  // );
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [faqs, setFaqs] = useState([{ question, answer }]);
  // const [qas, setQAS] = useState([question, answer]);

  useEffect(() => {
    let ignore = false;
    getDoc(doc(db, "resources/faq")).then((doc) => {
      if (!ignore) {
        setQuestion(doc?.data()?.question);
        setAnswer(doc?.data()?.answer);
        // setFaqs(doc?.data()?.faqs);
      }
    });
    return () => {
      ignore = true;
    };
  }, []);

  async function setQA() {
    const qa = doc(db, "resources", "faq");
    setDoc(qa, {
      question: question,
      answer: answer,
      // faqs: faqs,
    });

    // await updateDoc(qa, {
    // faqs: { question: question, answer: answer }
    //});
  }
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
                type="textarea" id="question" name="question" value={question}
                onChange={(e) => setQuestion(e.target.value)} required />
              {/* (e) => setQuestion(e.target.value) */}
            </div>
            {/* A and text area */}
            <div>
              <label htmlFor="answer">A</label>
              <input className="font-opensans text-base w-80 bg-light-gray-100 border-1 border-light-gray-700 p-2"
                type="textarea" id="answer" name="answer" value={answer}
                onChange={(e) => setAnswer(e.target.value)} required />
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
        <button type="submit"
          onClick={() => {
            setFaqs([...faqs, { question, answer }])
          }}
        >
          + Add a question
        </button>
        <br>
        </br>
        <button type="submit" onClick={setQA}>Save Changes</button>
        <br></br>
      </form>
    </div >
  );
}

//   function FaqQuestionAnswer() {
//     const [question, setQuestion] = useState('');
//     const [answer, setAnswer] = useState('');
//     // const [qas, setQAS] = useState([question, answer]);

//     useEffect(() => {
//       let ignore = false;
//       getDoc(doc(db, "resources/faq")).then((doc) => {
//         if (!ignore) {
//           setQuestion(doc?.data()?.question);
//           setAnswer(doc?.data()?.answer);
//         }
//       });
//       return () => {
//         ignore = true;
//       };
//     }, []);

//     async function setQA() {
//       const qa = doc(db, "resources", "faq");
//       setDoc(qa, {
//         // qa: qas
//         question: question,
//         answer: answer
//       });
//     }


//     return (
//       <div>
//         <br>
//         </br>
//         <form >
//           {/* Q, A, and icons */}
//           <div>
//             {/* Q and A */}
//             <div>
//               {/* Q and text area*/}
//               <div>
//                 <label htmlFor="question">Q</label>
//                 <input className="font-opensans text-base w-80 bg-light-gray-300 border-1 border-light-gray-700 p-2"
//                   type="textarea" id="question" name="question" value={question}
//                   onChange={(e) => setQuestion(e.target.value)} required />
//                 {/* (e) => setQuestion(e.target.value) */}
//               </div>
//               {/* A and text area */}
//               <div>
//                 <label htmlFor="answer">A</label>
//                 <input className="font-opensans text-base w-80 bg-light-gray-100 border-1 border-light-gray-700 p-2"
//                   type="textarea" id="answer" name="answer" value={answer}
//                   onChange={(e) => setAnswer(e.target.value)} required />
//               </div>
//             </div>
//             <ol className="arrows">
//               <li>
//                 <button type="button">
//                   <RiArrowUpSLine />
//                 </button>
//               </li>
//               <li>
//                 <button type="button">
//                   <RiArrowDownSLine />
//                 </button>
//               </li>
//               <li>
//                 <button type="button">
//                   <BiTrashAlt />
//                 </button>
//               </li>
//             </ol>
//           </div>
//           <button type="submit" onClick={setQA}>Save Changes</button>
//           <br></br>
//         </form>
//       </div>
//     );
//   }
// }