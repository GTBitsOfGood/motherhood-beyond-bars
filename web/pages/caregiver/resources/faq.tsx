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
      <div className="w-full p-6 overflow-auto">
        <BackButton
          onClick={() => {
            router.push("/caregiver/resources");
          }}
          darkerColor={true}
        />
        <div className="flex flex-col justify-center items-center w-full sm:px-[5rem]">
          <h1 className="text-2xl font-bold my-[1.125rem] w-full">
            FAQ
          </h1>
          <div className="flex flex-col gap-4 w-full">
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
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<FAQEntry[]> = async () => {
  const faqDoc = await getDoc(doc(db, "resources", "faq"));

  return {
    props: faqDoc.data() as FAQEntry[],
  };
};
