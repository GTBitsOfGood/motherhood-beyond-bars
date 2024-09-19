import React, { useState } from "react";

interface Props {
  onChange?: (arg0: any) => any;
  formValue?: object;
  currentValue?: string;
  placeholder?: string;
  errorMsg?: string;
  inputType?: string;
}

export default function TextInput({
  onChange = undefined,
  formValue = {},
  currentValue = "",
  placeholder = "",
  errorMsg = "",
  inputType = "text",
}: Props) {
  const [value, setValue] = useState(currentValue);

  const hasError = !!errorMsg

  return (
    <div>
      <input
      type={inputType}
      {...formValue}
      className={
        `w-full py-2.5 px-2 bg-secondary-background items-center border rounded mb-[1%] ${hasError ? "border-error-red" : "border-light-gray"}`
      }
      onChange={(event) => {
        setValue(event.target.value);
        if (onChange) {
          onChange(event.target.value);
        }
      }}
      placeholder={placeholder}
      value={value}
      />
      <p className="w-auto text-[#e50606] text-sm font-normal font-opensans">
        {errorMsg}
      </p>
    </div>
  );
}
