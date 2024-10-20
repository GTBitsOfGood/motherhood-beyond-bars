
import BackButton from "@components/atoms/BackButton";
import LinkCard from "@components/resources/LinkCard";
import TopBar from "@components/resources/TopBar";
import { useState } from "react";

export default function Links() {

    const [data, setData] = useState([{"description": "visit the page", "title": "cats", "url": "catURL"}, {"description": "visit the page", "title": "cats", "url": "catURL"}])

    return (
        <div className="w-full h-full flex flex-col justify-start items-start">
            <TopBar backButton={true}></TopBar>
            <div className="ml-10 my-6 hidden sm:flex">
                <BackButton></BackButton>
            </div>
            <div className="w-full flex flex-col">
                <div className="text-2xl font-bold mb-6 m-6 sm:ml-[5.5rem] sm:mt-0">
                    Links
                </div>
                <div className="flex flex-col justify-center items-center">
                    {data.map((faq, i) => {
                        return <LinkCard title={faq["title"]} description={faq["description"]} URL={faq["url"]}></LinkCard>
                    })}
                </div>
                
            </div>                
        </div>
    )
}