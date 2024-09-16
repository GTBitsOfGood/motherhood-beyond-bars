import { ReactNode, useState } from "react";

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
      {/** TODO: <Checkbox value={value} /> */}
      <input type="checkbox" name={label} checked={checked} />
      <label htmlFor={label}>{label}</label>
    </button>
  );
}
