import CheckboxCard from "@components/atoms/CheckboxCard";
import TextArea from "@components/atoms/TextArea";
import { Dispatch, SetStateAction, useState } from "react";
import { atom, useAtom } from 'jotai';
import BackButton from "@components/atoms/BackButton";
import ProgressBar from "@components/atoms/ProgressBar";
import NextButton from "@components/atoms/NextButton";
import { bbCheckedAtom, csCheckedAtom, spsCheckedAtom, bcCheckedAtom, additionalRequestsAtom, pageAtom } from "pages/caregiver/controls";
// import Modal from "@components/atoms/Modal";
import dynamic from 'next/dynamic';
import IconButton from "@components/atoms/IconButton";
import { OnboardingFormData } from "@lib/types/users";
import { UseFormReturn } from "react-hook-form";

const Modal = dynamic(() => import('@components/atoms/Modal'), { ssr: false });

interface Props {
  setPage?: Dispatch<SetStateAction<number>>;
  form: UseFormReturn<OnboardingFormData>;
}

export default function RequestItemsPage({
  form
}: Props) {
  const [bbChecked, setBBChecked] = useAtom(bbCheckedAtom); // for Begin Box
  const [csChecked, setCSChecked] = useAtom(csCheckedAtom); // for Car Seat
  const [spsChecked, setSPSChecked] = useAtom(spsCheckedAtom); // for Safe Place to Sleep
  const [bcChecked, setBCChecked] = useAtom(bcCheckedAtom); // for Baby Clothing
  const [addtionalRequests, setAdditionalRequests] = useAtom(additionalRequestsAtom);
  const [open, setOpen] = useState(false);

  const [page, setPage] = useAtom(pageAtom);

  return (
    <div className="h-screen w-full flex flex-grow flex-col items-start justify-between p-10 overriden">
      <div className="absolute top-[20px]">
        <BackButton />
      </div>
      <div className="absolute w-[calc(100%-100px)]">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold text-center flex flex-row items-center justify-center leading-[33px]">Request Items</h1>
          <p className="font-normal text-[#000000] text-[16px] leading-[22px]">Motherhood Beyond Bars will deliver you supplies, so you're ready for the child!</p>

        <CheckboxCard 
          title="Begin Box"
          description="Clothing, blankets, bottles, pacifiers, bathing supplies, diapers, wipes, diaper cream, formula, burp cloths, & toys!"
          checked={bbChecked}
          onChange={() => {
            setBBChecked(!bbChecked);
            // form.register("bbChecked");
          }}
        />

        <CheckboxCard 
          title="Car Seat"
          description="A necessity for transporting the baby"
          checked={csChecked}
          onChange={() => {
            setCSChecked(!csChecked);
          }}
        />

        <CheckboxCard 
          title="A Safe Place to Sleep"
          description="May include a portable bassinet, crib, pack & play, or play pen"
          checked={spsChecked}
          onChange={() => {
            setSPSChecked(!spsChecked);
          }}
        />

        <CheckboxCard 
          title="Baby Clothing"
          description="Additional baby clothing to what’s inside the Begin Box"
          isClothing={true}
          checked={bcChecked}
          onChange={() => {
            setBCChecked(!bcChecked);
          }}
        />

        <TextArea 
          label="Additional Requests of Comments"
          value={addtionalRequests}
          onChange={(e) => {
            setAdditionalRequests(e.target.value);
          }}
        />

        <p className="font-semibold text-[14px] leading-[19px] text-[#666666]">Expect a call from us to confirm the order details!</p>
        <Modal onClose={() => setOpen(false)} isOpen={open}>
          <h2 className="text-lg font-bold mb-4">Do you have your own car seat?</h2>
          <p>Please confirm that you have a car seat suitable for the baby. You won’t be able to take them home without it!</p>
          <div className="flex flex-row justify-center space-x-4 mt-4">
            <IconButton 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M9 21h9c.8 0 1.5-.5 1.8-1.2l3-7c.5-1.2-.4-2.8-1.8-2.8h-7.5l.8-3.8c.2-.9-.3-1.7-1.2-1.7h-.4c-.3 0-.6.1-.8.3l-5 5c-.4.4-.5 1-.3 1.5l1.2 4c.2.7.9 1.2 1.6 1.2zm0-2c-.5 0-.9-.3-1.1-.8l-1.2-4c-.1-.3-.1-.7.1-1l5-5c.5-.4 1.2-.7 1.9-.7h.4c1.1 0 2.1.8 2.3 1.9l.8 3.7h6.4c.8 0 1.4.6 1.3 1.4l-3 7c-.2.5-.7.9-1.3.9h-9v-3.1h-4.5c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4h4.5v-1.1z"/>
                </svg>
              }
              onClick={() => {
                setOpen(false);
                setPage(page + 1);
              }} 
              className="bg-pink-500 text-white p-2 rounded flex flex-row"
            >
              Yep, I do!
            </IconButton>
            <IconButton 
              icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M15 3H6c-.8 0-1.5.5-1.8 1.2l-3 7c-.5 1.2.4 2.8 1.8 2.8h7.5l-.8 3.8c-.2.9.3 1.7 1.2 1.7h.4c.3 0 .6-.1.8-.3l5-5c.4-.4.5-1 .3-1.5l-1.2-4c-.2-.7-.9-1.2-1.6-1.2zm0 2c.5 0 .9.3 1.1.8l1.2 4c.1.3.1.7-.1 1l-5 5c-.5.4-1.2.7-1.9.7h-.4c-1.1 0-2.1-.8-2.3-1.9l-.8-3.7H4.5c-.8 0-1.4-.6-1.3-1.4l3-7c.2-.5.7-.9 1.3-.9h9v3.1h4.5c.8 0 1.4.6 1.4 1.4s-.6 1.4-1.4 1.4H15v1.1z"/>
              </svg>}
              onClick={() => {
                setOpen(false);
                setCSChecked(true);
              }} 
              className="bg-gray-500 text-white p-2 rounded flex flex-row"
            >
                No, I don’t.
            </IconButton>
          </div>
        </Modal>
        <div className="w-full flex justify-center mt-8">
          <NextButton 
            onClick={() => {
              if (!csChecked) setOpen(true); // if user don't have a car seat, open the modal to confirm again
              else setPage(page + 1);
            }}
          />
        </div>

        </div>
      </div>
    </div>
  );
}