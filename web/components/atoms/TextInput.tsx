import React, { useState } from "react";

interface Props {
  onChange?: (arg0: any) => any;
  formValue?: object;
  currentValue?: string;
  placeholder?: string;
  errorMsg?: string;
  inputType?: string;
  key?: string;
}

export default function TextInput({
  onChange = undefined,
  formValue = {},
  currentValue = "",
  placeholder = "",
  errorMsg = "",
  inputType = "text",
  key = "",
}: Props) {
  const [value, setValue] = useState(currentValue);

  return (
    <div>
      <input
        key={key}
        type={inputType}
        {...formValue}
        className={`w-full py-2.5 px-2 bg-secondary-background items-center border rounded ${errorMsg ? "border-error-red" : "border-light-gray"}`}
        onChange={(event) => {
          setValue(event.target.value);
          if (onChange) {
            onChange(event.target.value);
          }
        }}
        placeholder={placeholder}
        value={value}
      />
      <p className="w-auto text-error-red text-sm font-normal font-opensans">
        {errorMsg}
      </p>
    </div>
  );
}
