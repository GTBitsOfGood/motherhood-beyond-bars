import { useState } from "react";
import TextInput from "@components/atoms/TextInput";

interface Props {
  data: object;
  setData: (e) => void;
  allData: Array<object>;
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
    <div className="w-full h-min rounded shadow p-4 sm:mr-3">
      <div className="justify-start items-center gap-1 inline-flex">
        <div className="flex flex-col justify-center items-center w-6 h-6">
          <input
            type="checkbox"
            className="w-4 h-4 bg-secondary-background rounded border border-light-gray"
            checked={babyChecked}
            onChange={checkBoxBaby}
          ></input>
        </div>
        <div className="font-semibold">{data["title"]}</div>
      </div>
      <div className="text-dark-gray ml-7 my-1">{data["description"]}</div>
      {(babyChecked || data["title"] == "Other") && (
        <div className="w-full pl-7 flex-row justify-start items-start inline-flex">
          {data.additionalInfo.map((data, i) => {
            return (
              <div className="w-[8rem] flex flex-col pr-2">
                {data["title"]}
                {/* className="mt-1 px-2 py-2.5 bg-secondary-background rounded border border-light-gray" */}
                <TextInput
                  currentValue={data.value}
                  placeholder={data["placeholder"]}
                  onChange={(val) => {
                    // Change this when changing to TextInput component
                    setData(
                      allData.map((item, j) => {
                        if (j != index) {
                          return item;
                        } else {
                          return {
                            ...item,
                            additionalInfo: item.additionalInfo.map(
                              (detail, k) => {
                                if (k != i) {
                                  return detail;
                                } else {
                                  return { ...detail, value: val };
                                }
                              }
                            ),
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
