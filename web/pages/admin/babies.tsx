import BabiesTable from "@components/BabiesTable";
import ButtonWithIcon from "@components/buttonWithIcon";
import Modal from "@components/modal";
import { db } from "db/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentReference,
  getDocs,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import ChildModal from "@components/modals/addChildModal";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { encrypt } from "@lib/utils/encryption";

export type Baby = {
  id: string;
  caretakerName: string;
  caretakerID: string;
  caretaker: DocumentReference;
  motherName: string;
  birthday: string;
  sex: string;
  babyBook: string;
  dob: Timestamp;
  firstName: string;
  lastName: string;
  hospitalName: string;
};

export default function genChildrenAndBabyBooksTab({
  babies,
  caregivers,
}: {
  babies: Baby[];
  caregivers: any[];
}) {
  const getData = () => babies;

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
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

  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const data = React.useMemo(() => getData(), []);

  const [addModal, toggleAddModal] = useState(false);

  const addNewChild = async (child: Baby) => {
    let caretakerRef = null;
    if (child.caretakerID) {
      caretakerRef = doc(db, "caregivers", child.caretakerID);
    }

    const newBaby = await addDoc(collection(db, "babies"), {
      ...child,
      dob: child.dob,
      createdAt: serverTimestamp(),
      caretaker: caretakerRef,
      babyBookEntries: [],
    });

    if (caretakerRef) {
      await updateDoc(caretakerRef, {
        baby: newBaby,
      });
    }

    toggleAddModal(false);
    alert(`${child.firstName} ${child.lastName} has been added!`);
    refreshData();
  };

  const editBaby = async (baby: any) => {
    const babyID = baby.id;
    delete baby.id;
    await updateDoc(doc(db, "babies", babyID), baby);

    alert("Baby has been updated!");
    refreshData();
  };

  const deleteBaby = async (baby: any) => {
    const babyID = baby.id;

    await deleteDoc(doc(db, "babies", babyID));

    alert("Baby has been deleted!");
    refreshData();
  };

  return (
    <div>
      <div className="absolute mt-20 border-t" />
      <div className="pt-6 px-8 flex h-full flex-col justify-left">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row">
            <h1 className="text-2xl mb-5 font-bold">Children</h1>
            <h2 className="pl-4 pt-2 pb-8 text-sm text-slate-500">
              {babies.length + " Children"}
            </h2>
          </div>
          <div>
            <ButtonWithIcon
              icon={<FaPlus />}
              text="Add a Child"
              onClick={() => toggleAddModal(true)}
            />
          </div>
        </div>
        <div className="mt-4">
          <BabiesTable
            columns={columns}
            data={data}
            onEdit={editBaby}
            onDelete={deleteBaby}
            caretakers={caregivers}
          />
        </div>
      </div>
      <Modal
        show={addModal}
        content={
          <div className="h-screen flex flex-col items-center justify-center overflow-hidden">
            <ChildModal
              header="Add a Child"
              setModal={toggleAddModal}
              onSubmit={addNewChild}
              caretakers={caregivers}
            />
          </div>
        }
      />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const itemsRef = query(collection(db, "babies"));
  const babyDocs = await getDocs(itemsRef);

  const babies = await Promise.all(
    babyDocs?.docs.map(async (babyDoc: any) => {
      const data = babyDoc.data() as Baby;

      const dobDate = new Timestamp(
        data.dob.seconds,
        data.dob.nanoseconds
      ).toDate();

      const { iv, content } = encrypt(babyDoc.id);

      return {
        id: babyDoc.id,
        firstName: data.firstName,
        lastName: data.lastName,
        name: data?.firstName ?? "" + " " + data?.lastName ?? "",
        motherName: data?.motherName || null,
        birthday: dobDate?.toLocaleDateString("en-us") || null,
        sex: data?.sex || null,
        babyBook: `/admin/book/${content}?iv=${iv}`,
      };
    })
  );

  const q = query(collection(db, "caregivers"));
  const res = await getDocs(q);

  const caregivers = res.docs.map((doc) => ({
    id: doc.id,
    name: doc.data()["firstName"] + " " + doc.data()["lastName"],
  }));

  return {
    props: {
      babies,
      caregivers,
    },
  };
};
