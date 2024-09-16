import { useState } from "react";

import GetStartedPage from "@components/Onboarding/GetStarted";
import HouseholdInfoPage from "@components/Onboarding/HouseholdInfo";
import LiabilityWaiverPage from "@components/Onboarding/LiabilityWaiver";
import RequestItemsPage from "@components/Onboarding/RequestItems";
import ShippingAddressPage from "@components/Onboarding/ShippingAddress";
import PreferredContactPage from "@components/Onboarding/PreferredContact";
import { atom, useAtom } from "jotai";
import { pageAtom } from "./controls";
import { OnboardingFormData } from "@lib/types/users";
import { useForm } from "react-hook-form";

export default function CaregiverOnboarding() {
  // Page 0 - Let's Get Started, Page 1 - Household Information, Page 2 - Liability Waiver,
  // Page 3 - Request Items, Page 4 - Shipping Address, Page 5 - Contact Page
  const [page, setPage] = useAtom(pageAtom);
  const form = useForm<OnboardingFormData>({
    mode: "onChange",
    defaultValues: {
      contact: "phone",
    },
  });

  return (
    <div>
      {
        page == 0 ? (
          <GetStartedPage setPage={setPage} />
        ) : page == 1 ? (
          <HouseholdInfoPage form={form}/>
        ) : page == 2 ? (
          <LiabilityWaiverPage setPage={setPage} />
        ) : page == 3 ? (
          <RequestItemsPage form={form}/>
        ) : page == 4 ? (
          <ShippingAddressPage setPage={setPage} />
        ) : page == 5 ? (
          <PreferredContactPage setPage={setPage} />
        ) : null
        // Save data and route to next page
      }
    </div>
  );
}
