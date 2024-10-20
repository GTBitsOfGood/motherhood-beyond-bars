
import BackButton from "@components/atoms/BackButton";
import QuestionAnswer from "@components/resources/QuestionAnswer";
import TopBar from "@components/resources/TopBar";
import { useState } from "react";

export default function FAQ() {

    const [data, setData] = useState([{"question": "hi", "answer": "no"}, {"question": "hi", "answer": "no"}])

    return (
        <div className="w-full h-full flex flex-col justify-start items-start">
            <TopBar backButton={true}></TopBar>
            <div className="ml-10 my-6 hidden sm:flex">
                <BackButton></BackButton>
            </div>
            <div className="w-full flex flex-col">
                <div className="text-2xl font-bold mb-6 m-6 sm:ml-[5.5rem] sm:mt-0">
                    FAQ
                </div>
                <div className="flex flex-col justify-center items-center">
                    {data.map((faq, i) => {
                        return <QuestionAnswer title={faq["question"]} description={faq["answer"]} showDesc={false}></QuestionAnswer>
                    })}
                </div>
                
            </div>                
        </div>
    )
}