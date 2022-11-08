import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import ResearchURL from "./ResearchURL";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import "react-markdown-editor-lite/lib/index.css";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@lib/firebase";
import { useRouter } from "next/router";

const mdParser = new MarkdownIt();

type Url = Record<"title" | "url", string>;

function Research(props: {
  getChangesMade: () => boolean;
  setChangesMade: Dispatch<SetStateAction<boolean>>;
}) {
  const [initialMarkdown, setInitialMarkdown] = useState("");
  const [initialUrls, setInitialUrls] = useState<Url[]>([]);

  const [markdown, setMarkdown] = useState<string>("");
  const [urls, setUrls] = useState<Url[]>([]);
  const router = useRouter();

  useEffect(() => {
    props.setChangesMade(
      JSON.stringify(urls) !== JSON.stringify(initialUrls) ||
        markdown !== initialMarkdown
    );
  }, [markdown, urls, initialMarkdown, initialUrls]);

  useEffect(() => {
    let ignore = false;

    getDoc(doc(db, "resources/research")).then((doc) => {
      if (!ignore) {
        setInitialMarkdown(doc?.data()?.markdown);
        setInitialUrls(doc?.data()?.url);
        setMarkdown(doc?.data()?.markdown);
        setUrls(doc?.data()?.url);
      }
    });

    return () => {
      ignore = true;
    };
  }, []);
  function setInfo() {
    const researchDoc = doc(db, "resources", "research");
    setDoc(researchDoc, {
      markdown,
      url: urls,
    });
    setInitialMarkdown(markdown);
    setInitialUrls(urls);

    if (props.getChangesMade()) alert("Saved changes!");
  }
  return (
    <div>
      <div className="pt-6 flex h-full flex-col justify-left pl-10">
        <div className="grid grid-rows-1 grid-cols-10 gap-4 pb-6">
          <h2 className="text-md mb-5 font-bold col-span-1">Description</h2>
          <div className="col-span-8">
            <MdEditor
              style={{ height: 300 }}
              value={markdown}
              renderHTML={(text) => mdParser.render(text)}
              onChange={({ text }) => {
                setMarkdown(text);
              }}
            />
          </div>
        </div>
        <div className="pb-6 flex h-full flex-col justify-left">
          {urls.map((url, index) => {
            return (
              <ResearchURL
                key={url.url}
                url={url.url}
                setUrl={(url) => {
                  setUrls(
                    urls.map((old, i) =>
                      i === index ? { url, title: "" } : old
                    )
                  );
                }}
                delete={() => {
                  setUrls(urls.filter((_, i) => i !== index));
                }}
                index={index}
              />
            );
          })}
        </div>
      </div>
      <div className="absolute border-t w-full" />
      <div className="grid grid-rows-1 grid-cols-7 gap-4">
        <h2
          className="text-md mt-5 mb-5 font-bold text-blue-500 cursor-pointer pl-6"
          onClick={() => {
            setUrls([...urls, { title: "", url: "" }]);
          }}
        >
          + Add a link
        </h2>
        <div className="pt-3 col-start-7">
          <button
            className={`py-2 px-3 rounded font-semibold hover:cursor-pointer border-[1px]
            ${
              props.getChangesMade()
                ? "py-2 px-3 rounded border-[#304CD1] text-[#304CD1] hover:bg-[#304CD1] hover:text-[#ffffff] border-[1px] font-semibold hover:cursor-pointer"
                : "py-2 px-3 rounded border-[#304CD1] text-[#304CD1] border-[1px] font-semibold hover:cursor-pointer"
            }`}
            onClick={setInfo}
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Research;
