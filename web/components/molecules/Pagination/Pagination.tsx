import { PAGINATION_PAGE_SIZE } from "db/consts";
import React from "react";

// const pageSize = PAGINATION_PAGE_SIZE;

const getFirstRecordOnPage = (currPage: number, pageSize: number) =>
  (currPage - 1) * pageSize + 1;

const getLastRecordOnPage = (
  firstRecordOnPage: number,
  pageSize: number,
  totalRecords: number
) => Math.min(firstRecordOnPage + pageSize - 1, totalRecords);

const isValidPage = (firstRecordOnPage: number, totalRecords: number) =>
  firstRecordOnPage > 0 && firstRecordOnPage <= totalRecords;

const LeftArrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M15.1599 7.41L10.5799 12L15.1599 16.59L13.7499 18L7.74991 12L13.7499 6L15.1599 7.41Z"
      fill="currentColor"
    />
  </svg>
);

const RightArrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M8.84009 7.41L13.4201 12L8.84009 16.59L10.2501 18L16.2501 12L10.2501 6L8.84009 7.41Z"
      fill="currentColor"
    />
  </svg>
);

const getArrows = (
  firstRecordOnPage: number,
  totalRecords: number,
  currPage: number,
  pageSize: number,
  onNextPage: any,
  onPrevPage: any
) => [
  {
    symbol: <LeftArrow />,
    disabled: firstRecordOnPage <= pageSize,
    onClick: onPrevPage,
  },
  {
    symbol: <RightArrow />,
    disabled: totalRecords <= currPage * pageSize,
    onClick: onNextPage,
  },
];

const ArrowButton = ({
  symbol,
  disabled,
  onClick,
}: {
  symbol: JSX.Element;
  disabled: boolean;
  onClick: () => void;
}) => (
  <div
    className={`w-8 h-8 rounded border flex justify-center items-center font-bold text-xl ${
      disabled
        ? "text-gray-300 cursor-not-allowed"
        : "text-black cursor-pointer"
    }`}
    onClick={!disabled ? onClick : undefined}
  >
    {symbol}
  </div>
);

function Pagination({
  totalRecords,
  currPage,
  pageSize,
  onNextPage,
  onPrevPage,
}: {
  totalRecords: number;
  currPage: number;
  pageSize: number;
  onNextPage: any;
  onPrevPage: any;
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

  const arrows = getArrows(
    firstRecordOnPage,
    totalRecords,
    currPage,
    pageSize,
    onNextPage,
    onPrevPage
  );

  return (
    <div className="flex items-center gap-3 justify-end">
      <h1 className="text-sm font-bold">
        {firstRecordOnPage} - {lastRecordOnPage} of {totalRecords}
      </h1>
      <div className="flex items-center gap-2">
        {arrows.map(({ symbol, disabled, onClick }, index) => (
          <ArrowButton
            key={index}
            symbol={symbol}
            disabled={disabled}
            onClick={onClick}
          />
        ))}
      </div>
    </div>
  );
}

export default Pagination;
