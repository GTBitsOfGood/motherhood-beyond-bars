import React from "react";
import { useTable } from "react-table";

function ItemRequestsTable({ columns, data }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <div class="flex flex-col">
    <div class="sm:-mx-6 lg:-mx-8">
        <div class="inline-block sm:px-6 lg:px-8">
            <div>
                <table {...getTableProps()}>
                    <thead>
                      {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                          {headerGroup.headers.map((column) => (
                            <th scope="col" class="py-3 px-6 text-base font-normal tracking-wider text-left text-slate-500" {...column.getHeaderProps()}>{column.render("Header")}</th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                      {rows.map((row, i) => {
                        prepareRow(row);
                        return (
                          <tr class="" {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                              return (
                              <td class="py-4 px-6 text-base border-t font-normal text-black whitespace-nowrap" {...cell.getCellProps()}>{cell.render("Cell")}</td>
                              );
                            })}
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