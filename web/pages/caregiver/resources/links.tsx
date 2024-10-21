import { useRouter } from "next/router";
import { useState } from "react";

import BackButton from "@components/atoms/BackButton";
import LinkCard from "@components/resources/LinkCard";
import TitleTopBar from "@components/logos/TitleTopBar";

export default function Links() {
  // TODO fetch links from database
  const [data, setData] = useState([
    {
      title: "Motherhood Beyond Bars",
      description: "Official website for Motherhood Beyond Bars",
      url: "motherhoodbeyondbars.org",
    },
    {
      title: "Department of Family & Children Services",
      description:
        "Official website for Georgia Department of Human Services Division of Family & Children Services",
      url: "https://dfcs.georgia.gov/",
    },
  ]);
  const router = useRouter();

  return (
    <div className="w-full h-full flex flex-col justify-start items-start">
      <TitleTopBar title="Resources" />
      <div className="ml-10 my-6 flex">
        <BackButton
          onClick={() => {
            router.push("/caregiver/resources");
          }}
          darkerColor={true}
        />
      </div>
      <div className="w-full flex flex-col">
        <div className="text-2xl font-bold mb-6 m-6 sm:ml-[5.5rem] sm:mt-0">
          Links
        </div>
        <div className="flex flex-col justify-center items-center">
          {data.map((faq, i) => {
            return (
              <LinkCard
                title={faq["title"]}
                description={faq["description"]}
                URL={faq["url"]}
              ></LinkCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}
