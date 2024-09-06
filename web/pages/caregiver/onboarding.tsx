import { useState } from "react";

import GetStartedPage from "@components/Onboarding/GetStarted";
import HouseholdInfoPage from "@components/Onboarding/HouseholdInfo";
import LiabilityWaiverPage from "@components/Onboarding/LiabilityWaiver";
import RequestItemsPage from "@components/Onboarding/RequestItems";
import ShippingAddressPage from "@components/Onboarding/ShippingAddress";
import PreferredContactPage from "@components/Onboarding/PreferredContact";

export default function CaregiverOnboarding() {
  // Page 0 - Let's Get Started, Page 1 - Household Information, Page 2 - Liability Waiver,
  // Page 3 - Request Items, Page 4 - Shipping Address, Page 5 - Contact Page
  const [page, setPage] = useState(0);

  return (
    <div>
      {
        page == 0 ? (
          <GetStartedPage setPage={setPage} />
        ) : page == 1 ? (
          <HouseholdInfoPage setPage={setPage} />
        ) : page == 2 ? (
          <LiabilityWaiverPage setPage={setPage} />
        ) : page == 3 ? (
          <RequestItemsPage setPage={setPage} />
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
