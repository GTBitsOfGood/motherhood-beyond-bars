import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

import { updateCaregiver } from "db/actions/shared/Caregiver";
import { auth } from "db/firebase";

import { OnboardingFormData } from "@lib/types/users";

import Button from "@components/atoms/Button";

interface Props {
  form: UseFormReturn<OnboardingFormData>;
}

export default function PreferredContactPage({ form }: Props) {
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
      {/* TODO make sure this works with all info */}
      <Button
        text="Finish"
        disabled={submitting}
        onClick={async () => {
          const { saveAddress, waivers, ...caregiverUpdate } = form.getValues();

          if (!auth.currentUser) return;

          setSubmitting(true);
          try {
            await updateCaregiver(auth.currentUser?.uid, {
              ...caregiverUpdate,
              // May need to convert the timestamp here to another format because it is in ISO on the browser
              signedWaivers: waivers.map((waiver) => waiver.waiver),
            });
          } finally {
            setSubmitting(false);
          }
        }}
      />
    </div>
  );
}
