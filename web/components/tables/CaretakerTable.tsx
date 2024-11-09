import LinkArrowIcon from "@components/Icons/LinkArrowIcon";
import DeleteProfileModal from "@components/modals/DeleteProfileModal";
import { Baby } from "@lib/types/baby";
import { getBabiesFromCaregiver } from "db/actions/shared/babyCaregiver";
import Link from "next/link";
import React from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useTable } from "react-table";
import Tooltip from "../ToolTip";

function CaretakerTable({ tableProps, open, setOpen }: any) {

  const { columns, data, onDelete } = tableProps;
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  const [openDeleteModal, toggleDeleteModal] = React.useState(false);
  const [toDelete, setToDelete] = React.useState<object | null>(null);
  const [babies, setBabies] = React.useState<any[]>(
    Array(data.length).fill(null)
  );

  const metadata = {
    Address: "address",
    "Pref. Communication": "prefferedCommunication",
    "Child Name": "childName",
    "Household Info": "houseHoldInfo",
    "Liability Waiver": "liabilityWaiver",
  };

  // Function to fetch babies for a specific caregiver
  const getBabies = async (index: number) => {
    if (!babies[index]) {
      const caregiverID = data[index].id;
      const fetchedBabies = await getBabiesFromCaregiver(caregiverID); // Fetch babies by caregiver ID
      if (fetchedBabies) {
        setBabies((prevBabies) => {
          const newBabies = [...prevBabies];
          newBabies[index] = fetchedBabies;
          return newBabies;
        });
      }
    }
  };
  return (
    <div className="flex flex-col">
      <div>
        <div className="inline-block w-full">
          <div>
            <table {...getTableProps()} className="w-full">
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr
                    {...headerGroup.getHeaderGroupProps()}
                    key={headerGroup.id}
                  >
                    <th></th>
                    {headerGroup.headers.map((column) => (
                      <th
                        scope="col"
                        className="py-3 px-6 text-base font-normal tracking-wider text-dark-400 text-center"
                        {...column.getHeaderProps()}
                        key={column.id}
                      >
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                  prepareRow(row);
                  return (
                    <>
                      <tr
                        onClick={() => {
                          getBabies(i); // Fetch babies when caregiver row is clicked
                          setOpen((prevOpen: boolean[]) => {
                            const newOpen = [...prevOpen];
                            newOpen[i] = !newOpen[i];
                            return newOpen;
                          });
                        }}
                        className="cursor-pointer hover:bg-mbb-pink/10"
                        {...row.getRowProps()}
                        key={row.original.id}
                      >
                        <td className="border-t">
                          <RiArrowDropDownLine
                            className={`text-2xl duration-300 cursor-pointer ${
                              open[i] && "rotate-180"
                            }`}
                          />
                        </td>
                        {row.cells.map((cell) => (
                          <td
                            className="py-4 px-6 text-base border-t text-black whitespace-nowrap"
                            {...cell.getCellProps()}
                            key={cell.column.id}
                          >
                            {cell.column.id === "assigned" ? (
                              <span
                                className={`${
                                  cell.value
                                    ? "bg-light-blue"
                                    : "bg-light-orange"
                                } rounded-md p-2`}
                              >
                                {cell.value ? "Assigned" : "Not assigned"}
                              </span>
                            ) : (
                              cell.render("Cell")
                            )}
                          </td>
                        ))}
                        <td className="border-t">
                          <div className="flex flex-row">
                            <div
                              className="pr-2 pt-1 cursor-pointer"
                              onClick={(event) => {
                                event.stopPropagation();
                                setToDelete(row.original ?? null);
                                toggleDeleteModal(true);
                              }}
                            >
                              <Tooltip tooltipText="Delete">
                                <HiOutlineTrash className="text-lg" />
                              </Tooltip>
                            </div>
                          </div>
                        </td>
                      </tr>

                      {open[i] && (
                        <tr>
                          <td
                            colSpan={columns.length + 1}
                            className="border-b duration-300"
                          >
                            <div className="m-2 bg-secondary-background p-4 self-center mx-auto w-full">
                              <div className="grid grid-cols-3 gap-2">
                                {Object.keys(metadata).map((key) => {
                                  const data: any = row.original;
                                  const val = data[(metadata as any)[key]];
                                  return val ? (
                                    <>
                                      <div className="uppercase text-dark-400 font-semibold text-sm">
                                        {key}
                                      </div>
                                      <div className="col-span-2">
                                        {key === "Liability Waiver" ? (
                                          <Link href={`/admin/waivers/${val}`}>
                                            <a className="text-sm text-mbb-pink">
                                              Link
                                            </a>
                                          </Link>
                                        ) : (
                                          <div className="text-sm">{val}</div>
                                        )}
                                      </div>
                                    </>
                                  ) : null;
                                })}
                                {babies[i] && babies[i].length > 0 && (
                                  <>
                                    <div className="uppercase text-dark-400 font-semibold text-sm">
                                      Children Names
                                    </div>
                                    <div className="col-span-2 text-sm flex gap-4">
                                      <div>
                                        {babies[i]
                                          .map(
                                            (baby: Baby) =>
                                              baby.firstName +
                                              " " +
                                              baby.lastName
                                          )
                                          .join(", ")}
                                      </div>
                                      <div>
                                        <Link
                                          href={`/admin/babies?caregiver=${data[i].id}`}
                                        >
                                          <a className="text-sm text-mbb-pink font-semibold flex">
                                            Manage
                                            <LinkArrowIcon />
                                          </a>
                                        </Link>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <DeleteProfileModal
        isOpen={openDeleteModal}
        onClose={() => toggleDeleteModal(false)}
        onDelete={() => {
          onDelete(toDelete);
          toggleDeleteModal(false);
        }}
      />
    </div>
  );
}

export default CaretakerTable;
