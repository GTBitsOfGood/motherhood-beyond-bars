import ContactInfo from "@components/resources/ContactInfo";
import InfoCard from "@components/resources/InfoCard";
import TitleTopBar from "@components/logos/TitleTopBar";
import { useRouter } from "next/router";

export default function ResourcesPage() {
  const router = useRouter();

  return (
    <div className="w-full h-full flex flex-col justify-start items-center sm:overflow-auto">
      <TitleTopBar title="Resources"/>
      <div className="sm:flex sm:flex-row sm:w-full sm:pt-14 sm:justify-center sm:overflow-auto sm:pb-6">
        <div className="sm:flex sm:w-1/2 sm:flex-row sm:justify-center sm:pl-[6rem] sm:pr-[3rem]">
          <ContactInfo></ContactInfo>
        </div>
        <div className="sm:flex sm:w-1/2 sm:flex-col sm:justify-center sm:items-center sm:pl-[3rem] sm:pr-[6rem]">
          <InfoCard
            title="FAQ"
            description="Answers to the most commonly asked questions"
            onClick={() => router.push("resources/faq")}
          ></InfoCard>
          <InfoCard
            title="Links"
            description="Helpful websites and resources for raising a child"
            onClick={() => router.push("resources/links")}
          ></InfoCard>
          <InfoCard
            title="Waivers & Forms"
            description="Release documents and signed materials"
            onClick={() => router.push("resources/waivers")}
          ></InfoCard>
        </div>
      </div>
    </div>
  );
}
