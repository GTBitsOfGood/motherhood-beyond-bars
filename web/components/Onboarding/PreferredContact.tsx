import Button from "@components/atoms/Button";
import { OnboardingFormData } from "@lib/types/users";
import { updateCaregiver } from "db/actions/shared/Caregiver";
import { auth } from "db/firebase";
import { Dispatch, SetStateAction, useState } from "react";
import { UseFormReturn } from "react-hook-form";

interface Props {
  setPage: Dispatch<SetStateAction<number>>;
  form: UseFormReturn<OnboardingFormData>;
}

export default function PreferredContactPage({ setPage, form }: Props) {
  const [submitting, setSubmitting] = useState(false);

  return (
    <div className="flex flex-col px-6 gap-3 flex-grow">
      <h1 className="text-primary-text text-2xl font-bold font-opensans sm:text-center">
        What&#39;s the best way to contact you?
      </h1>
      <div className="flex items-center">
        <input
          type="radio"
          id="phone"
          value="phone"
          defaultValue="phone"
          {...form.register("contact")}
        />
        <label htmlFor="phone">Phone</label>
      </div>
      <div className="flex items-center">
        <input
          type="radio"
          id="text"
          value="text"
          {...form.register("contact")}
        />
        <label htmlFor="text">Text</label>
      </div>
      <div className="flex items-center">
        <input
          type="radio"
          id="email"
          value="email"
          {...form.register("contact")}
        />
        <label htmlFor="email">Email</label>
      </div>
      <div className="flex-grow" />
      <Button
        text="Finish"
        disabled={submitting}
        onClick={async () => {
          const { saveAddress, ...caregiverUpdate } = form.getValues();

          if (!auth.currentUser) return;

          setSubmitting(true);
          try {
            await updateCaregiver(auth.currentUser?.uid, caregiverUpdate);
          } finally {
            setSubmitting(false);
          }
        }}
      />
    </div>
  );
}
