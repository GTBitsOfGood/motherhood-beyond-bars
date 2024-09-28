import { Dispatch, SetStateAction } from "react";
import { Controller, UseFormReturn } from "react-hook-form";

import { OnboardingFormData } from "@lib/types/users";
import { states } from "./states";

import Button from "@components/atoms/Button";
import Dropdown from "@components/atoms/Dropdown";
import TextInput from "@components/atoms/TextInput";
import CheckboxText from "@components/molecules/CheckboxText";

interface Props {
  setPage: Dispatch<SetStateAction<number>>;
  form: UseFormReturn<OnboardingFormData>;
}

export default function ShippingAddressPage({ setPage, form }: Props) {
  const addressError = form.getFieldState("address").error;
  const apartmentError = form.getFieldState("apartment").error;
  const cityError = form.getFieldState("city").error;
  const zipCodeError = form.getFieldState("zipCode").error;
  const hasError = addressError || apartmentError || cityError || zipCodeError;

  return (
    <div className="flex flex-col px-6 flex-grow sm:items-center w-full sm:w-[60%] mb-8">
      <h1 className="text-primary-text text-2xl font-bold font-opensans sm:text-center mb-1 mt-2 sm:mt-0">
        Shipping Address
      </h1>
      <p className="sm:text-center mb-6">
        Let us know where we can deliver your requested supplies!
      </p>
      <TextInput
        label="Street Address"
        placeholder="Street number and name"
        error={form.formState.errors.address?.message}
        formValue={form.register("address", {
          validate: (v) => (!v ? "Address cannot be empty" : true),
        })}
      />
      <TextInput
        label={
          <>
            Apartment/Suite <span className="text-dark-gray">(Optional)</span>
          </>
        }
        placeholder="Apartment number, suite number"
        error={form.formState.errors.apartment?.message}
        formValue={form.register("apartment")}
      />
      <TextInput
        label="City"
        error={form.formState.errors.city?.message}
        formValue={form.register("city", {
          validate: (v) => (!v ? "City cannot be empty" : true),
        })}
      />
      <Controller
        control={form.control}
        name="state"
        rules={{
          validate: (v) => (!v ? "State cannot be empty" : true),
        }}
        render={({ field: { value, onChange } }) => (
          <Dropdown
            label="State"
            options={states}
            value={value}
            error={form.formState.errors.state?.message}
            onChange={(opt) => onChange(opt.value)}
          />
        )}
      />
      <TextInput
        label="Zip Code"
        error={form.formState.errors.zipCode?.message}
        formValue={form.register("zipCode", {
          validate: (v) => (!v ? "Zip Code cannot be empty" : true),
        })}
      />
      <div className="mb-4">
        <Controller
          control={form.control}
          name="saveAddress"
          defaultValue={false}
          render={({ field: { name, onBlur, onChange, ref, value } }) => (
            <CheckboxText
              label="Save address for future deliveries"
              value={value}
              onChange={(v) => onChange(v)}
            />
          )}
        />
      </div>

      <Button
        text="Next"
        disabled={!!hasError}
        onClick={async () => {
          // TODO fix error not erasing when fixed
          const isValid = await form.trigger(undefined, { shouldFocus: true });
          if (!isValid) return;

          setPage((prev) => prev + 1);
        }}
      />
    </div>
  );
}
