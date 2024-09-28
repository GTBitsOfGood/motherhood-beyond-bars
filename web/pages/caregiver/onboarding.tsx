import { useState } from "react";
import { useForm } from "react-hook-form";

import { OnboardingFormData } from "@lib/types/users";

import BackButton from "@components/atoms/BackButton";
import ProgressBar from "@components/atoms/ProgressBar";
import Button from "@components/atoms/Button";

import GetStartedPage from "@components/Onboarding/GetStarted";
import HouseholdInfoPage from "@components/Onboarding/HouseholdInfo";
import LiabilityWaiverPage from "@components/Onboarding/LiabilityWaiver";
import RequestItemsPage from "@components/Onboarding/RequestItems";
import ShippingAddressPage from "@components/Onboarding/ShippingAddress";
import PreferredContactPage from "@components/Onboarding/PreferredContact";
import HalfScreen from "@components/logos/HalfScreen";

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
    <div className="flex flex-col sm:flex-row absolute items-center sm:justify-center w-screen h-screen">
      <HalfScreen caregiver={true} hiddenOnMobile={page != 0} />
      <div className="flex flex-col sm:w-1/2 items-center sm:justify-center h-screen grow">
        {page > 0 && (
          <div className="flex bg-white w-full sm:w-[60%] sticky top-0 items-center justify-between px-7 py-[1.125rem] sm:mt-6">
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
            <PreferredContactPage form={form} />
          ) : null
          // Save data and route to next page
        }
        {page == 1 || page == 3 ? (
          <Button
            text="debug next"
            onClick={() => {
              console.log(form.getValues());
              setPage((prev) => Math.min(5, prev + 1));
            }}
          />
        ) : null}
      </div>
    </div>
  );
}
