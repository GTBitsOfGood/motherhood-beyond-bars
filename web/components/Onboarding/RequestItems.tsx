import { Dispatch, SetStateAction, useState } from "react";
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
  const [showModal, setShowModal] = useState(false)

  return (
    <RequestItems
      items={items}
      onboarding={true}
      showCarModal={showModal}
      setShowCarModal={setShowModal}
      requestItems={(data: Item[], comments: string) => {
        const requestedItems = data.filter((item) => item.checked);
        let carSeatChecked = false
        for (let item of data) {
          if (item.title === "Car Seat") {
            carSeatChecked = true
          }
        }
        if (!carSeatChecked) {
          setShowModal(true)
        }

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
