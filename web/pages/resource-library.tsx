import React from "react";
import { useState } from "react";
import { FAQ, Links, Research } from "../components";

function ResourceLibraryPage() {
  const [selectedSectionIndex, setSelectedSectionIndex] = useState(0);
  const [changesMade, setChangesMade] = useState<boolean>(false);

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
      title: "Research",
      component: <Research />,
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
              className={`py-4 px-6 font-medium rounded-t-md transition-colors border translate-y-px ${
                selectedSectionIndex === i
                  ? "bg-blue-700 text-white"
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

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const itemsRef = query(collection(db, 'links'));
//   const linkDocs = await getDocs(itemsRef);

//   const links: Link[] = [];

//   linkDocs.forEach(async (doc) => {
//     const data = doc.data();
//     links.push({
//       id: doc.id,
//       title: data.title,
//       description: data.description,
//       url: data.url,
//     });
//   });

//   return { props: { links } };
// };

export default ResourceLibraryPage;
