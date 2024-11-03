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
  );
}

export const getServerSideProps: GetServerSideProps<Link[]> = async () => {
  return {
    props: (await getDoc(doc(db, "resources", "links"))).data() as Link[],
  };
};
