import React from "react";
import ItemRequestsTable from "@components/ItemRequestsTable";
import { GetServerSideProps } from "next";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "@lib/firebase";
import { useRouter } from "next/router";

export enum ItemRequestStatus {
  Pending = "Pending",
  Fulfilled = "Fulfilled",
}

type RequestItem = {
  id: string;
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

  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const markAsFulfilled = async (item: any) => {
    const itemRef = doc(db, "app", "requestItems", "requests", item.id);

    await updateDoc(itemRef, {
      fulfilled: true,
    });

    alert(`${item.displayName} has been marked as fulfilled!`);
    refreshData();
  };

  const markAsPending = async (item: any) => {
    const itemRef = doc(db, "app", "requestItems", "requests", item.id);

    await updateDoc(itemRef, {
      fulfilled: false,
    });

    alert(`${item.displayName} has been marked as pending!`);
    refreshData();
  };

  return (
    <div>
      <div className="absolute mt-20 border-t w-full" />
      <div className="pt-6 px-8 flex h-full flex-col justify-left">
        <div className="flex flex-row">
          <h1 className="text-2xl mb-5 font-bold">Item Requests</h1>
        </div>
        <div>
          <ItemRequestsTable
            columns={columns}
            data={data}
            markAsPending={markAsPending}
            markAsFulfilled={markAsFulfilled}
          />
        </div>
      </div>
    </div>
  );
}

export default genItemRequestsTab;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const itemsRef = query(collection(db, "app", "requestItems", "requests"));
  const items = (await getDocs(itemsRef))?.docs.map((doc) => ({
    data: doc.data(),
    id: doc.id,
  }));

  const itemRequests = await Promise.all(
    items?.map(async ({ data: request, id }) => {
      const user = (await getDoc(request.requestedBy))?.data() as RequestItem;
      return {
        ...request,
        id,
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
