import { ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
  value?: boolean;
  onChange?: (value: boolean) => void;
}

export default function CheckboxText({ value, onChange, children }: Props) {
  const [checked, setChecked] = useState(value);

  return (
    <button
      className="flex gap-2 bg-white shadow border border-light-gray"
      aria-roledescription="checkbox"
      onClick={() =>
        setChecked((prev) => {
          onChange?.(!prev);
          return !prev;
        })
      }
    >
      {/** TODO: <Checkbox value={value} /> */}
      <input type="checkbox" checked={checked} aria-hidden />
      {children}
    </button>
  );
}
