// import React, { useState } from "react";

// interface Props {
//   onChange?: (arg0: any) => any;
//   formValue?: object;
//   currentValue?: string;
//   placeholder?: string;
// }

// export default function TextArea({
//   onChange = undefined,
//   formValue = {},
//   currentValue = "",
//   placeholder = "",
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
//   );
// }


import React, { useState } from "react";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  width?: number;
  height?: number;
}

export default function TextArea({
  label,
  width = 400,
  height = 200,
  ...props
}: TextAreaProps) {

  return (
    <div className="flex flex-col content-center items-start">
      <label>{label}</label>
      <textarea className={`w-[${width}px] h-[${height}px] border border-solid border-b-gray-300 rounded-[4px] box-border background-[#FAFBFC p-[10px 8px] gap-[8px]`} {...props}/>
    </div>
  );
}