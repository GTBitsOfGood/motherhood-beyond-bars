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
  key?: string;
  required?: boolean;
}

export default function TextArea({
  label = "",
  disabled = false,
  onChange,
  formValue = {},
  currentValue = "",
  placeholder = "",
  error = "",
  key = "",
  required = false,
}: Props) {
  const [value, setValue] = useState(currentValue);

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label
          className="text-black text-base font-normal leading-normal"
          htmlFor={formValue ? formValue.name : undefined}
        >
          {label}
          {required && <span className="text-asterisks-red text-sm">*</span>}
        </label>
      )}
      <textarea
        key={key}
        onFocus={(e) => keyboardScroll(e)}
        {...formValue}
        className={`w-full py-2.5 px-2 bg-secondary-background items-center border rounded h-32 max-h-[200px] min-h-[75px]
            ${disabled ? "!bg-light-gray" : "!bg-secondary-background"} ${error ? "border-error-red" : "border-light-gray"}`}
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
      <ErrorText error={error} />
    </div>
  );
}
