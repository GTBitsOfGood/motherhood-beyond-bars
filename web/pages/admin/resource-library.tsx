import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { collection, getDocs, orderBy, query } from "@firebase/firestore";
import { db } from "db/firebase";
import { formatDoc } from "db/firebase/getDoc";

import { Waiver } from "@lib/types/common";
import { FAQ, Links } from "../../components";
import Waivers from "@components/resources/Waivers";

interface Props {
  waivers: Waiver[]; // Add waivers to props
}

function ResourceLibraryPage({ waivers }: Props) {
  const [selectedSectionIndex, setSelectedSectionIndex] = useState(0);
  const [changesMade, setChangesMade] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const warningText =
      "You have unsaved changes - are you sure you wish to leave this page?";
    const handleWindowClose = (e: BeforeUnloadEvent) => {
      if (!changesMade) return;
      e.preventDefault();
      return (e.returnValue = warningText);
    };
    const handleBrowseAway = () => {
      if (!changesMade) return;
      if (window.confirm(warningText)) return;
      throw "routeChange aborted.";
    };
    window.addEventListener("beforeunload", handleWindowClose);
    router.events.on("routeChangeStart", handleBrowseAway);
    return () => {
      window.removeEventListener("beforeunload", handleWindowClose);
      router.events.off("routeChangeStart", handleBrowseAway);
    };
  }, [changesMade]);

  const sections = [
    {
      title: "FAQ",
      component: (
        <FAQ
          getChangesMade={() => changesMade}
          setChangesMade={setChangesMade}
        />
      ),
    },
    {
      title: "Links",
      component: (
        <Links
          getChangesMade={() => changesMade}
          setChangesMade={setChangesMade}
        />
      ),
    },
    {
      title: "Waivers & Forms",
      component: (
        <Waivers
          waivers={waivers}
          getChangesMade={() => changesMade}
          setChangesMade={setChangesMade}
        />
      ),
    },
  ];

  return (
    <div className="w-full flex flex-col overflow-y-scroll">
      <div className="flex flex-row items-center py-6 border-b w-full px-10">
        <h1 className="text-2xl font-bold w-full">Resource Library</h1>
      </div>
      <section className="flex flex-col flex-grow relative">
        <div className="border-b flex gap-x-1 mt-8 w-full px-10">
          {/* Segmented Control */}
          {sections.map((section, i) => (
            <button
              key={i}
              className={`py-4 px-6 font-medium rounded-t-md transition-colors border translate-y-px ${
                selectedSectionIndex === i
                  ? "bg-mbb-pink text-white"
                  : "bg-gray-100 text-gray-400"
              }`}
              onClick={() => {
                if (changesMade) {
                  const confirmed = confirm(
                    "You have unsaved changes - are you sure you wish to leave this page?"
                  );
                  if (confirmed) {
                    setSelectedSectionIndex(i);
                    setChangesMade(false);
                  }
                } else {
                  setSelectedSectionIndex(i);
                }
              }}
            >
              {section.title}
            </button>
          ))}
        </div>
        <>{sections[selectedSectionIndex].component}</>
      </section>
    </div>
  );
}

export const getServerSideProps = async () => {
  try {
    const queryRef = query(collection(db, "waivers"), orderBy("order", "asc"));
    const waiverDocs = await getDocs(queryRef);
    const allWaivers = waiverDocs.docs.map(formatDoc) as Waiver[];

    return {
      props: {
        waivers: allWaivers, // This will be passed to WaiversPage as props
      },
    };
  } catch (error) {
    console.error("Error fetching waivers:", error);
    return {
      props: {
        waivers: [], // Handle error with empty array
      },
    };
  }
};
export default ResourceLibraryPage;
