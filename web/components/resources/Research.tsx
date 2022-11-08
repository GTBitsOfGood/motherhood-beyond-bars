import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import "react-markdown-editor-lite/lib/index.css";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@lib/firebase";
import { useRouter } from "next/router";

const mdParser = new MarkdownIt();

type URL = {
  title: string;
  url: string;
  id: string;
};

function Research(props: {
  getChangesMade: () => boolean;
  setChangesMade: Dispatch<SetStateAction<boolean>>;
}) {
  const [initialMarkdown, setInitialMarkdown] = useState("");
  const [initialUrls, setInitialUrls] = useState<URL[]>();

  const [markdown, setMarkdown] = useState("");
  const [urls, setUrls] = useState<URL[]>();
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
  }
  return (
    <div>
      <div className="w-3/4 h-full pb-20  px-10 relative">
        <div className="flex flex-col w-full">
          <div className="flex pt-2">
            <div className="text-base font-semibold w-1/5 py-2">
              Description
            </div>
            <div className="w-4/5">
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
          <div className="flex flex-col w-full">
            {urls?.map((url, index) => {
              return (
                <div key={index} className="flex w-full py-5">
                  <div className="flex flex-col w-full">
                    <div className="flex pt-2">
                      <div className="text-base font-semibold w-1/5 py-2">
                        Title
                      </div>
                      <input
                        className="w-4/5 bg-[#FAFBFC] border-[#D9D9D9] border-[1px] rounded py-2 px-2 focus:outline-0 min-h-[40px]"
                        placeholder="Title"
                        value={url.title}
                        onChange={(e) => {
                          const newUrls = [...urls];
                          newUrls[index].title = e.target.value;
                          setUrls(newUrls);
                        }}
                      ></input>
                    </div>
                    <div className="flex pt-2">
                      <div className="text-base font-semibold w-1/5 py-2">
                        URL
                      </div>
                      <input
                        className="w-4/5 bg-[#FAFBFC] border-[#D9D9D9] border-[1px] rounded py-2 px-2 focus:outline-0 min-h-[40px]"
                        placeholder="https://example.com"
                        value={url.url}
                        onChange={(e) => {
                          const newUrls = [...urls];
                          newUrls[index].url = e.target.value;
                          setUrls(newUrls);
                        }}
                      ></input>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="fixed bottom-0 right-0 left-[318px] bg-white border-t-[1px] px-10 py-4">
          <div className="flex items-right justify-between">
            <div className="text-[#304CD1] font-semibold hover:cursor-pointer" />
            <div
              className={`py-2 px-3 rounded font-semibold hover:cursor-pointer border-[1px]
            ${
              props.getChangesMade()
                ? "py-2 px-3 rounded border-[#304CD1] text-[#304CD1] hover:bg-[#304CD1] hover:text-[#ffffff] border-[1px] font-semibold hover:cursor-pointer"
                : "py-2 px-3 rounded border-[#304CD1] text-[#304CD1] border-[1px] font-semibold hover:cursor-pointer"
            }`}
              onClick={setInfo}
            >
              Save changes
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Research;
