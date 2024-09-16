import BackButton from "@components/atoms/BackButton";
// import Modal from "@components/atoms/Modal";
import NextButton from "@components/atoms/NextButton";
import TextArea from "@components/atoms/TextArea";
import TextInput from "@components/atoms/TextInput";
import { useAtom } from "jotai";
import { numAdultsAtom, numChildrenAtom, agesChildrenAtom, pageAtom } from "pages/caregiver/controls";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import { OnboardingFormData } from "@lib/types/users";
import { UseFormReturn } from "react-hook-form";

const Modal = dynamic(() => import('@components/atoms/Modal'), { ssr: false });

interface Props {
  setPage?: Dispatch<SetStateAction<number>>;
  form: UseFormReturn<OnboardingFormData>;
}

export default function HouseholdInfoPage({
  setPage,
  form
}: Props) {
  // const [numAdults, setNumAdults] = useAtom(numAdultsAtom);
  // const [numChildren, setNumChildren] = useAtom(numChildrenAtom);
  // const [agesChildren, setAgesChildren] = useAtom(agesChildrenAtom);

  const numAdultsError = form.getFieldState("numAdults").error;
  const numChildrenError = form.getFieldState("numChildren").error;
  const agesChildrenError = form.getFieldState("agesChildren").error;
  const hasError = numAdultsError || numChildrenError || agesChildrenError;
  console.log("XXX");
  useEffect(() => {
    console.log(numAdultsError);
  }, [hasError]);
  return (
    <div className="h-screen w-full flex flex-col items-start justify-between p-10 overriden px-6 gap-3 flex-grow">
      <div className="absolute top-[20px]">
        <BackButton />
      </div>
      <div className="absolute h-[calc(100%-100px)]">
        <h1 className="text-2xl font-bold text-center flex flex-row items-center justify-center leading-[33px]">Household Information</h1>
        <div className="space-y-6 flex flex-col items-center justify-center">
          <TextInput 
            label="Number of Adults"
            // value={numAdults}
            // onChange={(e) => {
            //   setNumAdults(e.target.value);
            // }}
            error={numAdultsError?.message}
            formValue={form.register("numAdults", {
              required: "Number of adults is required",
              // validate: value => (!value || !isNaN(value) ? true : "Adults must be a number")
              validate: value => {
                console.log("XXX");
                console.log(value);
                if (!value) return true;
                return !isNaN(value) ? true : "Adults must be a valid number";
              }
            })}
          />
          <TextInput 
            label="Number of Children (current)"
            // value={numChildren}
            // onChange={(e) => {
            //   setNumChildren(e.target.value);
            // }}
            error={numChildrenError?.message}
            formValue={form.register("numChildren", {
              required: "Number of children is required",
              validate: value => (!value || !isNaN(value) ? true : "Children must be a number")
            })}
          />
          <TextInput 
            label="Ages of Children"
            placeholder="ex. 3, 8, 11"
            // value={agesChildren}
            // onChange={(e) => {
            //   setAgesChildren(e.target.value);
            // }}
            error={agesChildrenError?.message}
            formValue={form.register("agesChildren", {
              required: "Ages of children are required",
              validate: value => {
                const agePattern = /^(\d+)(,\s*\d+)*$/;
                return !value || agePattern.test(value) ? true : "Ages must be a number separated by commas";
              }
            })}
          />
        </div>
        <div className="w-full flex justify-center mt-8">
          <NextButton disabled={!(!numAdultsError && !numChildrenError && !agesChildrenError)}/>
        </div>
      </div>
    </div>
  );
}
