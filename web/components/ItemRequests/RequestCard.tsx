import Button from "@components/atoms/Button";
import { AdditionalInfoField, Item } from "@lib/types/items";

interface Props {
  title: string;
  description: string;
  img: string;
  current: boolean;
  onClick?: () => any;
  data?: any;
}

export default function RequestCard({
  title,
  description,
  img,
  current,
  onClick,
  data,
}: Props) {
  return (
    <div className="w-[90%] px-6 py-[1.125rem] rounded shadow flex-col justify-start items-start sm:w-[45%]">
      <div className="w-6 h-6 inline-flex">
        <img src={img}></img>
      </div>
      <div className="text-lg font-bold mb-1">{title}</div>
      <div className="text-dark-gray mb-4">{description}</div>
      {current && (
        <div className="mb-[0.1rem]">
          {data.map((data: Item, i: number) => {
            return (
              <div className="flex flex-col mb-2 text-primary-text">
                {data["title"]}
                <div className="flex flex-row text-dark-gray">
                  {data["description"] && `${data["description"]}`}
                  {data.additionalInfo && !!data.additionalInfo.length && " - ".concat(
                    data.additionalInfo
                      .map(
                        (info: AdditionalInfoField) =>
                          `${info.boxTitle}: ${info.value}`
                      )
                      .join(", "))}
                </div>
              </div>
            );
          })}
        </div>
      )}
      {!current && <Button text="Request" onClick={onClick}></Button>}
    </div>
  );
}
