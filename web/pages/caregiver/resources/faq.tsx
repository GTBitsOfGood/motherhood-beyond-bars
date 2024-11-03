import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import { doc, getDoc } from "@firebase/firestore";
import { db } from "db/firebase";

import BackButton from "@components/atoms/BackButton";
import QuestionAnswer from "@components/resources/QuestionAnswer";
import TitleTopBar from "@components/logos/TitleTopBar";

type FAQEntry = {
  question: string;
  answer: string;
};

export default function FAQ({ faqs }: { faqs: FAQEntry[] }) {
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
          FAQ
        </div>
        <div className="flex flex-col justify-center items-center">
          {faqs.map((faq, i) => {
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

export const getServerSideProps: GetServerSideProps<FAQEntry[]> = async () => {
  return {
    props: (await getDoc(doc(db, "resources", "faq"))).data() as FAQEntry[],
  };
};
