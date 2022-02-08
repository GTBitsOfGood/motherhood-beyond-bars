import { db } from "@lib/firebase";
import { formatDoc } from "@lib/firebase/getDoc";
import { Waiver } from "@lib/types";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import "react-markdown-editor-lite/lib/index.css";
import { useState } from "react";

const mdParser = new MarkdownIt();

interface Props {
  waiver: Waiver;
}

type Params = {
  id: string;
} & ParsedUrlQuery;

export default function WaiverPage({ waiver }: Props) {
  const [markdown, setMarkdown] = useState(waiver.content);
  const [showSaved, setShowSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div className="p-10">
      <a className="hover:underline" href="/waivers">
        Back
      </a>
      <h1 className="font-bold text-2xl my-6">{waiver.name}</h1>
      <MdEditor
        style={{}}
        value={markdown}
        renderHTML={(text) => mdParser.render(text)}
        onChange={({ text }) => {
          setMarkdown(text);
        }}
      />
      <button
        className={`p-4 bg-black text-white rounded-md m-4 w-32 ${
          loading ? "opacity-50" : ""
        }`}
        onClick={async () => {
          const docRef = doc(db, `waivers/${waiver.id}`);
          setLoading(true);
          await updateDoc(docRef, {
            content: markdown,
            lastUpdated: Timestamp.now(),
          });
          setLoading(false);
          setShowSaved(true);
          setTimeout(() => {
            setShowSaved(false);
          }, 1000);
        }}
      >
        {showSaved ? "Saved" : "Save"}
      </button>
    </div>
  );
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const waiverRef = doc(db, "waivers", params?.id as string);
  const waiver = formatDoc<Waiver>(await getDoc(waiverRef));

  return {
    props: {
      waiver,
    },
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const queryRef = query(collection(db, "waivers"));
  const allWaivers = (await getDocs(queryRef)).docs.map(formatDoc) as Waiver[];
  return {
    paths: allWaivers.map((waiver) => ({
      params: {
        id: waiver.id,
      },
    })),
    fallback: false,
  };
};
function createEditor(): any {
  throw new Error("Function not implemented.");
}
