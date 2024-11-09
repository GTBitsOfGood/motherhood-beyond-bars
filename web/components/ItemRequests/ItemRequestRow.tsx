import DownChevron from "@components/Icons/DownChevron";
import Ellipse from "@components/Icons/Ellipse";
import RightChevronBlue from "@components/Icons/RightChevronBlue";
import { Timestamp, doc, setDoc } from "@firebase/firestore";
import { Item } from "@lib/types/items";
import { Caregiver } from "@lib/types/users";
import { db } from "db/firebase";
import { useState } from "react";
import { Baby } from "@lib/types/baby";

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
      value: row.address + (row.apartment && row.apartment !== "" ? ", " + row.apartment : "") + ", " + row.city + ", " + row.state + " " + row.zipCode,
    },
    {
      header: "CONTACT",
      value: `${row.email ?? ""}, ${row.phoneNumber ?? ""}`,
    },
    {
      header: "CHILDREN NAMES",
      value: row.babies && row.babies.map((baby) => (baby as Baby).firstName + " " + (baby as Baby).lastName).join(", "),
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
        className={`hover:bg-mbb-pink/10 border-t ${
          row.itemsRequested.status === "Pending" ? "font-bold" : ""
        } ${
          selectedRows.includes(row.id)
            ? "border-l-2 border-l-mbb-pink bg-mbb-pink/5"
            : ""
        } cursor-pointer`}
        onClick={() => setRowExpanded(!rowExpanded)} // Expand/collapse row on click
      >
        <td className="py-2">
          <div className="flex gap-x-2">
            <div className={`${rowExpanded ? "rotate-90" : ""}`}>
              <RightChevronBlue />
            </div>
            <input
              type="checkbox"
              className="cursor-pointer"
              checked={selectedRows.includes(row.id)}
              onClick={(event) => event.stopPropagation()} // Prevent row click event
              onChange={() => {
                const tempSelected = selectedRows;
                tempSelected.includes(row.id)
                  ? tempSelected.splice(tempSelected.indexOf(row.id), 1)
                  : tempSelected.push(row.id);
                setSelectedRows([...tempSelected]);
              }}
            />
          </div>
        </td>
        <td className="py-2 text-base text-black whitespace-nowrap">
          {row.firstName + " " + row.lastName}
        </td>
        <td className="py-2 px-6 text-base font-normal text-black whitespace-nowrap flex flex-wrap gap-3">
          {row.itemsRequested.items.map((item: Item, index: number) => {
            return (
              <div
                className="p-2 rounded"
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
          {row.itemsRequested.created
            ? getDateString(row.itemsRequested.created)
            : null}
        </td>
        <td className="py-2 px-6 text-base border-t text-black whitespace-nowrap">
          {row.itemsRequested.updated
            ? getDateString(row.itemsRequested.updated)
            : null}
        </td>
        <td className="py-2 px-6 text-base items-center">
          <div
            className="flex items-center gap-x-2 cursor-pointer relative z-1"
            onClick={(event) => {
              event.stopPropagation(); // Prevent row click event
              setStatusExpanded(!statusExpanded);
            }}
          >
            <Ellipse color={status[row.itemsRequested.status]} />
            <div>{row.itemsRequested.status}</div>
            <DownChevron />
          </div>
          <div
            className={`${
              statusExpanded ? "flex" : "hidden"
            } shadow-md flex-col font-normal absolute bg-white z-10`}
          >
            {Object.keys(status).map((stat) => (
              <div
                className="flex items-center gap-x-2 cursor-pointer px-3 py-1 hover:bg-mbb-pink/10"
                key={stat}
                onClick={() => {
                  row.itemsRequested.status = stat;
                  updateCaregiver(row);
                  setStatusExpanded(false);
                }}
              >
                <Ellipse color={status[stat]} />
                <div>{stat}</div>
              </div>
            ))}
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
        </td>
      </tr>
      {rowExpanded && (
        <tr>
          <td colSpan={6} className="py-3">
            <div className="bg-secondary-background border-light-gray border px-10 py-6 gap-y-4 flex flex-col">
              {dropDownData.map((data) => (
                <div className="flex" key={data.header}>
                  <div className="w-[20%] text-dark-gray text-sm tracking-[0.02em]">
                    {data.header}
                  </div>
                  <div>{data.value}</div>
                </div>
              ))}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
