import { useState, SetStateAction } from "react";

import { requestItems } from "db/actions/caregiver/Item";
import { Caregiver } from "@lib/types/users";
import { Item } from "@lib/types/items";

import ItemCard from "@components/ItemRequests/ItemCard";
import Button from "@components/atoms/Button";
import BackButton from "@components/atoms/BackButton";

type Props = {
  items: Item[];
  caregiver: Caregiver;
  setShowRequestItems: (value: SetStateAction<boolean>) => void;
  setRequestedItems: (value: SetStateAction<Item[]>) => void;
};

export default function RequestItems({
  items,
  caregiver,
  setShowRequestItems,
  setRequestedItems,
}: Props) {
  const [comments, setComments] = useState<string>("");
  const [data, setData] = useState<Item[]>(
    items.filter((item) => !item.onboardingOnly)
  );

  return (
    <div className="w-full p-6 flex-col justify-start items-start gap-[1.438rem] inline-flex sm:py-8 sm:px-24">
      <BackButton darkerColor onClick={() => setShowRequestItems(false)} />
      <div className="flex-col justify-start items-start gap-3 flex">
        <div className="text-2xl font-bold">Request Items</div>
        Motherhood Beyond Bars will deliver you supplies, so you’re ready for
        the child!
      </div>
      <div className="sm:flex flex-wrap w-full justify-between">
        {data &&
          data.map((item, i) => {
            return (
              <ItemCard
                data={data[i]}
                allData={data}
                setData={setData}
                index={i}
              ></ItemCard>
            );
          })}
      </div>
      <div className="w-full h-[11.313rem] flex-col justify-start items-start gap-2 flex sm:h-auto sm:mt-5">
        <div className="justify-end items-center">
          Additional requests or comments
        </div>
        <textarea
          placeholder="Specific item dimensions, shipping directions, etc."
          className="w-full h-full px-2 py-2.5 bg-secondary-background rounded border border-light-gray sm:h-auto"
          onChange={(e) => setComments(e.target.value)}
        ></textarea>
      </div>
      <div className="w-full sm:flex sm:flex-col sm:justify-center sm:items-center sm:mt-2">
        <div className="flex-col justify-start items-start gap-3 flex">
          <Button
            text="Request"
            onClick={() => {
              // TODO if user makes two item requests, replaces most recent item with that request on frontend
              requestItems(caregiver, data as Item[], comments)
                .then((allItems: Item[]) => {
                  setRequestedItems(allItems);
                  setShowRequestItems(false);
                })
                .catch(() => {
                  // TODO show error message
                });
            }}
          ></Button>
          <div className="text-dark-gray text-sm">
            Expect a call from us to confirm the order details!
          </div>
        </div>
      </div>
    </div>
  );
}
