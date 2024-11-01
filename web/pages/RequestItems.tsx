import TextInput from "@components/atoms/TextInput";
import ItemCard from "@components/itemRequestsTable/ItemCard";
import { useState } from "react";

export default function RequestItems() {
  const [comments, setComments] = useState("");
  const [other, setOther] = useState("");
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
      <div className="sm:flex flex-row w-full">
        {data.map((item, i) => {
            return <ItemCard data={data[i]} allData={data} setData={setData} index={i}></ItemCard>
        })}
        {/* <div className="w-full h-auto rounded shadow p-4 mt-6 sm:mt-0 sm:ml-3 sm:h-28">
          <div className="justify-start items-center gap-1 inline-flex">
            <div className="flex flex-col justify-center items-center w-6 h-6">
              <input
                type="checkbox"
                className="w-4 h-4 bg-secondary-background rounded border border-light-gray"
              ></input>
            </div>
            <div className="font-semibold">Other</div>
          </div>
          <div className="flex-col justify-start items-start gap-2 ml-7 mt-1">
            <TextInput
              placeholder="Enter items"
              onChange={(e) => setOther(e)}
            ></TextInput>
          </div>
        </div> */}
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
          {/* TODO change to Button component */}
          <button
            className="self-stretch px-4 pt-2 pb-[0.563rem] rounded border border-mbb-pink"
            onClick={() => {
                // TODO send to database
                console.log(data);
            }}
        >
            <div className="text-mbb-pink font-semibold">Request</div>
          </button>
          <div className="text-dark-gray text-sm">
            Expect a call from us to confirm the order details!
          </div>
        </div>
      </div>
    </div>
  );
}
