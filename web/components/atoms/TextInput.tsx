// import React, { useState } from "react";

// interface Props {
//   onChange?: (arg0: any) => any;
//   formValue?: object;
//   currentValue?: string;
//   placeholder?: string;
//   errorMsg?: string;
// }

// export default function TextInput({
//   onChange = undefined,
//   formValue = {},
//   currentValue = "",
//   placeholder = "",
//   errorMsg = ""
// }: Props) {
//   const [value, setValue] = useState(currentValue);

//   return (
//     <input
//       type="text"
//       {...formValue}
//       className={
//         "w-full py-2.5 px-2 bg-secondary-background items-center border border-light-gray rounded"
//       }
//       onChange={(event) => {
//         setValue(event.target.value);
//         if (onChange) {
//           onChange(event.target.value);
//         }
//       }}
//       placeholder={placeholder}
//       value={value}
//     />
//     // TODO add error message and error border, if there is an error message, show error border
//     // There should always be a space for the error message, the space shouldn't disappear
//     // when the error message isn't there
//   );
// }


import React, { useState } from "react";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  formValue?: object;
  showError?: boolean;
  error?: string;
  width?: number;
}

export default function TextInput({
  label,
  formValue = {},
  showError = true,
  error = "",
  width = 400,
  ...props
}: TextInputProps) {
  console.log(width);

  return (
    <div className="flex flex-col content-center items-start">
      <label>{label}</label>
      <input {...formValue} {...props} className={`w-[${width}px] h-[44px] border border-solid border-b-gray-300 rounded-[4px] box-border`}/>
      {showError && <p>{error}</p>}
    </div>
  );
}


// /* _Atom */

// box-sizing: border-box;

// /* Auto layout */
// display: flex;
// flex-direction: row;
// align-items: center;
// padding: 10px 8px;
// gap: 8px;
// 
// width: 400px;
// height: 44px;

// /* Function/background */
// background: #FAFBFC;
// /* Function/border */
// border: 1px solid #D9D9D9;
// border-radius: 4px;

// /* Inside auto layout */
// flex: none;
// order: 1;
// align-self: stretch;
// flex-grow: 0;
