import { PAGINATION_PAGE_SIZE } from "db/consts";
import React from "react";

const pageSize = PAGINATION_PAGE_SIZE;

const getFirstRecordOnPage = (currPage: number) =>
  (currPage - 1) * pageSize + 1;

const getLastRecordOnPage = (
  firstRecordOnPage: number,
  totalRecords: number
) => Math.min(firstRecordOnPage + pageSize - 1, totalRecords);

const isValidPage = (firstRecordOnPage: number, totalRecords: number) =>
  firstRecordOnPage > 0 && firstRecordOnPage <= totalRecords;

const getArrows = (
  firstRecordOnPage: number,
  totalRecords: number,
  currPage: number,
  onNextPage: any,
  onPrevPage: any
) => [
  { symbol: "<", disabled: firstRecordOnPage <= pageSize, onClick: onPrevPage },
  { symbol: ">", disabled: totalRecords <= currPage * pageSize, onClick: onNextPage },
];

const ArrowButton = ({
  symbol,
  disabled,
  onClick
}: {
  symbol: string;
  disabled: boolean;
  onClick: () => void;
}) => (
  <div
    className={`w-8 h-8 rounded border flex justify-center items-center font-bold text-xl ${
      disabled ? "text-gray-300 cursor-not-allowed" : "text-black cursor-pointer"
    }`}
    onClick={!disabled ? onClick : undefined}
  >
    {symbol}
  </div>
);

function Pagination({
  totalRecords,
  currPage,
  onNextPage,
  onPrevPage
}: {
  totalRecords: number;
  currPage: number;
  onNextPage: any;
  onPrevPage: any;
}) {
  const firstRecordOnPage = getFirstRecordOnPage(currPage);
  const lastRecordOnPage = getLastRecordOnPage(
    firstRecordOnPage,
    totalRecords
  );

  if (!isValidPage(firstRecordOnPage, totalRecords)) {
    return null;
  }

  const arrows = getArrows(firstRecordOnPage, totalRecords, currPage, onNextPage, onPrevPage);

  return (
    <div className="flex items-center gap-3 justify-end">
      <h1 className="text-sm font-bold">
        {firstRecordOnPage} - {lastRecordOnPage} of {totalRecords}
      </h1>
      <div className="flex items-center gap-2">
        {arrows.map(({ symbol, disabled, onClick }) => (
          <ArrowButton key={symbol} symbol={symbol} disabled={disabled} onClick={onClick}/>
        ))}
      </div>
    </div>
  );
}

export default Pagination;
