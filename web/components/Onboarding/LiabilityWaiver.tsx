import { Dispatch, SetStateAction, useEffect } from "react";
import {
  Controller,
  useFieldArray,
  UseFieldArrayReturn,
  UseFormReturn,
} from "react-hook-form";

import { OnboardingFormData } from "@lib/types/users";

import Button from "@components/atoms/Button";
import DatePicker from "@components/atoms/DatePicker";
import TextInput from "@components/atoms/TextInput";
import CheckboxText from "@components/molecules/CheckboxText";
import ErrorToast from "./ErrorToast";
import { BrowserWaiver } from "@lib/types/common";
import MarkdownIt from "markdown-it";

interface Props {
  setPage: Dispatch<SetStateAction<number>>;
  form: UseFormReturn<OnboardingFormData>;
  waiverFields: UseFieldArrayReturn<OnboardingFormData, "waivers", "id">;
}

const mdRender = new MarkdownIt();

export default function LiabilityWaiverPage({
  setPage,
  form,
  waiverFields: { fields },
}: Props) {
  // Checks if any of the waivers has an error to prevent submission
  const hasError = fields.some(
    (_, i) =>
      form.getFieldState(`waivers.${i}.agreedToWaiver`).error ||
      form.getFieldState(`waivers.${i}.agreedDate`).error ||
      form.getFieldState(`waivers.${i}.agreedSignature`).error
  );

  return (
    <div className="flex flex-col px-6 gap-3 flex-grow sm:items-center mb-8 overflow-hidden">
      <div className="overflow-auto flex flex-col gap-4 p-4">
        {fields.map(({ id, waiver, ...values }, i) => {
          const agreeError = form.getFieldState(
            `waivers.${i}.agreedToWaiver`
          ).error;

          return (
            <div
              key={id}
              className="flex flex-col items-stretch gap-2 border p-4 rounded"
            >
              {agreeError && <ErrorToast text="Must agree to the waiver" />}
              <h1 className="text-primary-text text-2xl font-bold font-opensans sm:text-center">
                {waiver.name}
              </h1>
              <div
                className="bg-secondary-background border border-light-gray overflow-auto shrink-0 py-2 px-3 max-h-[300px]"
                dangerouslySetInnerHTML={{
                  __html: mdRender.render(waiver.content),
                }}
              />
              <div className="self-center">
                <Controller
                  control={form.control}
                  name={`waivers.${i}.agreedToWaiver`}
                  defaultValue={false}
                  rules={{
                    validate: (v) => (!v ? "Must agree to the waiver" : true),
                  }}
                  render={({
                    field: { name, onBlur, onChange, ref, value },
                  }) => (
                    <CheckboxText
                      label="I agree to the waiver"
                      value={value}
                      onChange={(v) => onChange(v)}
                    />
                  )}
                />
              </div>
              <div className="sm:w-[60%]">
                <div className="mb-2">
                  <TextInput
                    label="Signature"
                    error={
                      form.formState.errors.waivers?.[i]?.agreedSignature
                        ?.message
                    }
                    formValue={form.register(`waivers.${i}.agreedSignature`, {
                      validate: (v) =>
                        !v ? "Signature cannot be empty" : true,
                    })}
                    required={true}
                  />
                </div>
                <div className="mb-2">
                  <Controller
                    control={form.control}
                    name={`waivers.${i}.agreedDate`}
                    rules={{
                      validate: (v) => (!v ? "Date cannot be empty" : true),
                    }}
                    render={({
                      field: { name, onBlur, onChange, ref, value },
                    }) => (
                      <DatePicker
                        label="Date"
                        value={value}
                        onChange={onChange}
                        disabled
                        error={
                          form.formState.errors.waivers?.[i]?.agreedDate
                            ?.message
                        }
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Button
        text="Next"
        disabled={hasError}
        onClick={async () => {
          const isValid = await form.trigger(undefined, {
            shouldFocus: true,
          });
          if (!isValid) return;

          setPage((prev) => prev + 1);
        }}
      />
    </div>
  );
}
