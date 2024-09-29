import { Dispatch, SetStateAction } from "react";
import { Controller, UseFormReturn } from "react-hook-form";

import { OnboardingFormData } from "@lib/types/users";

import Button from "@components/atoms/Button";
import DatePicker from "@components/atoms/DatePicker";
import TextInput from "@components/atoms/TextInput";
import CheckboxText from "@components/molecules/CheckboxText";
import ErrorToast from "./ErrorToast";

interface Props {
  setPage: Dispatch<SetStateAction<number>>;
  form: UseFormReturn<OnboardingFormData>;
}

export default function LiabilityWaiverPage({ setPage, form }: Props) {
  const agreeError = form.getFieldState("agreedToWaiver").error;
  const dateError = form.getFieldState("agreedDate").error;
  const signatureError = form.getFieldState("agreedSignature").error;
  const hasError = !!(agreeError || dateError || signatureError);

  return (
    <div className="flex flex-col px-6 gap-3 flex-grow sm:items-center mb-8">
      {/* TODO replace with Error banner and fix formatting */}
      {agreeError && <ErrorToast text="Must agree to the Liability Waiver" />}
      <h1 className="text-primary-text text-2xl font-bold font-opensans sm:text-center sm:mt-8">
        Liability Waiver
      </h1>
      {/* TODO Pull waivers from database */}
      <div className="bg-secondary-background border border-light-gray overflow-auto shrink-0 pt-2 px-3 max-h-[300px] sm:w-[80%]">
        <p>
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
      <Controller
        control={form.control}
        name="agreedToWaiver"
        defaultValue={false}
        rules={{
          validate: (v) => (!v ? "Must aggree to the Liability Waiver" : true),
        }}
        render={({ field: { name, onBlur, onChange, ref, value } }) => (
          <CheckboxText
            label="I agree to the Liability Waiver"
            value={value}
            onChange={(v) => onChange(v)}
          />
        )}
      />
      <div className="sm:w-[60%]">
        <div className="mb-2">
          <TextInput
            label="Signature"
            error={form.formState.errors.agreedSignature?.message}
            formValue={form.register("agreedSignature", {
              validate: (v) => (!v ? "Address cannot be empty" : true),
            })}
          />
        </div>
        <div className="mb-2">
          {/* TODO set default date to today */}
          <Controller
            control={form.control}
            name="agreedDate"
            rules={{
              validate: (v) => (!v ? "Date cannot be empty" : true),
            }}
            render={({ field: { name, onBlur, onChange, ref, value } }) => (
              <DatePicker
                label="Date"
                value={value}
                onChange={(v) => onChange(v)}
                error={form.formState.errors.agreedDate?.message}
              />
            )}
          />
        </div>

        <Button
          text="Next"
          disabled={!!hasError}
          onClick={async () => {
            const isValid = await form.trigger(undefined, {
              shouldFocus: true,
            });
            if (!isValid) return;

            setPage((prev) => prev + 1);
          }}
        />
      </div>
    </div>
  );
}
