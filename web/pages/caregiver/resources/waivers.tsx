import DownloadIcon from "@components/Icons/DownloadIcon";
import BackButton from "@components/atoms/BackButton";
import TitleTopBar from "@components/logos/TitleTopBar";
import QuestionAnswer from "@components/resources/QuestionAnswer";
import { BrowserWaiver } from "@lib/types/common";
import { getCurrentCaregiver } from "db/actions/caregiver/Caregiver";
import { getWaivers } from "db/actions/shared/Waiver";
import { Timestamp } from "firebase-admin/firestore";
import MarkdownIt from "markdown-it";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const html2pdf = dynamic(
  () => import("html2pdf.js").then((mod) => mod.default),
  { ssr: false }
);

interface Props {
  waivers: BrowserWaiver[];
}

const mdParser = new MarkdownIt();

export default function Waivers({ waivers }: Props) {
  const router = useRouter();

  const handleDownload = async (waiver: BrowserWaiver) => {
    const element = document.createElement("div");

    // Add basic styling to the waiver PDF content
    element.innerHTML = `
    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto;">
      <h1 style="text-align: center; font-size: 24px; color: #333; margin-bottom: 10px;">${waiver.name}</h1>
      <div style="margin-bottom: 20px; font-size: 14px; color: #555;">
        ${mdParser.render(waiver.content)}
      </div>
      <hr style="border: 1px solid #ddd; margin: 20px 0;">
      <div style="display: flex; justify-content: space-between; font-size: 14px; color: #333;">
        <span>Date: ${new Date(waiver.lastUpdated).toLocaleDateString()}</span>
        <span>Signature: ${waiver.caregiverName}</span>
      </div>
    </div>
  `;

    const html2pdf = (await import("html2pdf.js")).default;

    html2pdf()
      .set({
        margin: [10, 10, 10, 10], // Adjust margins for better layout
        filename: `${waiver.name}.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { orientation: "portrait" },
      })
      .from(element)
      .save();
  };
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
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold mb-[1.125rem] w-full">
            Waivers & Forms
          </h1>
          <div className="flex flex-col gap-4">
            {waivers.map((waiver, i) => (
              <QuestionAnswer
                key={i}
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
                      onClick={() => handleDownload(waiver)}
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

export const getServerSideProps: GetServerSideProps<Props> = async (
  context: GetServerSidePropsContext
) => {
  const waivers = await getWaivers();
  const caregiver = await getCurrentCaregiver(context);
  const caregiverName = caregiver
    ? caregiver.firstName + " " + caregiver.lastName
    : "John Smith";

  return {
    props: {
      waivers: waivers.map((w) => ({
        ...w,
        lastUpdated: (w.lastUpdated as Timestamp).toDate().toISOString(),
        caregiverName,
      })),
    },
  };
};
