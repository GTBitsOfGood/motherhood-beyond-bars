import React from "react";
import Pagination from "@components/molecules/Pagination/Pagination";
import CaretakerTable from "@components/tables/CaretakerTable";
import BabiesTable from "@components/tables/BabiesTable";
import { BABIES_TAB, CAREGIVERS_TAB } from "@lib/utils/consts";
import SearchBar from "@components/atoms/SearchBar";

export default function PaginatedTable({
  type,
  tableProps,
  paginatedProps,
  onNextPage,
  onPrevPage,
  onSearch,
}: any) {
  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="border" />
        <div className="flex flex-col gap-4 mb-3 w-[65vw]">
          <SearchBar onSearch={onSearch} />
          <div className="overflow-auto h-[70vh]">
            {type == BABIES_TAB ? (
              <BabiesTable props={tableProps} />
            ) : type == CAREGIVERS_TAB ? (
              <CaretakerTable props={tableProps} />
            ) : (
              <></>
            )}
          </div>
          <div>
            <Pagination
              totalRecords={paginatedProps.totalRecords}
              currPage={paginatedProps.pageNumber}
              onNextPage={onNextPage}
              onPrevPage={onPrevPage}
            />
          </div>
        </div>
      </div>
    </>
  );
}
