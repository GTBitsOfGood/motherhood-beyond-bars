import Button from "@components/atoms/Button";
import TextInput from "@components/atoms/TextInput";
import { OnboardingFormData } from "@lib/types/users";
import { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";

interface Props {
  setPage: Dispatch<SetStateAction<number>>;
  form: UseFormReturn<OnboardingFormData>;
}

export default function ShippingAddressPage({ setPage, form }: Props) {
  return (
    <div className="flex flex-col px-6 gap-3 flex-grow">
      <h1 className="text-primary-text text-2xl font-bold font-opensans">
        Shipping Address
      </h1>
      <p>Let us know where we can deliver your requested supplies!</p>
      <div>
        <label>Street Address</label>
        <TextInput
          placeholder="Street number and name"
          formValue={form.register("address")}
        />
      </div>
      <div>
        <label>
          Apartment/Suite <span className="text-dark-gray">(Optional)</span>
        </label>
        <TextInput placeholder="Apartment number, suite number" />
      </div>
      <div>
        <label>City</label>
        <TextInput />
      </div>
      <div>
        <label>State</label>
        <select /> {/* TODO: replace with Dropdown */}
      </div>
      <div>
        <label>Zip Code</label>
        <TextInput />
      </div>
      <input type="checkbox" /> {/* TODO: replace with <CheckboxText /> */}
      <div className="flex-grow" />
      <Button text="Next" onClick={() => setPage((prev) => prev + 1)} />
    </div>
  );
}
