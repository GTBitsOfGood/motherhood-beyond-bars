import React from "react";

function ButtonWithIcon({
  icon,
  text,
  onClick,
}: {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
}) {
  return (
    <button
      className="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center border-2"
      onClick={onClick}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
}

export default ButtonWithIcon;
