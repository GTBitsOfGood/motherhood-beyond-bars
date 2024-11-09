import { useRouter } from "next/router";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

import { OnboardingFormData } from "@lib/types/users";

import Button from "@components/atoms/Button";

interface Props {
  form: UseFormReturn<OnboardingFormData>;
  createCaregiver: () => Promise<void>;
}

export default function PreferredContactPage({ form, createCaregiver }: Props) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  return (
    <div className="flex flex-col px-6 gap-3 flex-grow sm:justify-center sm:items-center text-base font-normal text-primary-text font-opensans">
      <h1 className="text-2xl font-bold sm:text-center">
        What&#39;s the best way to contact you?
      </h1>
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="email"
            value="email"
            {...form.register("contact")}
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="phone"
            value="phone"
            defaultValue="phone"
            {...form.register("contact")}
          />
          <label htmlFor="phone">Phone</label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="text"
            value="text"
            {...form.register("contact")}
          />
          <label htmlFor="text">Text</label>
        </div>
      </div>
      <Button
        text="Finish"
        disabled={submitting}
        onClick={() => {
          setSubmitting(true);
          createCaregiver()
            .then(() => {
              router.push("/caregiver/book");
            })
            .catch(() => {
              // TODO show if there's an error
            })
            .finally(() => {
              setSubmitting(true);
            });
        }}
      />
    </div>
  );
}
