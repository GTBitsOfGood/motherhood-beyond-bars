// import React, { Component, ReactComponentElement, useState } from "react";
// import Checkbox from "./Checkbox";
// import Column from "./Column";
// import Row from "./Row";

// interface Props {
//     title: string,
//     description?: string,
// }

// export default function TextInput({
//     title = "",
//     description = "",
// }: Props) {
//     return (
//         <div>
//             <Row>
//                 <Checkbox/>
//                 <Column>
//                     <text>{title}</text>
//                     <text>{description}</text>
//                 </Column>
//             </Row>
//         </div>
//     );
// }


import React from 'react';
import Checkbox from 'components/atoms/Checkbox';
import TextArea from 'components/atoms/Checkbox';
import TextInput from './TextInput';

interface CheckboxCardProps {
  title: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  isClothing?: boolean;
}


export default function CheckboxCard({ 
    title, 
    description, 
    checked, 
    onChange,
    isClothing
}: CheckboxCardProps) {
  return (
    <div className="shadow-[0_3px_16px_rgba(71,80,123,0.12)] rounded flex flex-row items-start content-center px-[0px] py-[10px] mx-[20px] my-[10px] w-[300px]" onClick={() => onChange(!checked)}>
      <Checkbox checked={checked} onChange={() => {}} />
      <div className="mx-[10px] text-[#666666]">
        <h1 className="text-nowrap font-semibold text-[16px] leading-[24px]">{title}</h1>
        {description && <p className="text-wrap font-normal text-[14px] leading-[19px]">{description}</p>}
        {
            isClothing && checked && 
                <div className='flex flex-row items-center content-center'>
                    <TextInput label="Gender" width={50} onClick={(e) => e.stopPropagation()}/>
                    <TextInput label="Clothing Size" width={50} onClick={(e) => e.stopPropagation()}/>
                </div>
        }
      </div>
    </div>
  );
};