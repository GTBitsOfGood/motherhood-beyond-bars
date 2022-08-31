import React from "react";
import { useState } from "react";
import { FAQ, Links, Research } from "../components";

function ResourceLibraryPage() {
  const [selectedSectionIndex, setSelectedSectionIndex] = useState(0);

  const sections = [
    {
      title: "FAQ",
      component: <FAQ />,
    },
    {
      title: "Links",
      component: <Links />,
    },
    {
      title: "Research",
      component: <Research />,
    },
  ];

  return (
    <div className="w-full">
      <div class="flex flex-row items-center py-6 border-b w-full px-10">
        <h1 className="text-2xl font-bold w-full">Resource Library</h1>
      </div>
      <section className="px-10">
        <div className="border-b flex gap-x-1 mt-8 w-full">
          {/* Segmented Control */}
          {sections.map((section, i) => (
            <button
              className={`py-4 px-6 font-medium rounded-t-md transition-colors border translate-y-px ${
                selectedSectionIndex === i
                  ? "bg-blue-700 text-white"
                  : "bg-gray-100 text-gray-400"
              }`}
              onClick={() => setSelectedSectionIndex(i)}
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

export default ResourceLibraryPage;
