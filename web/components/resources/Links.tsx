import { db } from "@lib/firebase";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import UpChevron from "@components/Icons/UpChevron";
import DownChevron from "@components/Icons/DownChevron";
import TrashCan from "@components/Icons/TrashCan";
import { AiFillWarning } from "react-icons/ai";
import { useRouter } from "next/router";

type Link = {
  title: string;
  description: string;
  url: string;
  error?: boolean;
};

export default function Links(props: {
  getChangesMade: () => boolean;
  setChangesMade: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [links, setLinks] = useState<Link[]>();
  const [userChanges, setUserChanges] = useState<Link[]>();
  const router = useRouter();

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "resources", "links"), (doc) => {
      setLinks(doc.data()?.links);
      setUserChanges(doc.data()?.links);
    });

    return unsub;
  }, []);

  useEffect(() => {
    props.setChangesMade(JSON.stringify(userChanges) !== JSON.stringify(links));

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
  }, [userChanges]);

  const updateLinks = async (newLinks: any) => {
    await updateDoc(doc(db, "resources", "links"), { links: newLinks });
  };

  const moveLink = (rank: number, shift: number) => {
    if (userChanges && rank + shift >= 0 && rank + shift < userChanges.length) {
      const tempLinks = userChanges;
      const tempLink = tempLinks[rank];
      tempLinks[rank] = tempLinks[rank + shift];
      tempLinks[rank + shift] = tempLink;
      setUserChanges([...tempLinks]);
    }
  };

  const createTempLink = () => {
    if (userChanges) {
      const tempLinks = userChanges;
      tempLinks.push({
        title: "",
        description: "",
        url: "",
      });
      setUserChanges([...tempLinks]);
    }
  };

  const deleteTempLink = (rank: number) => {
    if (userChanges) {
      const tempLinks = userChanges;
      tempLinks.splice(rank, 1);
      setUserChanges([...tempLinks]);
    }
  };

  const saveChanges = () => {
    if (userChanges) {
      const tempLinks = userChanges;
      for (let i = 0; i < tempLinks.length; i++) {
        if (tempLinks[i].url == "") {
          tempLinks[i].error = true;
          setUserChanges([...tempLinks]);
          return;
        }
      }
    }
    updateLinks(userChanges);
  };

  return (
    <>
      <div className="w-full h-full pb-20  px-10">
        <div className="flex flex-col w-3/4">
          {userChanges?.map((link, index) => {
            return (
              <div className="flex w-full py-5" key={index}>
                <div className="flex flex-col w-5/6">
                  <div className="flex pt-2">
                    <div className="text-base font-semibold w-1/5 py-2">
                      Title
                    </div>

                    <input
                      className="w-4/5 bg-[#FAFBFC] border-[#D9D9D9] border-[1px] rounded py-2 px-2 focus:outline-0 min-h-[40px]"
                      placeholder="Title"
                      value={link.title}
                      onChange={(e) => {
                        const tempLinks = userChanges;
                        tempLinks[index].title = e.target.value;
                        setUserChanges([...tempLinks]);
                      }}
                    ></input>
                  </div>
                  <div className="flex pt-2">
                    <div className="text-base font-semibold w-1/5 py-2">
                      Description
                    </div>
                    <textarea
                      className="w-4/5 bg-[#FAFBFC] border-[#D9D9D9] border-[1px] rounded py-2 px-2 focus:outline-0 min-h-[90px]"
                      placeholder="Description"
                      value={link.description}
                      onChange={(e) => {
                        const tempLinks = userChanges;
                        tempLinks[index].description = e.target.value;
                        setUserChanges([...tempLinks]);
                      }}
                    ></textarea>
                  </div>
                  <div className="flex pt-2">
                    <div className="text-base font-semibold w-1/5 py-2">
                      URL<span className="text-[#FF3939]">*</span>
                    </div>
                    <div className="flex flex-col w-4/5">
                      <input
                        className={`${
                          link.error
                            ? " border-[#FF3939] border-[1px]"
                            : " border-[#D9D9D9] border-[1px]"
                        } w-full bg-[#FAFBFC] rounded py-2 px-2 focus:outline-0 min-h-[40px]`}
                        value={link.url}
                        onChange={(e) => {
                          const tempLinks = userChanges;
                          tempLinks[index].url = e.target.value;
                          delete tempLinks[index].error;
                          setUserChanges([...tempLinks]);
                        }}
                        placeholder="https://example.com"
                      ></input>
                      {link.error ? (
                        <div className="text-sm text-[#FF3939] flex align-middle">
                          <span>
                            <AiFillWarning className="fill-[#FF3939]"></AiFillWarning>
                          </span>
                          This field is required
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col w-1/6 px-4 py-1 gap-y-2 pt-2">
                  <div className="flex flex-col gap-y-4">
                    <div
                      className="hover:cursor-pointer"
                      onClick={() => {
                        moveLink(index, -1);
                      }}
                    >
                      <UpChevron className="fill-[#BFBFBF]"></UpChevron>
                    </div>
                    <div
                      className="hover:cursor-pointer"
                      onClick={() => {
                        moveLink(index, 1);
                      }}
                    >
                      <DownChevron className="fill-[#BFBFBF]"></DownChevron>
                    </div>
                  </div>
                  <div
                    className="hover:cursor-pointer"
                    onClick={() => {
                      deleteTempLink(index);
                    }}
                  >
                    <TrashCan className="fill-[#BFBFBF]"></TrashCan>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="fixed bottom-0 w-full bg-white border-t-[1px] px-10 py-4">
        <div className="flex items-center justify-between">
          <div
            className="text-[#304CD1] font-semibold hover:cursor-pointer"
            onClick={createTempLink}
          >
            + Add a link
          </div>
          <div
            className={
              props.getChangesMade()
                ? "py-2 px-3 rounded bg-[#304CD1] text-[#ffffff] border-[1px] font-semibold hover:cursor-pointer"
                : "py-2 px-3 rounded border-[#304CD1] text-[#304CD1] border-[1px] font-semibold hover:cursor-pointer"
            }
            onClick={saveChanges}
          >
            Save changes
          </div>
        </div>
      </div>
    </>
  );
}
