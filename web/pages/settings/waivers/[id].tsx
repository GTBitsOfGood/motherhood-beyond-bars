import { db } from "@lib/firebase";
import { formatDoc } from "@lib/firebase/getDoc";
import { Waiver } from "@lib/types";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import "react-markdown-editor-lite/lib/index.css";
import { useState } from "react";
import Link from "next/link";

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
  const [name, setName] = useState(waiver.name);
  const [description, setDescription] = useState(waiver.description);

  return (
    <div className="p-10">
      <Link href="/settings" passHref>
        <a className="hover:underline" href="/settings">
          Back
        </a>
      </Link>
      <h1 className="font-bold text-2xl my-6">
        <input
          className="font-bold border-b border-dashed outline-none border-gray-500"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </h1>
      <div className="py-4 mb-8">
        {/* <h2 className="font-medium text-md mb-1">Description (internal)</h2> */}
        <input
          value={description}
          className="border-b border-dashed outline-none border-gray-500 w-96"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </div>
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
          const docRef = doc(db, `app/settings/waivers/${waiver.id}`);
          // const docRef = doc(db, "settings")
          console.log(JSON.stringify(docRef));
          setLoading(true);
          await updateDoc(docRef, {
            content: markdown,
            name,
            description,
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
  const settingsRef = doc(db, "app", "settings");
  const waiversRef = collection(settingsRef, "waivers");
  const waiverRef = doc(waiversRef, params?.id as string);
  const waiver = formatDoc<Waiver>(await getDoc(waiverRef));

  return {
    props: {
      waiver,
    },
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const settingsRef = doc(db, "app", "settings");
  const waiversRef = collection(settingsRef, "waivers");
  const allWaivers = (await getDocs(waiversRef)).docs.map(
    formatDoc
  ) as Waiver[];
  return {
    paths: allWaivers.map((waiver) => ({
      params: {
        id: waiver.id as string,
      },
    })),
    fallback: false,
  };
};
