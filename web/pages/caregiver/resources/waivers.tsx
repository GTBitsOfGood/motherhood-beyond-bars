import DownloadIcon from "@components/Icons/DownloadIcon";
import { BrowserWaiver } from "@lib/types/common";
import { getWaivers } from "db/actions/shared/Waiver";
import { Timestamp } from "firebase-admin/firestore";
import MarkdownIt from "markdown-it";
import { GetServerSideProps } from "next";

interface Props {
  waivers: BrowserWaiver[];
}

const mdParser = new MarkdownIt();

export default function Waivers({ waivers }: Props) {
  return (
    <div className="w-full p-6 overflow-auto">
      <h1 className="text-2xl font-bold mb-[1.125rem]">Waivers & Forms</h1>
      <div className="flex flex-col gap-4">
        {/* TODO: Show waivers in Accordion */}
        {waivers.map((waiver, i) => (
          <div key={i} className="flex flex-col p-4 gap-2 border rounded">
            <h2 className="text-xl font-semibold">{waiver.name}</h2>
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
        ))}
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
