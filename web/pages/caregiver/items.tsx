import { useState } from "react";
import { GetServerSidePropsContext } from "next";

import { getCurrentCaregiver } from "db/actions/caregiver/Caregiver";
import { getItems } from "db/actions/shared/Items";

import { Caregiver } from "@lib/types/users";
import { Item } from "@lib/types/items";

import RequestCard from "@components/ItemRequests/RequestCard";
import TitleTopBar from "@components/logos/TitleTopBar";
import RequestItems from "../../components/ItemRequests/RequestItems";

type Props = {
  items: Item[];
  caregiver: Caregiver;
};

export default function Items({ items, caregiver }: Props) {
  const [showRequestItems, setShowRequestItems] = useState(false);
  const [requestedItems, setRequestedItems] = useState<Item[]>(
    caregiver.itemsRequested.items
  );

  return (
    <div className="w-full h-full">
      <TitleTopBar title="MBB Support" />
      {!showRequestItems ? (
        <div className="flex flex-col items-center w-full mt-6 sm:flex-row sm:justify-center sm:items-start mb-6 sm:mb-0">
          <RequestCard
            title="Current Requests"
            description="Requests on the way to you and your baby."
            img="/requests_icon.svg"
            current={true}
            data={requestedItems}
          ></RequestCard>
          <div className="mr-0 sm:mr-6 mb-4 sm:mb-0" />
          <RequestCard
            title="Request items"
            description="Request additional items like diapers, baby formula, and clothing."
            img="/babybottle_icon.svg"
            current={false}
            onClick={() => setShowRequestItems(true)}
          ></RequestCard>
        </div>
      ) : (
        <RequestItems
          items={items}
          caregiver={caregiver}
          setShowRequestItems={setShowRequestItems}
          setRequestedItems={setRequestedItems}
        />
      )}
    </div>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const caregiver = await getCurrentCaregiver(context);

  if (caregiver) {
    caregiver.babies = [];
    if (caregiver.itemsRequested) {
      caregiver.itemsRequested.created = null;
      caregiver.itemsRequested.updated = null;
    }
  }

  const items: Item[] = await getItems();

  return { props: { items: items, caregiver: caregiver } };
};
