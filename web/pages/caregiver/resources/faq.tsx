import { useRouter } from "next/router";
import { useState } from "react";

import BackButton from "@components/atoms/BackButton";
import QuestionAnswer from "@components/resources/QuestionAnswer";
import TopBar from "@components/resources/TopBar";

export default function FAQ() {
  // TODO dynamically generate data from database
  const [data, setData] = useState([
    { question: "hi", answer: "no" },
    { question: "hi", answer: "no" },
  ]);

  const router = useRouter();

  return (
    <div className="w-full h-full flex flex-col justify-start items-start">
      <TopBar backButton={false}></TopBar>
      <div className="ml-10 my-6 hidden sm:flex">
        <BackButton
          onClick={() => {
            router.push("/caregiver/resources");
          }}
          darkerColor={true}
        />
      </div>
      <div className="w-full flex flex-col">
        <div className="text-2xl font-bold mb-6 m-6 sm:ml-[5.5rem] sm:mt-0">
          FAQ
        </div>
        <div className="flex flex-col justify-center items-center">
          {data.map((faq, i) => {
            return (
              <QuestionAnswer
                title={faq["question"]}
                description={faq["answer"]}
                showDesc={false}
              ></QuestionAnswer>
            );
          })}
        </div>
      </div>
    </div>
  );
}
