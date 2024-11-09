import { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";

import { OnboardingFormData } from "@lib/types/users";

import TextInput from "@components/atoms/TextInput";
import Button from "@components/atoms/Button";

interface Props {
  setPage: Dispatch<SetStateAction<number>>;
  form: UseFormReturn<OnboardingFormData>;
}

export default function HouseholdInfoPage({ setPage, form }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const numAdultsError = form.getFieldState("numAdults").error;
  const numChildrenError = form.getFieldState("numChildren").error;
  const agesChildrenError = form.getFieldState("agesOfChildren").error;
  const hasError = numAdultsError || numChildrenError || agesChildrenError;

  return (
    <div className="flex flex-col px-6 flex-grow sm:items-center w-full sm:w-[60%] mb-8">
      <h1 className="text-primary-text text-2xl font-bold font-opensans sm:text-center mb-6 mt-2 sm:mt-0">
        Household Information
      </h1>
      <div className="space-y-6 flex flex-col items-center justify-center w-full">
        <TextInput
          label="Number of Adults"
          key="numAdults"
          error={errors.numAdults?.message}
          formValue={form.register("numAdults", {
            required: "Number of adults is required",
            validate: (value) => {
              if (!value) return true;
              return !isNaN(value) ? true : "Adults must be a valid number";
            },
          })}
        />
        <TextInput
          label="Number of Children (current)"
          key="numChildren"
          error={errors.numChildren?.message}
          formValue={form.register("numChildren", {
            required: "Number of children is required",
            validate: (value) =>
              !value || !isNaN(value) ? true : "Children must be a number",
          })}
        />
        <TextInput
          label="Ages of Children"
          key="agesChildren"
          placeholder="ex. 3, 8, 11"
          error={errors.agesOfChildren?.message}
          formValue={form.register("agesOfChildren", {
            required: "Ages of children are required",
            validate: (value) => {
              const agePattern = /^(\d+)(,\s*\d+)*$/;
              return !value || agePattern.test(value)
                ? true
                : "Ages must be a number separated by commas";
            },
          })}
        />
      </div>
      <div className="w-full flex justify-center mt-8">
        <Button
          text="Next"
          disabled={!!hasError}
          onClick={async () => {
            // TODO fix error not erasing when fixed
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
