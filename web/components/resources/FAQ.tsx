import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import UpChevron from '@components/Icons/UpChevron';
import DownChevron from '@components/Icons/DownChevron';
import TrashCan from '@components/Icons/TrashCan';
import { db } from 'db/firebase';
import { AiFillWarning } from 'react-icons/ai';
import { useRouter } from 'next/router';

type FAQEntry = {
  question: string;
  answer: string;
  error?: boolean;
};

export default function FAQ(props: {
  getChangesMade: () => boolean;
  setChangesMade: Dispatch<SetStateAction<boolean>>;
}) {
  const [faqs, setFaqs] = useState<FAQEntry[]>();
  const [userChanges, setUserChanges] = useState<FAQEntry[]>([]);
  const router = useRouter();
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'resources', 'faq'), (doc) => {
      setFaqs(doc.data()?.faqs || []);
      setUserChanges(doc.data()?.faqs || []);
    });

    return unsub;
  }, []);

  useEffect(() => {
    props.setChangesMade(JSON.stringify(userChanges) !== JSON.stringify(faqs));
  }, [userChanges]);

  const moveFAQ = (rank: number, shift: number) => {
    if (userChanges && rank + shift >= 0 && rank + shift < userChanges.length) {
      const tempFaqs = userChanges;
      const tempFaq = tempFaqs[rank];
      tempFaqs[rank] = tempFaqs[rank + shift];
      tempFaqs[rank + shift] = tempFaq;
      setUserChanges([...tempFaqs]);
    }
  };

  const deleteTempFAQ = (rank: number) => {
    if (userChanges) {
      const tempFaqs = userChanges;
      tempFaqs.splice(rank, 1);
      setUserChanges([...tempFaqs]);
    }
  };

  const createTempFAQ = () => {
    if (userChanges) {
      const tempFaqs = userChanges;
      setUserChanges([
        {
          question: '',
          answer: '',
        },
        ...tempFaqs,
      ]);
    }
  };

  const updateFaqs = async (newFaqs: any) => {
    await updateDoc(doc(db, 'resources', 'faq'), { faqs: newFaqs });
  };

  const saveChanges = () => {
    if (userChanges) {
      const tempFaqs = userChanges;
      for (let i = 0; i < tempFaqs.length; i++) {
        if (tempFaqs[i].answer == '' || tempFaqs[i].question == '') {
          tempFaqs[i].error = true;
          setUserChanges([...tempFaqs]);
          return;
        }
      }
    }
    updateFaqs(userChanges);

    if (props.getChangesMade()) alert('Saved changes!');
  };

  return (
    <>
      <div className="w-full h-full pb-20  px-10">
        <div className="flex flex-col w-3/4">
          {userChanges?.map((faq, index) => {
            return (
              <div className="flex w-full py-5" key={index}>
                <div className="flex flex-col w-5/6">
                  <div className="flex pt-2">
                    <label
                      htmlFor={`faq-question-${index}`}
                      className="text-base font-semibold w-1/5 py-2"
                    >
                      Question
                    </label>

                    <div className="flex flex-col w-4/5">
                      <input
                        className={`${
                          faq.error && faq.question.length==0
                            ? ' border-[#FF3939] border-[1px]'
                            : ' border-[#D9D9D9] border-[1px]'
                        } w-full bg-[#FAFBFC] rounded py-2 px-2 focus:outline-0 min-h-[40px]`}
                        value={faq.question}
                        id={`faq-question-${index}`}
                        onChange={(e) => {
                          const tempFaqs = userChanges;
                          tempFaqs[index].question = e.target.value;
                          delete tempFaqs[index].error;
                          setUserChanges([...tempFaqs]);
                        }}
                        placeholder="What's the answer to the life, universe, and everything?"
                      />
                      {faq.error && faq.question.length==0 ? (
                        <div className="text-sm text-[#FF3939] flex align-middle">
                          <span>
                            <AiFillWarning className="fill-[#FF3939]"></AiFillWarning>
                          </span>
                          This field is required
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <div className="flex pt-2">
                    <label
                      htmlFor={`faq-answer-${index}`}
                      className="text-base font-semibold w-1/5 py-2"
                    >
                      Answer
                    </label>
                    <div className="flex flex-col w-4/5">
                      <input
                        className={`${
                          faq.error && faq.answer.length==0
                            ? ' border-[#FF3939] border-[1px]'
                            : ' border-[#D9D9D9] border-[1px]'
                        } w-full bg-[#FAFBFC] rounded py-2 px-2 focus:outline-0 min-h-[40px]`}
                        value={faq.answer}
                        id={`faq-answer-${index}`}
                        onChange={(e) => {
                          const tempFaqs = userChanges;
                          tempFaqs[index].answer = e.target.value;
                          delete tempFaqs[index].error;
                          setUserChanges([...tempFaqs]);
                        }}
                        placeholder="42"
                      ></input>
                      {faq.error && faq.answer.length==0 && (
                        <div className="text-sm text-[#FF3939] flex align-middle">
                          <span>
                            <AiFillWarning className="fill-[#FF3939]"></AiFillWarning>
                          </span>
                          This field is required
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col w-1/6 px-4 py-1 gap-y-2 pt-2">
                  <div className="flex flex-col gap-y-4">
                    <div
                      className="hover:cursor-pointer"
                      onClick={() => {
                        moveFAQ(index, -1);
                      }}
                    >
                      <UpChevron className="fill-[#BFBFBF]"></UpChevron>
                    </div>
                    <div
                      className="hover:cursor-pointer"
                      onClick={() => {
                        moveFAQ(index, 1);
                      }}
                    >
                      <DownChevron className="fill-[#BFBFBF]"></DownChevron>
                    </div>
                  </div>
                  <div
                    className="hover:cursor-pointer"
                    onClick={() => {
                      deleteTempFAQ(index);
                    }}
                  >
                    <TrashCan className="fill-[#BFBFBF]"></TrashCan>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="fixed bottom-0 w-full bg-white border-t-[1px] px-10 py-4 max-w-[calc(100vw-318px)]">
        <div className="flex items-center justify-between">
          <div
            className="text-[#304CD1] font-semibold hover:cursor-pointer"
            onClick={createTempFAQ}
          >
            + Add a question
          </div>
          <button
            className={`py-2 px-3 rounded font-semibold hover:cursor-pointer border-[1px]
              ${
                props.getChangesMade()
                  ? 'py-2 px-3 rounded border-[#304CD1] text-[#304CD1] hover:bg-[#304CD1] hover:text-[#ffffff] border-[1px] font-semibold hover:cursor-pointer'
                  : 'py-2 px-3 rounded border-[#304CD1] text-[#304CD1] border-[1px] font-semibold hover:cursor-pointer'
              }`}
            onClick={saveChanges}
          >
            Save changes
          </button>
        </div>
      </div>
    </>
  );
}
