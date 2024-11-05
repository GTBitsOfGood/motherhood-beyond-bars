import Ellipse from "@components/Icons/Ellipse";
import DownChevron from "@components/Icons/DownChevron";
import RightChevronBlue from "@components/Icons/RightChevronBlue";
import { useState } from "react";
import { Timestamp, setDoc, doc } from "firebase/firestore";
import { db } from "db/firebase";
import { Caregiver } from "@lib/types/users";
import { Item } from "@lib/types/items";

export default function ItemRequestRow({
  row,
  index,
  selectedRows,
  setSelectedRows,
}: {
  row: Caregiver;
  index: number;
  selectedRows: string[];
  setSelectedRows: any;
}) {
  const [rowExpanded, setRowExpanded] = useState(false);
  const [statusExpanded, setStatusExpanded] = useState(false);

  const status: { [index: string]: string } = {
    Pending: "#FD8033",
    Approved: "#FFBE4C",
    Completed: "#13B461",
  };

  const dropDownData = [
    {
      header: "ADDRESS",
      value: row.address,
    },
    {
      header: "CONTACT",
      value: `${row.email ?? ""}, ${row.phoneNumber ?? ""}`,
    },
    {
      header: "CHILDREN NAMES",
      value: "",
    },
    {
      header: "CARETAKER COMMENTS",
      value: row.itemsRequested.additionalComments
        ? row.itemsRequested.additionalComments.join(", ")
        : "",
    },
  ];

  function getDateString(time: Timestamp) {
    return `${time.toDate().getMonth() + 1}/${time.toDate().getDate()}/${time
      .toDate()
      .getFullYear()
      .toString()
      .slice(-2)}`;
  }

  function updateCaregiver(row: Caregiver) {
    setDoc(doc(db, "caregivers", row.id), row);
  }

  function generateColor(target: string) {
    let sum = 0;
    for (let i = 0; i < target.length; i++) {
      sum += (i + 1) * target.charCodeAt(i);
    }

    sum = sum % 360;
    return `hsla(${sum}deg 100% 70% / 40%)`;
  }

  return (
    <>
      <tr
        className={`border-t ${
          row.itemsRequested.status == "Pending" ? "font-bold" : ""
        } ${
          selectedRows.includes(row.id)
            ? "border-l-2 border-l-mbb-pink bg-mbb-pink/5"
            : ""
        }`}
      >
        <td className="py-2">
          <div className="flex gap-x-2 ">
            <div
              className={`${rowExpanded ? "rotate-90" : ""} cursor-pointer`}
              onClick={() => {
                setRowExpanded(!rowExpanded);
              }}
            >
              <RightChevronBlue></RightChevronBlue>
            </div>
            <input
              type="checkbox"
              className="cursor-pointer"
              checked={selectedRows.includes(row.id)}
              onChange={() => {
                const tempSelected = selectedRows;
                tempSelected.includes(row.id)
                  ? tempSelected.splice(tempSelected.indexOf(row.id), 1)
                  : tempSelected.push(row.id);

                setSelectedRows([...tempSelected]);
              }}
            ></input>
          </div>
        </td>
        <td className={`py-2 text-base text-black whitespace-nowrap`}>
          {row.firstName + " " + row.lastName}
        </td>
        <td className="py-2 px-6 text-base font-normal text-black whitespace-nowrap flex flex-wrap gap-3">
          {row.itemsRequested.items.map((item: Item, index: number) => {
            return (
              <div
                className={`p-2 rounded`}
                style={{
                  backgroundColor: generateColor(item.title),
                }}
                key={index}
              >
                {item.title}
              </div>
            );
          })}
        </td>
        <td className="py-2 px-6 text-base border-t text-black whitespace-nowrap">
          {row.itemsRequested.created ? getDateString(row.itemsRequested.created) : null}
        </td>
        <td className="py-2 px-6 text-base border-t text-black whitespace-nowrap">
          {row.itemsRequested.updated ? getDateString(row.itemsRequested.updated) : null}
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
              <DownChevron />
            </div>
            <div
              className={`${
                statusExpanded == true ? "flex" : "hidden"
              } shadow-md flex-col font-normal absolute bg-white z-10`}
            >
              {Object.keys(status).map((stat) => {
                return (
                  <div
                    className="flex items-center gap-x-2 cursor-pointer px-3 py-1 hover:bg-mbb-pink/10"
                    key={stat}
                    onClick={() => {
                      row.itemsRequested.status = stat;
                      updateCaregiver(row);
                      setStatusExpanded(false);
                    }}
                  >
                    <Ellipse color={status[stat]}></Ellipse>
                    <div>{stat}</div>
                  </div>
                );
              })}
              <div
                className="flex items-center gap-x-2 cursor-pointer px-3 py-1 hover:bg-mbb-pink/10 text-error-red border-t"
                onClick={() => {
                  row.itemsRequested.status = "Deleted";
                  updateCaregiver(row);
                  setStatusExpanded(false);
                }}
              >
                Delete Request
              </div>
            </div>
          </div>
        </td>
      </tr>
      <tr className={`${!rowExpanded ? "hidden" : ""}`}>
        <td colSpan={6} className="py-3">
          <div className="bg-secondary-background border-light-gray border px-10 py-6 gap-y-4 flex flex-col">
            {dropDownData.map((data) => {
              return (
                <div className="flex" key={data.header}>
                  <div className="w-[20%] text-dark-gray text-sm tracking-[0.02em]">
                    {data.header}
                  </div>
                  <div>{data.value}</div>
                </div>
              );
            })}
          </div>
        </td>
      </tr>
    </>
  );
}
