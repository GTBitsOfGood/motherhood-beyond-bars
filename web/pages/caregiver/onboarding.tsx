import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { Timestamp } from "firebase/firestore";
import { getAuth } from "firebase-admin/auth";

import { getWaivers } from "db/actions/shared/Waiver";
import { getItems } from "db/actions/shared/Items";
import { updateCaregiver } from "db/actions/shared/Caregiver";

import { OnboardingFormData } from "@lib/types/users";
import { BrowserWaiver } from "@lib/types/common";
import { Item } from "@lib/types/items";

import BackButton from "@components/atoms/BackButton";
import ProgressBar from "@components/atoms/ProgressBar";
import HalfScreen from "@components/logos/HalfScreen";

import GetStartedPage from "@components/Onboarding/GetStarted";
import HouseholdInfoPage from "@components/Onboarding/HouseholdInfo";
import LiabilityWaiverPage from "@components/Onboarding/LiabilityWaiver";
import RequestItemsPage from "@components/Onboarding/RequestItems";
import ShippingAddressPage from "@components/Onboarding/ShippingAddress";
import PreferredContactPage from "@components/Onboarding/PreferredContact";

interface Props {
  waivers: BrowserWaiver[];
  items: Item[];
  authId: string | null;
}

export default function CaregiverOnboarding({ waivers, items, authId }: Props) {
  // Page 0 - Let's Get Started, Page 1 - Household Information, Page 2 - Liability Waiver,
  // Page 3 - Request Items, Page 4 - Shipping Address, Page 5 - Contact Page
  const [page, setPage] = useState(0);
  const form = useForm<OnboardingFormData>({
    mode: "all",
    defaultValues: {
      contact: "phone",
    },
  });

  const waiverFields = useFieldArray({
    control: form.control,
    name: "waivers",
  });

  useEffect(() => {
    waiverFields.remove();
    waivers
      .filter((waiver) => waiver.onboarding)
      .forEach((waiver) =>
        waiverFields.append(
          {
            agreedToWaiver: false,
            agreedDate: new Date(),
            agreedSignature: "",
            waiver,
          },
          {
            shouldFocus: false,
          }
        )
      );
  }, [waivers, waiverFields.remove, waiverFields.append]);

  async function createCaregiver() {
    // Handle case where user wanders to this page
    if (!authId) return;

    const { waivers, ...caregiverUpdate } = form.getValues();

    await updateCaregiver(authId, {
      ...caregiverUpdate,
      // May need to convert the timestamp here to another format because it is in ISO on the browser
      onboarding: true,
      signedWaivers: waivers.map((waiver) => waiver.waiver),
    });
  }

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
            <HouseholdInfoPage setPage={setPage} form={form} />
          ) : page == 2 ? (
            <LiabilityWaiverPage
              setPage={setPage}
              form={form}
              waiverFields={waiverFields}
            />
          ) : page == 3 ? (
            <RequestItemsPage setPage={setPage} items={items} form={form} />
          ) : page == 4 ? (
            <ShippingAddressPage setPage={setPage} form={form} />
          ) : page == 5 ? (
            <PreferredContactPage
              form={form}
              createCaregiver={createCaregiver}
            />
          ) : null
          // Save data and route to next page
        }
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context: GetServerSidePropsContext
) => {
  const waivers = await getWaivers();
  const items = await getItems();

  let authId = null;

  if (context.req.headers.cookie) {
    const token = context.req.headers.cookie
      .split("; ")
      .find((row) => row.startsWith("authToken="))
      ?.split("=")[1];

    if (token) {
      const res = await getAuth().verifyIdToken(token);
      authId = res.uid;
    }
  }

  return {
    props: {
      waivers: waivers.map((w) => ({
        ...w,
        lastUpdated: (w.lastUpdated as Timestamp).toDate().toISOString(),
      })),
      items: items,
      authId: authId,
    },
  };
};
