import CaretakerTable from "@components/CaretakerTable";
import { db } from "db/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
} from "firebase/firestore";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";

export enum CommunicationType {
  "N/A" = "N/A",
  Email = "Email",
  Text = "Text",
  Phone = "Phone",
}

type Caretaker = {
  id: string;
  name: string;
  email: string;
  phone: string;
  registeredDate?: Date;
  assigned: boolean;
  address: string;
  prefferedCommunication: CommunicationType;
  childName: string | null;
  houseHoldInfo: string;
  liabilityWaiver: string;
};

export default function genCaretakersTab({
  caregivers: caretakers,
}: {
  caregivers: any[];
}) {
  const [caregivers, setCaretakers] = useState<Caretaker[]>(caretakers);

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Phone",
        accessor: "phone",
      },
    ],
    []
  );

  const data = React.useMemo(() => caregivers, [caregivers]);

  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const deleteCaretaker = async (caretaker: Caretaker) => {
    await deleteDoc(doc(db, "caregivers", caretaker.id));
    setCaretakers(caretakers.filter((c) => c.id !== caretaker.id));
    alert("Caretaker deleted");
    refreshData();
  };

  return (
    <div className="max-h-screen overflow-auto w-full">
      <div className="relative mt-20 border-t w-full " />
      <div className="pt-6 px-8 flex h-full flex-col justify-left">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row">
            <h1 className="text-2xl mb-5 font-bold">Caretakers</h1>
            <h2 className="pl-4 pt-2 pb-8 text-sm text-slate-500">
              {caregivers?.length + " People"}
            </h2>
          </div>
        </div>
        <div className="mt-4 overflow-auto w-full">
          <CaretakerTable
            columns={columns}
            data={data}
            onDelete={deleteCaretaker}
          />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const itemsRef = query(collection(db, "caregivers"));
  const caregiverDocs = await getDocs(itemsRef);

  const caregivers: Caretaker[] = [];

  const formatPhoneNumber = (phoneNumberString: string) => {
    const cleaned = ("" + phoneNumberString).replace(/\D/g, "");
    const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      const intlCode = match[1] ? "+1 " : "";
      return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("");
    }
    return null;
  };

  caregiverDocs.forEach(async (doc) => {
    const data = doc.data();
    const child: any = data.baby ? (await getDoc(data.baby)).data() : null;
    caregivers.push({
      id: doc.id,
      name: data.firstName + " " + data.lastName,
      email: data.email || "N/A",
      phone: (data.phoneNumber && formatPhoneNumber(data.phoneNumber)) || "N/A",
      registeredDate: data.createdAt
        ? data.createdAt.toDate().toLocaleDateString()
        : null,
      assigned: child ? true : false,
      address: `${data.address}, ${
        data.apartment ? `${data.apartment}, ` : ""
      }${data.city}, ${data.state}`,
      prefferedCommunication: data.prefferedCommunication || "N/A",
      childName: child ? child.firstName + " " + child.lastName : null,
      houseHoldInfo: `${data.numAdults} adults, ${data.numChildren} children`,
      // liabilityWaiver: data.signedWaivers?.at(-1).id || null,
      liabilityWaiver: "",
    });
  });

  return { props: { caregivers } };
};
