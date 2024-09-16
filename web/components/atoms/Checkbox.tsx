// import React, { useState } from "react";

// interface Props {
//     disabled?: boolean;
// }

// export default function Checkbox({
//     disabled = false,
// }: Props) {
//     return (
//         <input type="checkbox" disabled={disabled}/>
//     );
// }


import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Checkbox({
    label,
    ...props 
}: CheckboxProps) {
  return (
    <label className="checkbox-wrapper">
      <input type="checkbox" className="checkbox-input" {...props} />
      <span className="checkbox-checkmark"></span>
      {label && <span className="checkbox-label">{label}</span>}
    </label>
  );
};
