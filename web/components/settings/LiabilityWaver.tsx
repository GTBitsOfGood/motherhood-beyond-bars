import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import "react-markdown-editor-lite/lib/index.css";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@lib/firebase";
import { useRouter } from "next/router";

const mdParser = new MarkdownIt();

type LiabilityWaverEntry = {
  info: string;
  name: string;
};

export default function LiabilityWaver(props: {
  getChangesMade: () => boolean;
  setChangesMade: Dispatch<SetStateAction<boolean>>;
}) {
  const [liabilityWavers, setLiabilityWavers] =
    useState<LiabilityWaverEntry[]>();
  const [markdown, setMarkdown] = useState("");
  const [initialLiabilityWavers, setInitialLiabilityWavers] =
    useState<LiabilityWaverEntry[]>();
  const [initialMarkdown, setInitialMarkdown] = useState("");

  const router = useRouter();

  useEffect(() => {
    props.setChangesMade(
      JSON.stringify(liabilityWavers) !==
        JSON.stringify(initialLiabilityWavers) || markdown !== initialMarkdown
    );

    const warningText =
      "You have unsaved changes - are you sure you wish to leave this page?";
    const handleWindowClose = (e: BeforeUnloadEvent) => {
      if (!props.getChangesMade()) return;
      e.preventDefault();
      return (e.returnValue = warningText);
    };
    const handleBrowseAway = () => {
      if (!props.getChangesMade) return;
      if (window.confirm(warningText)) return;
      throw "routeChange aborted.";
    };
    window.addEventListener("beforeunload", handleWindowClose);
    router.events.on("routeChangeStart", handleBrowseAway);
    return () => {
      window.removeEventListener("beforeunload", handleWindowClose);
      router.events.off("routeChangeStart", handleBrowseAway);
    };
  }, [markdown, liabilityWavers, initialMarkdown, initialLiabilityWavers]);

  useEffect(() => {
    let ignore = false;

    getDoc(doc(db, "settings/liability waver")).then((doc) => {
      if (!ignore) {
        setInitialMarkdown(doc?.data()?.markdown);
        setInitialLiabilityWavers(doc?.data()?.liabilityWaver);
        setMarkdown(doc?.data()?.markdown);
        setLiabilityWavers(doc?.data()?.liabilityWaver);
      }
    });

    return () => {
      ignore = true;
    };
  }, []);

  function setInfo() {
    const researchDoc = doc(db, "settings", "liability waver");
    setDoc(researchDoc, {
      markdown,
      liabilityWaver: liabilityWavers,
    });
    setInitialMarkdown(markdown);
    setInitialLiabilityWavers(liabilityWavers);
  }

  //{liabilityWavers?.map((liabilityWaver, index) => {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "198px", marginTop: "50px" }}>
        <button type="button" style={{ color: "#304CD1" }}>
          + Add a waiver
        </button>
      </div>

      <div style={{ width: "834px", marginTop: "50px" }}>
        <div style={{ display: "flex" }}>
          <div style={{ width: "50px", height: "22px", marginBottom: "40px" }}>
            <p style={{ marginBottom: "100px" }}>Name: </p>
          </div>
          <div>
            <input
              className="w-4/5 bg-[#FAFBFC] border-[#D9D9D9] border-[1px] rounded py-2 px-2 focus:outline-0 min-h-[40px]"
              style={{ width: "500px", height: "44px", marginLeft: "20px" }}
              //   value={liabilityWaver.name}
              //   onChange={(e) => {
              //     const newLiabilityWavers = liabilityWavers;
              //     newLiabilityWavers[index].name = e.target.value
              //     setLiabilityWavers(newLiabilityWavers);
              //   }}
            ></input>
          </div>
        </div>
        <div className="w-4/5">
          <MdEditor
            style={{ height: 464 }}
            value={markdown}
            renderHTML={(text) => mdParser.render(text)}
            onChange={({ text }) => {
              setMarkdown(text);
            }}
          />
        </div>
      </div>
      <div className="fixed bottom-0 right-0 left-[318px] bg-white border-t-[1px] px-10 py-4">
        <div className="flex items-right justify-between">
          <div>
            <button type="button" style={{ color: "red" }}>
              Delete waiver
            </button>
          </div>
          <div className="text-[#304CD1] font-semibold hover:cursor-pointer" />
          <div
            className={` flex-shrink-0 bg-white-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-2 text-blue-500 hover:text-white font-bold py-1 px-2 h-10 rounded`}
            // ${
            //   props.getChangesMade()
            //     ? "py-2 px-3 rounded border-[#304CD1] text-[#304CD1] hover:bg-[#304CD1] hover:text-[#ffffff] border-[1px] font-semibold hover:cursor-pointer"
            //     : "py-2 px-3 rounded border-[#304CD1] text-[#304CD1] border-[1px] font-semibold hover:cursor-pointer"
            // }`}
            //    onClick={setInfo}
          >
            <div style={{ marginTop: "3px" }}>Save changes</div>
          </div>
        </div>
      </div>
    </div>
  );
}
