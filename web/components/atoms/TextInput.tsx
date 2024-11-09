import React, { ReactNode, useState } from "react";
import ErrorText from "./ErrorText";
import keyboardScroll from "@lib/utils/keyboardScroll";

interface Props {
  label?: ReactNode;
  disabled?: boolean;
  onChange?: (value: string) => void;
  formValue?: Record<string, any>;
  currentValue?: string;
  placeholder?: string;
  error?: string;
  inputType?: string;
  key?: string;
}

export default function TextInput({
  label = "",
  disabled = false,
  onChange,
  formValue = {},
  currentValue = "",
  placeholder = "",
  error = "",
  inputType = "text",
  key = "",
}: Props) {
  const [value, setValue] = useState(currentValue);

  return (
    <div className="flex flex-col">
      {label && (
        <label
          className="text-black text-base font-normal leading-normal"
          htmlFor={formValue ? formValue.name : undefined}
        >
          {label}
        </label>
      )}
      <input
        key={key}
        type={inputType}
        onFocus={(e) => keyboardScroll(e)}
        {...formValue}
        className={`w-full py-2.5 px-2 bg-secondary-background items-center border rounded ${disabled ? "!bg-light-gray" : "!bg-secondary-background"} ${error ? "border-error-red" : "border-light-gray"}`}
        onClick={(event) => {
          event.stopPropagation();
        }}
        onChange={(event) => {
          setValue(event.target.value);
          if (onChange) {
            onChange(event.target.value);
          }
        }}
        placeholder={placeholder}
        value={value}
      />
      {<ErrorText error={error} />}
    </div>
  );
}