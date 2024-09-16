// import React, { useState } from "react";
// import Button from "./Button";

// interface Props {
// }

// export default function IconButton({
// }: Props) {

//   return;
// }


import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export default function IconButton({ 
  icon, 
  children, 
  ...props
}: ButtonProps) {
  return (
    <button {...props}>
      {icon && <span className="m-[5px]">{icon}</span>}
      <span className="my-[5px]">{children}</span>
    </button>
  );
};
