import React, { useEffect, useState } from "react";
import ResearchURL from "./ResearchURL";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import "react-markdown-editor-lite/lib/index.css";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@lib/firebase";

const mdParser = new MarkdownIt();

function Research() {
  const [markdown, setMarkdown] = useState("");
  const [urls, setUrls] = useState([""]);
  useEffect(() => {
    let ignore = false;
    getDoc(doc(db, "resources/research")).then((doc) => {
      if (!ignore) {
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
  }
  return (
    <div>
      <div className="pt-6 flex h-full flex-col justify-left">
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
        <div>
          {urls.map((url, index) => {
            return (
              <ResearchURL
                url={url}
                setUrl={(url) => {
                  setUrls(urls.map((old, i) => (i === index ? url : old)));
                }}
                delete={() => {
                  setUrls(urls.filter((_, i) => i !== index));
                }}
              />
            );
          })}
        </div>
      </div>
      <div className="absolute border-t w-full" />
      <div className="grid grid-rows-1 grid-cols-7 gap-4">
        <h2
          className="text-md mt-5 mb-5 font-bold text-blue-500 cursor-pointer"
          onClick={() => {
            setUrls([...urls, ""]);
          }}
        >
          + Add a link
        </h2>
        <div className="pt-3 col-start-7">
          <button
            className="flex-shrink-0 bg-white-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-2 text-blue-500 hover:text-white font-bold py-1 px-2 h-10 rounded"
            type="submit"
            onClick={setInfo}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Research;
