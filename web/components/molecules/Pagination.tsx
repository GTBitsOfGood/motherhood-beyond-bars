import React from "react";

const getFirstRecordOnPage = (currPage: number, pageSize: number) =>
  (currPage - 1) * pageSize + 1;

const getLastRecordOnPage = (
  firstRecordOnPage: number,
  pageSize: number,
  totalRecords: number
) => Math.min(firstRecordOnPage + pageSize - 1, totalRecords);

const isValidPage = (firstRecordOnPage: number, totalRecords: number) =>
  firstRecordOnPage > 0 && firstRecordOnPage <= totalRecords;

const getArrows = (
  firstRecordOnPage: number,
  totalRecords: number,
  currPage: number,
  pageSize: number
) => [
  { symbol: "<", disabled: firstRecordOnPage <= pageSize },
  { symbol: ">", disabled: totalRecords <= currPage * pageSize },
];

const ArrowButton = ({
  symbol,
  disabled,
}: {
  symbol: string;
  disabled: boolean;
}) => (
  <div
    className={`w-8 h-8 rounded border flex justify-center items-center font-bold text-xl ${
      disabled ? "text-gray-300" : "text-black"
    }`}
  >
    {symbol}
  </div>
);

function Pagination({
  totalRecords,
  pageSize,
  currPage,
}: {
  totalRecords: number;
  pageSize: number;
  currPage: number;
}) {
  const firstRecordOnPage = getFirstRecordOnPage(currPage, pageSize);
  const lastRecordOnPage = getLastRecordOnPage(
    firstRecordOnPage,
    pageSize,
    totalRecords
  );

  if (!isValidPage(firstRecordOnPage, totalRecords)) {
    return null;
  }

  const arrows = getArrows(firstRecordOnPage, totalRecords, currPage, pageSize);

  return (
    <div className="flex items-center gap-3 justify-end">
      <h1 className="text-sm font-bold">
        {firstRecordOnPage} - {lastRecordOnPage} of {totalRecords}
      </h1>
      <div className="flex items-center gap-2">
        {arrows.map(({ symbol, disabled }) => (
          <ArrowButton key={symbol} symbol={symbol} disabled={disabled} />
        ))}
      </div>
    </div>
  );
}

export default Pagination;
