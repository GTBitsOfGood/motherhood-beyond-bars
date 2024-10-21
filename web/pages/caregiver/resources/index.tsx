import ContactInfo from "@components/resources/ContactInfo";
import InfoCard from "@components/resources/InfoCard";
import TopBar from "@components/resources/TopBar";
import { useRouter } from "next/router";

export default function ResourcesPage() {
  const router = useRouter();

  return (
    <div className="w-full h-full flex flex-col justify-start items-center">
      <TopBar backButton={false}></TopBar>
      <div className="sm:flex sm:flex-row sm:w-[60.313rem] sm:h-[29.563rem] sm:mt-14">
        <ContactInfo></ContactInfo>
        <div className="sm:ml-12 sm:w-[20.438rem] sm:h-[23.25rem]">
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
