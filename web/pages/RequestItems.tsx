import Button from "@components/atoms/Button";
import TextInput from "@components/atoms/TextInput";
import ItemCard from "@components/itemRequestsTable/ItemCard";
import { useState } from "react";

export default function RequestItems() {
  const [comments, setComments] = useState("");
  const [data, setData] = useState([
    {
      title: "Baby Clothing",
      description: "5 baby outfits",
      additionalInfo: [
        { title: "Gender", placeholder: "B, G, Unisex" },
        { title: "Size", placeholder: "ex 3-6" },
      ],
    },
    {
      title: "Baby Formula",
      description: "Brand name formula",
      additionalInfo: [
        { title: "Flavor", placeholder: "Orange or peach" },
      ],
    },
    {
        title: "Other",
        additionalInfo: [
            { title: undefined, placeholder: "Enter items" },
        ],
    }
  ]);

  return (
    <div className="w-full p-6 flex-col justify-start items-start gap-[1.438rem] inline-flex sm:py-12 sm:px-24">
      <div className="flex-col justify-start items-start gap-3 flex">
        <div className="text-2xl font-bold">Request Items</div>
        Motherhood Beyond Bars will deliver you supplies, so you’re ready for
        the child!
      </div>
      <div className="sm:flex flex-wrap w-full justify-between">
        {data.map((item, i) => {
            return <ItemCard data={data[i]} allData={data} setData={setData} index={i}></ItemCard>
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
          <Button text="Request" onClick={() => {
                // TODO send to database
                console.log(data);
            }}>
          </Button>
          <div className="text-dark-gray text-sm">
            Expect a call from us to confirm the order details!
          </div>
        </div>
      </div>
    </div>
  );
}
