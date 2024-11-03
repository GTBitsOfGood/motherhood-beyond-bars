import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Timestamp } from "firebase-admin/firestore";
import MarkdownIt from "markdown-it";

import { getWaivers } from "db/actions/shared/Waiver";
import { BrowserWaiver } from "@lib/types/common";

import DownloadIcon from "@components/Icons/DownloadIcon";
import BackButton from "@components/atoms/BackButton";
import QuestionAnswer from "@components/resources/QuestionAnswer";
import TitleTopBar from "@components/logos/TitleTopBar";

interface Props {
  waivers: BrowserWaiver[];
}

const mdParser = new MarkdownIt();

export default function Waivers({ waivers }: Props) {
  const router = useRouter();

  return (
    // TODO fix styles and formatting to alignw with Figma
    <div className="w-full h-full flex flex-col justify-start items-start">
      <TitleTopBar title="Resources" />
      <div className="w-full p-6 overflow-auto">
        <BackButton
          onClick={() => {
            router.push("/caregiver/resources");
          }}
          darkerColor={true}
        />
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold mb-[1.125rem] w-full">
            Waivers & Forms
          </h1>
          <div className="flex flex-col gap-4">
            {waivers.map((waiver, i) => (
              <QuestionAnswer
                title={waiver.name}
                content={
                  <div
                    key={i}
                    className="flex flex-col p-4 gap-2 border rounded"
                  >
                    <div
                      className="bg-secondary-background border border-light-gray overflow-auto shrink-0 py-2 px-3 max-h-[300px]"
                      dangerouslySetInnerHTML={{
                        __html: mdParser.render(waiver.content),
                      }}
                    />
                    <button
                      className="flex gap-1 self-start items-center text-mbb-pink fill-mbb-pink font-semibold"
                      onClick={() => {
                        // TODO: Download form
                      }}
                    >
                      <span>Download Form</span> <DownloadIcon />
                    </button>
                  </div>
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const waivers = await getWaivers();

  return {
    props: {
      waivers: waivers.map((w) => ({
        ...w,
        lastUpdated: (w.lastUpdated as Timestamp).toDate().toISOString(),
      })),
    },
  };
};
