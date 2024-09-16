import Button from "@components/atoms/Button";
import DatePicker from "@components/atoms/DatePicker";
import TextInput from "@components/atoms/TextInput";
import CheckboxText from "@components/molecules/CheckboxText";
import { OnboardingFormData } from "@lib/types/users";
import { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";

interface Props {
  setPage: Dispatch<SetStateAction<number>>;
  form: UseFormReturn<OnboardingFormData>;
}

export default function LiabilityWaiverPage({ setPage, form }: Props) {
  return (
    <div className="flex flex-col px-6 gap-3 flex-grow">
      <h1 className="text-primary-text text-2xl font-bold font-opensans sm:text-center">
        Liability Waiver
      </h1>
      <div className="bg-secondary-background border border-light-gray overflow-auto shrink-0 pt-2 px-3 max-h-[300px]">
        <p>
          {/* TODO: Full Waiver here */}
          PARTICIPANT RELEASE AND WAIVER OF LIABILITY In consideration for the
          willingness of Motherhood Beyond Bars (“Organization”) to accept the
          individual signing below (“Participant”), as a participant in its
          Infant and Caregiver Support program or Reentry and Reunification
          program (the “Program”), and in consideration for Participant
          accepting the Donated Items (as defined below), and for other good and
          valuable consideration, the receipt and sufficiency of which are
          acknowledged, Participant does freely, voluntarily and without duress
          execute the following Release for and on behalf of him or herself and
          his or her heirs, successors, beneficiaries and assigns: 1. Donated
          Items. Participant acknowledges receipt from Organization of items,
          including those described in the attached document, which may be
          provided at any time during the Program (“Donated Items”).
          Organization is providing the Donated Items at no charge. Participant
          voluntarily accepts the Donated Items “As-Is.”
        </p>
      </div>
      <CheckboxText label="I agree to the Liability Waiver" />
      <div className="mt-3">
        <TextInput label="Signature" />
      </div>
      <div className="mb-6">
        <DatePicker label="Date" /> {/* TODO: <DatePicker /> */}
      </div>
      <div className="flex-grow" />
      <Button text="Next" onClick={() => setPage((prev) => prev + 1)} />
    </div>
  );
}
