import Button from "@components/atoms/Button";
import { OnboardingFormData } from "@lib/types/users";
import { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";

interface Props {
  setPage: Dispatch<SetStateAction<number>>;
  form: UseFormReturn<OnboardingFormData>;
}

export default function PreferredContactPage({ setPage, form }: Props) {
  return (
    <div className="flex flex-col px-6 gap-3 flex-grow">
      <h1 className="text-primary-text text-2xl font-bold font-opensans">
        What’s the best way to contact you?
      </h1>
      <input type="radio" />
      <input type="radio" />
      <input type="radio" />
      <div className="flex-grow" />
      <Button
        text="Finish"
        onClick={() => {
          // TODO: submit form data
        }}
      />
    </div>
  );
}
