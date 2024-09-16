import { useState } from "react";

import GetStartedPage from "@components/Onboarding/GetStarted";
import HouseholdInfoPage from "@components/Onboarding/HouseholdInfo";
import LiabilityWaiverPage from "@components/Onboarding/LiabilityWaiver";
import RequestItemsPage from "@components/Onboarding/RequestItems";
import ShippingAddressPage from "@components/Onboarding/ShippingAddress";
import PreferredContactPage from "@components/Onboarding/PreferredContact";
import BackButton from "@components/atoms/BackButton";
import ProgressBar from "@components/atoms/ProgressBar";
import Button from "@components/atoms/Button";
import { OnboardingFormData } from "@lib/types/users";
import { useForm } from "react-hook-form";

export default function CaregiverOnboarding() {
  // Page 0 - Let's Get Started, Page 1 - Household Information, Page 2 - Liability Waiver,
  // Page 3 - Request Items, Page 4 - Shipping Address, Page 5 - Contact Page
  const [page, setPage] = useState(0);
  const form = useForm<OnboardingFormData>({
    mode: "all",
    defaultValues: {
      contact: "phone",
    },
  });

  return (
    <div className="flex w-full">
      <div className="hidden lg:flex grow flex-col shrink-0 py-7 px-6 gap-4 items-center justify-center bg-onboarding-background2">
        <img
          src="/MBBLogo.svg"
          className="stroke-[2.1px] object-contain sm:stroke-[3px]"
        />
        <span className="text-white text-4xl font-bold uppercase tracking-[1.08px]">
          motherhood
        </span>
        <span className="text-white text-4xl font-bold uppercase tracking-[1.08px]">
          beyond bars
        </span>
        <span className="text-white text-[2rem] font-opensans tracking-[0.96px]">
          Caregiver
        </span>
      </div>
      <div className="flex lg:items-center justify-center grow">
        <div className="flex flex-col lg:max-w-[600px] gap-7">
          {page > 0 && (
            <div className="flex bg-white sticky top-0 items-center justify-between px-7 py-[1.125rem]">
              <BackButton
                onClick={() => setPage((prev) => Math.max(0, prev - 1))}
              />
              <ProgressBar progress={(page / 5) * 100} width="30%" />
            </div>
          )}
          {
            page == 0 ? (
              <GetStartedPage setPage={setPage} />
            ) : page == 1 ? (
              <HouseholdInfoPage setPage={setPage} />
            ) : page == 2 ? (
              <LiabilityWaiverPage setPage={setPage} form={form} />
            ) : page == 3 ? (
              <RequestItemsPage setPage={setPage} />
            ) : page == 4 ? (
              <ShippingAddressPage setPage={setPage} form={form} />
            ) : page == 5 ? (
              <PreferredContactPage setPage={setPage} form={form} />
            ) : null
            // Save data and route to next page
          }
          <Button
            text="debug next"
            onClick={() => {
              console.log(form.getValues());
              setPage((prev) => Math.min(5, prev + 1));
            }}
          />
        </div>
      </div>
    </div>
  );
}
