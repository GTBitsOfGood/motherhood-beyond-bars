import { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";
import { Timestamp } from "@firebase/firestore";

import { OnboardingFormData } from "@lib/types/users";
import { Item, ItemRequest } from "@lib/types/items";

import RequestItems from "@components/ItemRequests/RequestItems";

interface Props {
  items: Item[];
  setPage: Dispatch<SetStateAction<number>>;
  form: UseFormReturn<OnboardingFormData>;
}

export default function RequestItemsPage({ items, setPage, form }: Props) {
  // TODO update form data
  // TODO add modal for Car Seat
  // TODO feed in filled out information in case user goes back
  return (
    <RequestItems
      items={items}
      onboarding={true}
      requestItems={(data: Item[], comments: string) => {
        const requestedItems = data.filter((item) => item.checked);

        const request: ItemRequest = {
          created: Timestamp.now(),
          updated: Timestamp.now(),
          additionalComments: [comments],
          status: "Pending",
          items: requestedItems,
        };

        form.setValue("itemsRequested", request);

        setPage(4);
      }}
    />
  );
}
