const LeftChevronIcon = ({ width = 12, height = 20 }) => {
  return (
    <svg
      width={width}
      height={height}
      className="fill-current"
      viewBox="0 0 12 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.3381 18.9631C10.7889 19.5122 9.89855 19.5122 9.34938 18.9631L1.38063 10.9944C0.831458 10.4452 0.831458 9.5548 1.38063 9.00563L9.34938 1.03688C9.89855 0.487708 10.7889 0.487708 11.3381 1.03688C11.8872 1.58605 11.8872 2.47645 11.3381 3.02561L4.36373 10L11.3381 16.9744C11.8872 17.5236 11.8872 18.4139 11.3381 18.9631Z"
      />
    </svg>
  );
};

export default LeftChevronIcon;
