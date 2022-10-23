import React, { useState, useEffect } from "react";
import ItemRequestsTable from "@components/itemRequestsTable/ItemRequestsTable";
import { GetServerSideProps } from "next";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  onSnapshot,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "@lib/firebase";

type RowData = {
  id: string;
  name: string;
};

function genItemRequestsTab() {
  const [selectedSectionIndex, setSelectedSectionIndex] = useState(0);
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const q = query(collection(db, "caregivers"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tempData: any = [];
      querySnapshot.forEach((doc) => {
        const temp = { ...doc.data(), id: doc.id };
        tempData.push(temp);
        console.log(tempData.length);
      });
      setData([...tempData]);
    });

    return unsubscribe;
  }, []);

  const columns = [
    {
      Header: "",
    },
    {
      Header: "Name",
    },
    {
      Header: "Items Requested",
    },
    {
      Header: "Created",
    },
    {
      Header: "Updated",
    },
    {
      Header: "Status",
    },
  ];

  const changeStatus = async (caregiverId: any, status: string) => {
    // TODO : change status of given caregiverId
  };

  const sections = [
    {
      title: "All",
      component: (
        <ItemRequestsTable
          columns={columns}
          data={data
            .filter((x: any) => x.itemsRequested.status == "Pending")
            .concat(data.filter((x : any) => x.itemsRequested.status == "Approved"))
            .concat(data.filter((x : any) => x.itemsRequested.status == "Completed"))}
          changeStatus={changeStatus}
        />
      ),
    },
    {
      title: "Pending",
      component: (
        <ItemRequestsTable
          columns={columns}
          data={data.filter((x: any) => x.itemsRequested.status == "Pending")}
          changeStatus={changeStatus}
        />
      ),
    },
    {
      title: "Approved",
      component: (
        <ItemRequestsTable
          columns={columns}
          data={data.filter((x : any) => x.itemsRequested.status == "Approved")}
          changeStatus={changeStatus}
        />
      ),
    },
    {
      title: "Completed",
      component: (
        <ItemRequestsTable
          columns={columns}
          data={data.filter((x : any) => x.itemsRequested.status == "Completed")}
          changeStatus={changeStatus}
        />
      ),
    },
    {
      title: "Deleted",
      component: (
        <ItemRequestsTable
          columns={columns}
          data={data}
          changeStatus={changeStatus}
        />
      ),
    },
  ];

  return (
    <div className="w-full flex flex-col overflow-y-scroll">
      <div className="flex flex-row items-center py-6 border-b w-full px-10">
        <h1 className="text-2xl font-bold w-full">Resource Library</h1>
      </div>
      <section className="flex flex-col flex-grow relative px-10">
        <div className="border-b flex gap-x-1 mt-8 w-full">
          {/* Segmented Control */}
          {sections.map((section, i) => (
            <button
              className={`py-4 px-6 font-medium rounded-t-md transition-colors border translate-y-px ${
                selectedSectionIndex === i
                  ? "bg-blue-700 text-white"
                  : "bg-gray-100 text-gray-400"
              }`}
              onClick={() => {
                setSelectedSectionIndex(i);
              }}
            >
              {section.title}
            </button>
          ))}
        </div>
        <div className="w-full">
          {data.length != 0 ? sections[selectedSectionIndex].component : <></>}
        </div>
      </section>
    </div>
  );
}

export default genItemRequestsTab;
