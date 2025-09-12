import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import { doc, getDoc } from "@firebase/firestore";
import { db } from "db/firebase";

import BackButton from "@components/atoms/BackButton";
import LinkCard from "@components/resources/LinkCard";
import TitleTopBar from "@components/logos/TitleTopBar";

type Link = {
  title: string;
  description: string;
  url: string;
};

export default function Links({ links }: { links: Link[] }) {
  const router = useRouter();

  return (
    <div className="w-full h-full flex flex-col justify-start items-start">
      <TitleTopBar title="Resources" />
      <div className="w-full p-6 overflow-auto">
        <BackButton
          onClick={() => {
            router.push("/caregiver/resources");
          }}
          darkerColor={true}
        />
        <div className="flex flex-col justify-center items-center w-full sm:px-[5rem]">
          <h1 className="text-2xl font-bold my-[1.125rem] w-full">
            Links
          </h1>
          <div className="flex flex-col w-full">
            {links.map((link, i) => {
              return (
                <LinkCard
                  title={link["title"]}
                  description={link["description"]}
                  URL={link["url"]}
                ></LinkCard>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Link[]> = async () => {
  const linksDoc = await getDoc(doc(db, "resources", "links"));

  return {
    props: linksDoc.data() as Link[],
  };
};
