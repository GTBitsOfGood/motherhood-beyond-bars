import { useState, SetStateAction, useEffect } from "react";

import { Item } from "@lib/types/items";

import ItemCard from "@components/ItemRequests/ItemCard";
import Button from "@components/atoms/Button";
import BackButton from "@components/atoms/BackButton";
import PopUpModal from "@components/modals/PopUpModal";

type Props = {
  items: Item[];
  setShowRequestItems?: (value: SetStateAction<boolean>) => void;
  requestItems?: (data: Item[], comments: string, carSeat?: boolean) => void;
  onboarding?: boolean;
  showCarModal?: boolean;
  setShowCarModal?: (value: boolean) => void;
};

export default function RequestItems({
  items,
  setShowRequestItems,
  requestItems,
  onboarding = false,
  showCarModal,
  setShowCarModal,
}: Props) {
  const [comments, setComments] = useState<string>("");
  const [data, setData] = useState<Item[]>(
    onboarding ? items : items.filter((item) => !item.onboardingOnly)
  );

  return (
    <div className="w-full p-6 flex-col justify-start items-start gap-[1.438rem] inline-flex sm:py-8 sm:px-24">
      {setShowRequestItems && (
        <BackButton darkerColor onClick={() => setShowRequestItems(false)} />
      )}
      {onboarding && showCarModal && setShowCarModal && (
        <PopUpModal
          title="Do you have your own car seat?"
          description="Please confirm that you have a car seat suitable for the baby. You won't be able to take them home without it!"
          leftButton="Yep, I do!"
          rightButton="No, I don't"
          onClickLeft={() =>
            requestItems ? requestItems(data, comments, true) : null
          }
          onClickRight={() => {
            for (let i = 0; i < data.length; i++) {
              let item = data[i];
              if (item.title === "Car Seat") {
                data[i].checked = true;
                break;
              }
            }
            requestItems ? requestItems(data, comments, true) : null;
          }}
        />
      )}
      <div
        className={`flex-col items-start justify-start gap-3 flex
          ${onboarding ? "sm:items-center sm:text-center sm:w-[60%] sm:self-center" : ""}`}
      >
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
        <div
          className={`justify-start items-start gap-3 flex ${onboarding ? "flex-col-reverse" : "flex-col"}`}
        >
          <Button
            text={onboarding ? "Next" : "Request"}
            onClick={() => {
              console.log(data);
              requestItems ? requestItems(data, comments) : null;
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
