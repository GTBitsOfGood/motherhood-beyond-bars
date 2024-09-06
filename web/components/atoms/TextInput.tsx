import React, { useState } from "react";

interface Props {
  onChange?: (arg0: any) => any;
  formValue?: object;
  currentValue?: string;
  placeholder?: string;
  errorMsg?: string;
}

export default function TextInput({
  onChange = undefined,
  formValue = {},
  currentValue = "",
  placeholder = "",
  errorMsg = "",
}: Props) {
  const [value, setValue] = useState(currentValue);

  return (
    <input
      type="text"
      {...formValue}
      className={
        "w-full py-2.5 px-2 bg-secondary-background items-center border border-light-gray rounded"
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
    // TODO add error message and error border, if there is an error message, show error border
    // There should always be a space for the error message, the space shouldn't disappear
    // when the error message isn't there
  );
}
