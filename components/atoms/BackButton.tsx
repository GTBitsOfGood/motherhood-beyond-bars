import { MouseEventHandler } from "react";

interface Props {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  darkerColor?: boolean;
}

export default function BackButton({ onClick, disabled, darkerColor }: Props) {
  return (
    <button
      className={`group flex items-center gap-[2px] text-base font-normal ${!darkerColor ? "text-medium-gray" : "text-primary-text font-semibold"}`}
      onClick={onClick}
      disabled={disabled}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M15 18L9 12L15 6"
          className={`${!darkerColor ? "stroke-medium-gray" : "stroke-primary-text group-hover:stroke-dark-gray"} ${disabled ? "stroke-dark-gray" : "group-hover:stroke-dark-gray"}`}
          strokeWidth="3"
          strokeLinecap="square"
          strokeLinejoin="round"
        />
      </svg>
      <div
        className={`${disabled ? "text-dark-gray" : "group-hover:text-dark-gray"}`}
      >
        Back
      </div>
    </button>
  );
}
