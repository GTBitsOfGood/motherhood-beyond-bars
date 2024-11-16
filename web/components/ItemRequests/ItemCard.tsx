import { useState, SetStateAction } from "react";

import { AdditionalInfoField, Item } from "@lib/types/items";
import TextInput from "@components/atoms/TextInput";

interface Props {
  data: Item;
  setData: (value: SetStateAction<Item[]>) => void;
  allData: Item[];
  index: number;
}

export default function ItemCard({ data, allData, setData, index }: Props) {
  const [babyChecked, setBabyChecked] = useState(false);

  const checkBoxBaby = () => {
    setBabyChecked(!babyChecked);
    setData(
      allData.map((item, i) => {
        if (i != index) {
          return item;
        } else {
          return { ...item, checked: !babyChecked };
        }
      })
    );
  };

  return (
    <div
      className="w-full h-min rounded shadow p-4 sm:mx-1 sm:mb-4 sm:w-[48%] cursor-pointer focus-within:outline focus-within:outline-mbb-pink focus-within:outline-2"
      onClick={checkBoxBaby}
    >
      <div className="justify-start items-center gap-1 inline-flex">
        <div className="flex flex-col justify-center items-center w-6 h-6">
          <input
            type="checkbox"
            className="w-4 h-4 bg-secondary-background rounded border border-light-gray cursor-pointer"
            checked={babyChecked}
          ></input>
        </div>
        <div className="font-semibold">{data["title"]}</div>
      </div>
      <div className="text-dark-gray ml-7 my-1">{data["description"]}</div>
      {(babyChecked || data["title"] == "Other") &&
        data.additionalInfo &&
        !!data.additionalInfo.length && (
          <div className="w-full pl-7 flex-row justify-start items-start inline-flex">
            {data.additionalInfo.map((data: AdditionalInfoField, i: number) => {
              return (
                <div
                  key={data.boxTitle}
                  className="w-[8rem] flex flex-col pr-2"
                >
                  {data.boxTitle}
                  <TextInput
                    currentValue={data.value}
                    placeholder={data["placeholder"]}
                    onChange={(val) => {
                      setData(
                        allData.map((item, j) => {
                          if (j != index) {
                            return item;
                          } else {
                            return {
                              ...item,
                              additionalInfo: item.additionalInfo
                                ? item.additionalInfo.map((detail, k) => {
                                    if (k != i) {
                                      return detail;
                                    } else {
                                      return { ...detail, value: val };
                                    }
                                  })
                                : undefined,
                            };
                          }
                        })
                      );
                    }}
                  ></TextInput>
                </div>
              );
            })}
          </div>
        )}
    </div>
  );
}
