import React from "react";
import { useTable } from "react-table";
import Image from "next/image";
import dots from "../public/dots.png";
import { ItemRequestStatus } from "pages/item-requests";

function ItemRequestsTable({
  columns,
  data,
  markAsPending,
  markAsFulfilled,
}: {
  columns: any[];
  data: any[];
  markAsPending: (row: any) => void;
  markAsFulfilled: (row: any) => void;
}) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  const isFulfilled = (row: any) => {
    return row.fulfilled == ItemRequestStatus.Fulfilled;
  };

  return (
    <div className="flex flex-col">
      <div className="sm:-mx-6 lg:-mx-8">
        <div className="inline-block sm:px-6 lg:px-8">
          <div>
            <table {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        scope="col"
                        className="py-3 px-6 text-base font-normal tracking-wider text-left text-slate-500"
                        {...column.getHeaderProps()}
                      >
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr className="" {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <>
                            <td
                              className="py-4 px-6 text-base border-t font-normal text-black whitespace-nowrap"
                              {...cell.getCellProps()}
                            >
                              {cell.render("Cell")}
                            </td>
                          </>
                        );
                      })}
                      <td className="border-t">
                        <div className="p-4">
                          <div className="group relative">
                            <button>
                              <Image src={dots} />
                            </button>
                            <nav
                              tabIndex={0}
                              className="absolute w-[127px] rounded-b bg-white border shadow-xl right-1 mt-1 shadow-slate-200 transition-all opacity-0 group-focus-within:visible group-focus-within:opacity-100"
                            >
                              <ul className="py-1">
                                {isFulfilled(row.original) ? (
                                  <li>
                                    <div
                                      onClick={() => {
                                        markAsPending(row.original);
                                      }}
                                      className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    >
                                      Mark as pending
                                    </div>
                                  </li>
                                ) : (
                                  <li>
                                    <div
                                      onClick={() => {
                                        markAsFulfilled(row.original);
                                      }}
                                      className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    >
                                      Mark as fulfilled
                                    </div>
                                  </li>
                                )}
                              </ul>
                            </nav>
                          </div>
                        </div>
                      </td>
                    </tr>
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

export default ItemRequestsTable;
