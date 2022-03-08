import React from "react";
import ItemRequestsTable from "@components/ItemRequestsTable";
import { GetServerSideProps } from "next";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@lib/firebase";

enum ItemRequestStatus {
  Pending = "Pending",
  Fulfilled = "Fulfilled",
}

type RequestItem = {
  name: string;
  requestedOn: string;
  requestedBy: string;
  displayName: string;
  fulfilled: ItemRequestStatus;
  quantity: number;
};

function genItemRequestsTab({ itemRequests }: { itemRequests: RequestItem[] }) {
  const getData = () => {
    return itemRequests;
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "requestedBy",
      },
      {
        Header: "Items Requested",
        accessor: "displayName",
      },
      {
        Header: "Requested On",
        accessor: "requestedOn",
      },
      {
        Header: "Quantity",
        accessor: "quantity",
      },
      {
        Header: "Status",
        accessor: "fulfilled",
      },
    ],
    []
  );

  const data = React.useMemo(() => getData(), []);

  return (
    <div>
      <div className="absolute mt-20 border-t w-full" />
      <div className="pt-6 px-8 flex h-full flex-col justify-left">
        <div className="flex flex-row">
          <h1 className="text-2xl mb-5 font-bold">Item Requests</h1>
        </div>
        <div>
          <ItemRequestsTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
}

export default genItemRequestsTab;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const itemsRef = doc(db, "app", "requestItems");
  let itemRequests = (await getDoc(itemsRef))?.data();

  itemRequests = await Promise.all(
    itemRequests?.requests.map(async (request: any) => {
      const user = (await getDoc(request.requestedBy))?.data() as RequestItem;
      return {
        ...request,
        requestedBy: user.name,
        requestedOn: request.requestedOn.toDate().toDateString(),
        fulfilled: request.fulfilled
          ? ItemRequestStatus.Fulfilled
          : ItemRequestStatus.Pending,
      };
    })
  );

  return {
    props: {
      itemRequests,
    },
  };
};
