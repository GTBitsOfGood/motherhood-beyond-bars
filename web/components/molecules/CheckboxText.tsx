import { useState } from "react";

interface Props {
  label: string;
  value?: boolean;
  onChange?: (value: boolean) => void;
}

export default function CheckboxText({ value, onChange, label }: Props) {
  const [checked, setChecked] = useState(value ?? false);

  return (
    <button
      className="flex gap-2 bg-white items-center"
      onClick={() =>
        setChecked((prev) => {
          onChange?.(!prev);
          return !prev;
        })
      }
    >
      <input
        className="cursor-pointer self-start mt-1.5"
        type="checkbox"
        name={label}
        checked={checked}
        readOnly
      />
      <label className="cursor-pointer text-left" htmlFor={label}>
        {label}
      </label>
    </button>
  );
}
