import { db } from "db/firebase";
import { Waiver } from "@lib/types/common";
import {
  addDoc,
  collection,
  doc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import "react-markdown-editor-lite/lib/index.css";
import { formatDoc } from "db/firebase/getDoc";

const mdParser = new MarkdownIt();

interface Props {
  waivers: Waiver[];
  getChangesMade: () => boolean;
  setChangesMade: Dispatch<SetStateAction<boolean>>;
}

function Waivers({
  waivers: initialWaivers,
  getChangesMade,
  setChangesMade,
}: Props) {
  const router = useRouter();
  const [localWaivers, setLocalWaivers] = useState<Waiver[]>(initialWaivers);
  const [selectedWaiver, setSelectedWaiver] = useState<Waiver | null>(
    localWaivers.length > 0 ? localWaivers[0] : null
  );
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(true);

  // Function to refetch waivers from Firestore
  const fetchWaivers = async () => {
    try {
      const queryRef = query(
        collection(db, "waivers"),
        orderBy("order", "asc")
      );
      const waiverDocs = await getDocs(queryRef);
      const allWaivers = waiverDocs.docs.map(formatDoc) as Waiver[];
      setLocalWaivers(allWaivers);
      return allWaivers;
    } catch (error) {
      console.error("Error fetching waivers:", error);
      return [];
    }
  };

  // Re-fetch waivers when route changes
  useEffect(() => {
    const handleRouteChange = async () => {
      const latestWaivers = await fetchWaivers();
      if (latestWaivers.length > 0) {
        setSelectedWaiver(latestWaivers[0]);
        setSaved(true);
      }
    };
    handleRouteChange();
  }, [router.asPath]);

  const updateSelectedWaiver = (field: keyof Waiver, value: any) => {
    if (!selectedWaiver) return;
    setSelectedWaiver(
      (prevWaiver) =>
        ({
          ...prevWaiver,
          [field]: value,
        }) as Waiver
    );
    setSaved(false);
  };

  const handleNewWaiver = async () => {
    setLoading(true);
    try {
      const newDoc = await addDoc(collection(db, "waivers"), {
        name: "New Waiver",
        content: "*Put the waiver body here*",
        lastUpdated: serverTimestamp(),
        description: "Waiver Description",
        order: localWaivers.length,
      } as Waiver);

      const newWaiver = {
        id: newDoc.id,
        name: "New Waiver",
        content: "*Put the waiver body here*",
        lastUpdated: new Date().toISOString(),
        description: "Waiver Description",
        order: localWaivers.length,
      };
      setLocalWaivers([...localWaivers, newWaiver]);
      setSelectedWaiver(newWaiver);
      setSaved(true);
    } catch (error) {
      console.error("Error adding new waiver:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveWaiver = async () => {
    if (!selectedWaiver || !selectedWaiver.id) return;

    setLoading(true);
    try {
      const docRef = doc(db, "waivers", selectedWaiver.id);
      await updateDoc(docRef, {
        name: selectedWaiver.name,
        content: selectedWaiver.content,
        lastUpdated: serverTimestamp(),
      });
      const updatedWaivers = localWaivers.map((waiver) =>
        waiver.id === selectedWaiver.id
          ? { ...waiver, ...selectedWaiver }
          : waiver
      );
      setLocalWaivers(updatedWaivers);
      setSaved(true);
      alert("Changes have been saved!");
    } catch (error) {
      console.error("Error saving waiver:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteWaiver = async () => {
    if (!selectedWaiver || !selectedWaiver.id) return;

    const confirmed = confirm(
      `Are you sure you want to delete the waiver "${selectedWaiver.name}"?`
    );
    if (!confirmed) return;

    setLoading(true);
    try {
      const docRef = doc(db, "waivers", selectedWaiver.id);
      await deleteDoc(docRef);

      const remainingWaivers = localWaivers.filter(
        (waiver) => waiver.id !== selectedWaiver.id
      );
      setLocalWaivers(remainingWaivers);
      setSelectedWaiver(remainingWaivers.length ? remainingWaivers[0] : null);
      setSaved(true);
      alert("Waiver has been successfully deleted!");
    } catch (error) {
      console.error("Error deleting waiver:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full">
      {/* Sidebar for Waiver List */}
      <div className="w-1/5 p-4 pr-0 bg-white border-r">
        {/* Adjusted width to 1/5 for narrower sidebar */}
        <ul className="mb-4">
          {localWaivers.map((waiver) => (
            <li
              key={waiver.id}
              className={`cursor-pointer p-3 text-left ${
                selectedWaiver?.id === waiver.id
                  ? "bg-gray-200"
                  : "bg-white hover:bg-gray-100"
              }`}
              onClick={() => {
                if (
                  !saved &&
                  !confirm(
                    "You have unsaved changes. Are you sure you want to leave?"
                  )
                )
                  return;
                setSelectedWaiver(waiver);
                setSaved(true);
              }}
            >
              {waiver.name}
            </li>
          ))}
        </ul>
        <button
          onClick={handleNewWaiver}
          className="text-blue-600 hover:text-blue-800 font-semibold"
          disabled={loading}
        >
          + Add a Waiver
        </button>
      </div>

      {/* Main Content Area */}
      <div className="w-4/5 p-10 space-y-6">
        {selectedWaiver ? (
          <>
            {/* Waiver Name Input */}
            <div className="mb-4">
              <input
                className="w-full p-2 border-b border-dashed text-xl font-bold outline-none"
                value={selectedWaiver.name}
                onChange={(e) => updateSelectedWaiver("name", e.target.value)}
              />
            </div>

            {/* Markdown Editor */}
            <MdEditor
              value={selectedWaiver.content}
              style={{ height: "300px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={({ text }) => updateSelectedWaiver("content", text)}
              config={{ view: { menu: true, md: true, html: false } }}
            />

            {/* Action Buttons */}
            <div className="flex justify-between">
              <button
                className="text-red-600 hover:underline"
                onClick={handleDeleteWaiver}
                disabled={loading}
              >
                Delete waiver
              </button>
              <button
                className={`py-2 px-4 font-semibold border rounded-md ${
                  getChangesMade()
                    ? "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                    : "border-gray-400 text-gray-400"
                }`}
                onClick={handleSaveWaiver}
                disabled={loading || saved}
              >
                Save changes
              </button>
            </div>
          </>
        ) : (
          <p>Select a waiver to edit</p>
        )}
      </div>
    </div>
  );
}

export default Waivers;
