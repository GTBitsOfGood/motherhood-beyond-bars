import React, { useEffect, useState } from "react";
import ItemRequestRow from "./ItemRequestRow";
import { Caregiver } from "@lib/types/users";

function ItemRequestsTable({
  columns,
  data,
  selectedRows,
  setSelectedRows,
}: {
  columns: any[];
  data: Caregiver[];
  selectedRows: string[];
  setSelectedRows: any;
}) {
  return (
    <div className="flex flex-col w-full">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                scope="col"
                className="px-6 pt-4 text-base font-normal tracking-wider text-left text-slate-500"
                key={column.Header}
              >
                {column.Header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* TODO see how Deleting requests works and if this needs to be updated */}
          {data
            .reduce<Array<Caregiver>>((arr, row) => {
              if (row.itemsRequested && row.itemsRequested.items.length) {
                arr.push(row);
              }
              return arr;
            }, [])
            .map((row, index) => {
              return (
                <ItemRequestRow
                  row={row}
                  key={row.id}
                  index={index}
                  selectedRows={selectedRows}
                  setSelectedRows={setSelectedRows}
                ></ItemRequestRow>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default ItemRequestsTable;
