import React from "react";
import { useTable } from "react-table";
import { HiOutlineTrash } from "react-icons/hi";
import { RiArrowDropDownLine } from "react-icons/ri";
import Tooltip from "../ToolTip";
import Link from "next/link";

function CaretakerTable({props}: any) {
  if (!props) {
    return <></>; 
  }
  
  const { columns, data, onDelete } = props;
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  const [open, setOpen] = React.useState(Array(data.length).fill(false));

  const metadata = {
    "Address": "address",
    "Pref. Communication": "prefferedCommunication",
    "Child Name": "childName",
    "Household Info": "houseHoldInfo",
    "Liability Waiver": "liabilityWaiver",
  };

  return (
    <div className="flex flex-col">
      <div className="sm:-mx-6 lg:-mx-8">
        <div className="inline-block sm:px-6 lg:px-8 w-full">
          <div>
            <table {...getTableProps()} className="w-full">
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    <th></th>
                    {headerGroup.headers.map((column) => (
                      <th
                        scope="col"
                        className="py-3 px-6 text-base font-normal tracking-wider text-slate-500 text-center"
                        {...column.getHeaderProps()}
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
                          setOpen((prevOpen) => {
                            const newOpen = [...prevOpen];
                            newOpen[i] = !newOpen[i];
                            return newOpen;
                          });
                        }}
                        className="cursor-pointer"
                        {...row.getRowProps()}
                      >
                        <td className="border-t">
                          <RiArrowDropDownLine
                            className={`text-2xl duration-300 cursor-pointer ${
                              open[i] && "rotate-180"
                            }`}
                          />
                        </td>
                        {row.cells.map((cell) => {
                          return (
                            <>
                              <td
                                className="py-4 px-6 text-base border-t font-normal text-black whitespace-nowrap"
                                {...cell.getCellProps()}
                              >
                                {cell.column.id === "assigned" ? (
                                  cell.value ? (
                                    <div className="text-xs bg-blue-200 text-center rounded-md p-2">
                                      Assigned
                                    </div>
                                  ) : (
                                    <div className="text-xs bg-orange-200 text-center rounded-md p-2">
                                      Not Assigned
                                    </div>
                                  )
                                ) : (
                                  cell.render("Cell")
                                )}
                              </td>
                            </>
                          );
                        })}
                        <td className="border-t">
                          <div className="flex flex-row">
                            <div
                              className="pr-2 pt-1 cursor-pointer"
                              onClick={() => {
                                confirm(
                                  "Are you sure you want to delete this caretaker?"
                                ) && onDelete(row.original);
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
                            <div>
                              <div className="m-2 bg-gray-200 p-4 self-center mx-auto w-full">
                                <div className="grid grid-cols-3 gap-2">
                                  {Object.keys(metadata).map((key) => {
                                    const data: any = row.original;
                                    const val = data[(metadata as any)[key]];
                                    return val ? (
                                      <>
                                        <div
                                          key={key}
                                          className="uppercase text-gray-600 font-semibold text-sm"
                                        >
                                          {key}
                                        </div>
                                        <div key={key} className="col-span-2">
                                          {key === "Liability Waiver" ? (
                                            <Link
                                              href={`/admin/waivers/${val}`}
                                            >
                                              <a className="text-sm text-blue-400">
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
                                </div>
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
    </div>
  );
}

export default CaretakerTable;
