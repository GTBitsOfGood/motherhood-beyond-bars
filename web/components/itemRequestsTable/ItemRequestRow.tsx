import Ellipse from "@components/Icons/Ellipse";
import DownChevron from "@components/Icons/DownChevron";
import RightChevronBlue from "@components/Icons/RightChevronBlue";
import { useState, useEffect } from "react";
import { Timestamp, collection, setDoc, doc } from "firebase/firestore";
import { update, ref, getDatabase, set } from 'firebase/database'
import { db } from "@lib/firebase";

export default function ItemRequestRow({
  row,
  changeStatus,
}: {
  row: any;
  changeStatus: any;
}) {
  const [rowExpanded, setRowExpanded] = useState(false);
  const [statusExpanded, setStatusExpanded] = useState(false);

  const status: { [index: string]: string } = {
    Pending: "#FD8033",
    Approved: "#FFBE4C",
    Completed: "#13B461",
  };

  useEffect(() => {
  });

  function getDateString(time: Timestamp) {
    return `${time.toDate().getMonth() + 1}/${time.toDate().getDate()}/${time
      .toDate()
      .getFullYear()
      .toString()
      .slice(-2)}`;
  }

  function updateCaregiver(row : any) {
    console.log(row)
    setDoc(doc(db, "caregivers", row.id), row)
  }

  return (
    <>
      <tr
        className={`border-t ${
          row.itemsRequested.status == "Pending" ? "font-bold" : ""
        }`}
      >
        <td className={`py-2`}>
          <div
            className={`${rowExpanded ? "rotate-90" : ""} cursor-pointer`}
            onClick={() => {
              setRowExpanded(!rowExpanded);
            }}
          >
            <RightChevronBlue></RightChevronBlue>
          </div>
        </td>
        <td className={`py-2 text-base text-black whitespace-nowrap`}>
          {row.firstName + " " + row.lastName}
        </td>
        <td className="py-2 px-6 text-base font-normal text-black whitespace-nowrap flex flex-wrap gap-3">
          {row.itemsRequested.items.map((item: any) => {
            return <div className="p-2 bg-cyan-200 rounded">{item.name}</div>;
          })}
        </td>
        <td className="py-2 px-6 text-base border-t text-black whitespace-nowrap">
          {getDateString(row.itemsRequested.created)}
        </td>
        <td className="py-2 px-6 text-base border-t text-black whitespace-nowrap">
          {getDateString(row.itemsRequested.updated)}
        </td>

        <td className="py-2 px-6 text-base items-center">
          <div>
            <div
              className="flex items-center gap-x-2 cursor-pointer relative z-1"
              onClick={() => {
                setStatusExpanded(!statusExpanded);
              }}
            >
              <Ellipse color={status[row.itemsRequested.status]}></Ellipse>
              <div>{row.itemsRequested.status}</div>
              <DownChevron></DownChevron>
            </div>
            <div
              className={`${
                statusExpanded == true ? "flex" : "hidden"
              } shadow-md flex-col font-normal absolute bg-white z-10`}
            >
              {Object.keys(status).map((stat) => {
                return (
                  <div
                    className="flex items-center gap-x-2 cursor-pointer px-3 py-1 hover:bg-[#304CD1]/10"
                    key={stat}
                    onClick={() => {
                      row.itemsRequested.status = stat
                      updateCaregiver(row)
                      setStatusExpanded(false)
                    }}
                  >
                    <Ellipse color={status[stat]}></Ellipse>
                    <div>{stat}</div>
                  </div>
                );
              })}
              <div className="flex items-center gap-x-2 cursor-pointer px-3 py-1 hover:bg-[#304CD1]/10 text-[#EB3B3B] border-t">
                Delete Request
              </div>
            </div>
          </div>
        </td>
      </tr>
      <tr className={`${!rowExpanded ? "hidden" : ""}`}>
        <td colSpan={6} className="py-3">
          <div className="bg-[#FAFBFC] border-[#D9D9D9] border-[1px] px-20">
            ok
          </div>
        </td>
      </tr>
    </>
  );
}
