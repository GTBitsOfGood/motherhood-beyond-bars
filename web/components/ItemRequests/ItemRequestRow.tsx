import { Timestamp, doc, setDoc } from "@firebase/firestore";
import { useState } from "react";
import { useRouter } from "next/router";
import { RiArrowDropDownLine } from "react-icons/ri";

import { db } from "db/firebase";
import { getBabiesFromCaregiver } from "db/actions/shared/babyCaregiver";

import { Caregiver } from "@lib/types/users";
import { Baby } from "@lib/types/baby";

import DownChevron from "@components/Icons/DownChevron";
import Ellipse from "@components/Icons/Ellipse";
import LinkArrowIcon from "@components/Icons/LinkArrowIcon";

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
  const [babies, setBabies] = useState<Array<Baby>>([]);

  const router = useRouter();

  const status: { [index: string]: string } = {
    Pending: "#FD8033",
    Approved: "#FFBE4C",
    Completed: "#13B461",
  };

  // TODO look into more efficient way to do this
  // Function to fetch babies for a specific caregiver
  const getBabies = async () => {
    const caregiverID = row.id;
    const fetchedBabies = await getBabiesFromCaregiver(caregiverID); // Fetch babies by caregiver ID
    if (fetchedBabies) {
      setBabies(fetchedBabies as unknown as Array<Baby>);
    }
  };

  const dropDownData =
    row.itemsRequested?.items?.map((item) => ({
      header: item.title,
      value:
        item.additionalInfo
          ?.map(
            (info) =>
              info.boxTitle + ": " + (info.value ? info.value : "No preference")
          )
          .join(", ") || "No additional details",
    })) || [];

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
        onClick={() => {
          setRowExpanded(!rowExpanded);
          getBabies();
        }} // Expand/collapse row on click
      >
        <td className="p-0 pl-0 pr-2 py-5">
          <div className="flex gap-x-2">
            <RiArrowDropDownLine
              className={`text-3xl duration-300 cursor-pointer text-mbb-pink ${rowExpanded ? "rotate-180" : ""}`}
            />
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
        <td className="text-ellipsis font-normal text-base text-primary-text">
          {row.itemsRequested.items.map((item) => item.title).join(", ")}
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
              <div
                className="flex align-center items-center"
                key={"Caregiver Information"}
              >
                <div className="w-52 text-dark-gray text-sm tracking-tight uppercase font-semibold">
                  Caregiver Information
                </div>
                <button
                  className="flex flex-row text-mbb-pink font-semibold text-base items-center align-center"
                  onClick={() => {
                    router.push(
                      `/admin/caregivers?search=${encodeURIComponent(row.firstName + " " + row.lastName)}`
                    );
                  }}
                >
                  View caregiver
                  <LinkArrowIcon />
                </button>
              </div>
              {dropDownData.map((data) => (
                <div className="flex" key={row.id + data.header}>
                  <div className="w-52 text-dark-gray text-sm tracking-tight uppercase font-semibold">
                    {data.header}
                  </div>
                  <div className="text-primary-text text-sm font-normal">
                    {data.value}
                  </div>
                </div>
              ))}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
