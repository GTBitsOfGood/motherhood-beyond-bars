import React from "react";
import { useTable } from "react-table";
import Image from "next/image";
import dots from "../public/dots.png";
import book from "../public/book.svg";

function BabiesTable({ columns, data }: any) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

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
                {rows.map((row, i) => {
                  prepareRow(row);
                  return (
                    <tr className="" {...row.getRowProps()}>
                      {row.cells.slice(0, -1).map((cell) => {
                        return (
                          <td
                            className="py-4 px-6 text-base border-t font-normal text-black whitespace-nowrap"
                            {...cell.getCellProps()}
                          >
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                      <td className="border-t">
                        <div className="flex flex-row">
                          <div className="pr-2 pt-1">
                            <Image src={book} />
                          </div>
                          <a
                            href={row.cells.slice(-1)[0].value}
                            className="text-blue-700"
                          >
                            Baby Book
                          </a>
                        </div>
                      </td>
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
                                <li>
                                  <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-gray-100"
                                  >
                                    Edit Profile
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="#"
                                    className="block px-4 py-2 text-red-500 hover:bg-gray-100"
                                  >
                                    Remove
                                  </a>
                                </li>
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

export default BabiesTable;
