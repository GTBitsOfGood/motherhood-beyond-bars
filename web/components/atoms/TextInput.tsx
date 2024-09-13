import React, { ChangeEvent } from "react";
import ErrorText from "./ErrorText";
import keyboardScroll from "@lib/utils/KeyboardScroll";

interface Props {
  label: string;
  disabled?: boolean;
  onChange?: (value: ChangeEvent<HTMLInputElement>) => void;
  formValue?: object;
  currentValue?: string;
  placeholder?: string;
  error?: string;
}

export default function TextInput({
  label,
  disabled,
  onChange,
  formValue = {},
  currentValue = "",
  placeholder = "",
  error,
}: Props) {
  return (
    <div className="flex flex-col">
      <label className="font-opensans text-base" htmlFor={label}>
        {label}
      </label>
      <input
        type="text"
        onFocus={(e) => keyboardScroll(e)}
        {...formValue}
        name={label}
        className={`w-full mt-2 py-2.5 px-2 bg-secondary-background items-center border border-light-gray rounded ${disabled ? "!bg-light-gray" : "!bg-secondary-background"} !text-primary-text ${error ? "!border-[#FF3939]" : "!border-light-gray"}`}
        onChange={onChange}
        placeholder={placeholder}
      />
      <ErrorText error={error} />
    </div>
  );
}
