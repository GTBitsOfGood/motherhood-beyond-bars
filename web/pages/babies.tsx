import React from "react";
import BabiesTable from "@components/BabiesTable";
import { GetServerSideProps } from "next";
import { db } from "@lib/firebase";
import {
  collection,
  query,
  getDocs,
  getDoc,
  Timestamp,
  doc,
  DocumentReference,
} from "firebase/firestore";

type Baby = {
  caretakerName: string;
  caretaker: DocumentReference;
  motherName: string;
  birthday: string;
  sex: string;
  babyBook: string;
  dob: Timestamp;
  firstName: string;
  lastName: string;
};

function genChildrenAndBabyBooksTab({ babies }: { babies: Baby[] }) {
  const getData = () => babies;

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Caretaker's Name",
        accessor: "caretakerName",
      },
      {
        Header: "Mother's Name",
        accessor: "motherName",
      },
      {
        Header: "Date of Birth",
        accessor: "birthday",
      },
      {
        Header: "Sex",
        accessor: "sex",
      },
      {
        Header: "",
        accessor: "babyBook",
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
          <h1 className="text-2xl mb-5 font-bold">Children</h1>
          <h2 className="pl-4 pt-2 pb-8 text-sm text-slate-500">
            {babies.length + " Children"}
          </h2>
        </div>
        <div className="mt-4">
          <BabiesTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
}

export default genChildrenAndBabyBooksTab;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const itemsRef = query(collection(db, "babies"));
  let babyDocs = await getDocs(itemsRef);

  let babies = await Promise.all(
    babyDocs?.docs.map(async (babyDoc: any) => {
      const data = babyDoc.data() as Baby;

      const caretaker = (await getDoc(data?.caretaker))?.data() as {
        firstName: string;
        lastName: string;
      };
      return {
        name: data?.firstName + " " + data?.lastName || null,
        caretakerName: caretaker?.firstName + " " + caretaker?.lastName || null,
        motherName: data?.motherName || null,
        birthday: data?.dob?.toDate().toLocaleDateString("en-us") || null,
        sex: data?.sex || null,
        babyBook: "/book/" + babyDoc.id,
      };
    })
  );

  return {
    props: {
      babies,
    },
  };
};
