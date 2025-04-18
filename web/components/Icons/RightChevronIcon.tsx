const RightChevronIcon = ({ color = "white" }: { color?: string }) => {
  return (
    <svg
      width="12"
      height="20"
      viewBox="0 0 12 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.25 2.5L9.75 10L2.25 17.5"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default RightChevronIcon;
