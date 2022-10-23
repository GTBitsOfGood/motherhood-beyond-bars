import React, { useEffect, useState } from "react";
import ItemRequestRow from "./ItemRequestRow";

function ItemRequestsTable({
  columns,
  data,
  changeStatus,
}: {
  columns: any[];
  data: any[];
  changeStatus: (row: any, status: string) => void;
}) {

  useEffect(() => {
    console.log(data)
    console.log('yea')
  })

  return (
    <div className="flex flex-col w-full">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                scope="col"
                className="px-6 pt-4 text-base font-normal tracking-wider text-left text-slate-500"
              >
                {column.Header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => {
            return (
              <ItemRequestRow
                row={row}
                changeStatus={changeStatus}
                key={row.name}
              ></ItemRequestRow>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ItemRequestsTable;
