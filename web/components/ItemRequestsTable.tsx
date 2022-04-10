import React, { useState } from "react";
import { useTable } from "react-table";
import Image from "next/image";
import vector from '../public/vector.png';
import pending from '../public/pending.png';
import fulfilled from '../public/fulfilled.png';

function ItemRequestsTable({ columns, data }: { columns: any[]; data: any[] }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  const getStatus = (status: string) => {
    switch(status) {
      default: return pending
      case 'Pending': return pending
      case 'Fulfilled': return fulfilled
    }
  }

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
                  const [statusCircle, setStatusCircle] = useState(getStatus(row.cells.slice(-1)[0].value));
                  prepareRow(row);
                  return (
                    <tr className="" {...row.getRowProps()}>
                      {row.cells.slice(0,-1).map((cell) => {
                        return (
                          <td
                            className="py-4 px-6 text-base border-t font-normal text-black whitespace-nowrap"
                            {...cell.getCellProps()}
                          >
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                      <td
                            className="py-4 text-base border-t font-normal text-black whitespace-nowrap"
                            {...row.cells.slice(-1)[0].getCellProps()}
                          >
                           <div className="flex flex-row">
                              <div className="pr-3">
                                <Image src={statusCircle} />
                              </div>
                              <div id="status">
                                {row.cells.slice(-1)[0].render("Cell")}
                              </div>
                              <div className="group relative">
                                <button className="pl-3">
                                  <Image src={vector}/>
                                </button>
                                <nav
                                  tabIndex={0}
                                  className="absolute w-[140px] rounded-b bg-white border shadow-xl right-1 mt-1 shadow-slate-200 transition-all opacity-0 group-focus-within:visible group-focus-within:opacity-100"
                                >
                                  <ul className="py-1">
                                    <li>
                                      <button 
                                        className="flex flex-row block px-3 py-2 hover:bg-gray-100 w-full"
                                        onClick={()=>{
                                          document.getElementById("status").textContent = "Pending";
                                          setStatusCircle(pending)
                                        }}
                                      >
                                        <div className="pl-1 pr-3">
                                          <Image src={pending} />
                                        </div>
                                        Pending
                                      </button>
                                    </li>
                                    <li>
                                      <button 
                                        className="flex flex-row block px-3 py-2 hover:bg-gray-100 w-full"
                                        onClick={()=>{
                                          document.getElementById("status").textContent = "Fulfilled";
                                          setStatusCircle(fulfilled)
                                        }}
                                      >
                                        <div className="pl-1 pr-3">
                                          <Image src={fulfilled} />
                                        </div>
                                        Fulfilled
                                      </button>
                                    </li>
                                    <li>
                                      <a
                                        href="#"
                                        className="block px-4 py-2 text-red-500 hover:bg-gray-100"
                                      >
                                        Delete Request
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

export default ItemRequestsTable;
