import ButtonWithIcon from "@components/buttonWithIcon";
import CaretakerTable from "@components/CaretakerTable";
import Modal from "@components/modal";
import { db } from "@lib/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
} from "firebase/firestore";
import AddCaretakerModal from "modals/addCaretakerModal";
import { GetServerSideProps } from "next";
import router, { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa";

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

function genCaretakersTab({ caregivers: caretakers }: { caregivers: any[] }) {
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
      {
        Header: "Date Registered",
        accessor: "registeredDate",
      },
      {
        Header: "Assigned to Child?",
        accessor: "assigned",
      },
    ],
    []
  );

  const data = React.useMemo(() => caregivers, [caregivers]);

  const [addModal, toggleAddModal] = useState(false);

  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const addNewCaretaker = async (caretaker: any) => {
    await addDoc(collection(db, "caregivers"), {
      ...caretaker,
      createdAt: serverTimestamp(),
    });

    toggleAddModal(false);
    alert(`Caretaker successfully added!`);

    refreshData();
  };

  const deleteCaretaker = async (caretaker: Caretaker) => {
    await deleteDoc(doc(db, "caregivers", caretaker.id));
    setCaretakers(caretakers.filter((c) => c.id !== caretaker.id));
    alert("Caretaker deleted");
    refreshData();
  };

  return (
    <div>
      <div className="absolute mt-20 border-t w-full" />
      <div className="pt-6 px-8 flex h-full flex-col justify-left">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row">
            <h1 className="text-2xl mb-5 font-bold">Caretakers</h1>
            <h2 className="pl-4 pt-2 pb-8 text-sm text-slate-500">
              {caregivers?.length + " People"}
            </h2>
          </div>
          <div>
            <ButtonWithIcon
              icon={<FaPlus />}
              text="Add a caretaker"
              onClick={() => toggleAddModal(true)}
            />
          </div>
        </div>
        <div className="mt-4">
          <CaretakerTable
            columns={columns}
            data={data}
            onDelete={deleteCaretaker}
          />
        </div>
      </div>
      <Modal
        show={addModal}
        content={
          <div className="h-screen flex flex-col items-center justify-center bg-gray-300 overflow-hidden">
            <AddCaretakerModal
              setModal={toggleAddModal}
              onSubmit={addNewCaretaker}
            />
          </div>
        }
      />
    </div>
  );
}

export default genCaretakersTab;

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
      childName: child?.firstName + " " + child?.lastName,
      houseHoldInfo: `${data.numAdults} adults, ${data.numChildren} children`,
      liabilityWaiver: data.signedWaivers?.at(-1).id || null,
    });
  });

  return { props: { caregivers } };
};
