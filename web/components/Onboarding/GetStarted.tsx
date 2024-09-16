import Checkbox from "@components/atoms/Checkbox";
import CheckboxCard from "@components/atoms/CheckboxCard";
import TextArea from "@components/atoms/TextArea";
// import Modal from "@components/atoms/Modal";
import { useState } from "react";
import dynamic from 'next/dynamic';

const Modal = dynamic(() => import('@components/atoms/Modal'), { ssr: false });
interface Props {
  setPage: (arg0: any) => any;
}

export default function GetStartedPage({ setPage }: Props) {
  const [check, setCheck] = useState(true);
  const [open, setOpen] = useState(true);
  return (
    <div>
      <TextArea label="abc"></TextArea>
      <Checkbox label="bcd"></Checkbox>
      <CheckboxCard title="123" checked = {check} onChange={() => {
        setCheck(!check);
      }}></CheckboxCard>
      <Modal isOpen = {open} onClose = {() => {
        setOpen(false)
      }}>
        <div>asdfsadfasdjgkl;asdkgjlasdjk;gasd;klg</div>
      </Modal>
    </div>
  );
}
