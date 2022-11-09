import React, { useState } from "react";
import BabiesTable from "@components/BabiesTable";
import { GetServerSideProps } from "next";
import { db } from "@lib/firebase";
import { FaPlus } from "react-icons/fa";
import {
  collection,
  query,
  getDocs,
  getDoc,
  Timestamp,
  DocumentReference,
  doc,
  addDoc,
  serverTimestamp,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import ButtonWithIcon from "@components/ButtonWithIcon";
import Modal from "@components/Modal";
import ChildModal from "modals/addChildModal";
import { useRouter } from "next/router";

export type Baby = {
  id: string;
  motherName: string;
  birthday: string;
  sex: string;
  babyBook: string;
  dob: Timestamp;
  firstName: string;
  lastName: string;
};

function genChildrenAndBabyBooksTab({
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

  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const data = React.useMemo(() => getData(), []);

  const [addModal, toggleAddModal] = useState(false);

  const addNewChild = async (child: Baby) => {
    console.log("child", child);

    const newBaby = await addDoc(collection(db, "babies"), {
      ...child,
      dob: child.dob,
      createdAt: serverTimestamp(),
      babyBookEntries: [],
    });

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

export default genChildrenAndBabyBooksTab;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const itemsRef = query(collection(db, "babies"));
  const babyDocs = await getDocs(itemsRef);

  const babies = await Promise.all(
    babyDocs?.docs.map(async (babyDoc: any) => {
      const data = babyDoc.data() as Baby;
      let caretaker: {
        firstName: string;
        lastName: string;
      } = { firstName: "No Caregiver Assigned", lastName: "" };

      const dobDate = new Timestamp(
        data.dob.seconds,
        data.dob.nanoseconds
      ).toDate();

      return {
        id: babyDoc.id,
        firstName: data.firstName,
        lastName: data.lastName,
        name: data?.firstName + " " + data?.lastName || null,
        motherName: data?.motherName || null,
        birthday: dobDate?.toLocaleDateString("en-us") || null,
        sex: data?.sex || null,
        babyBook: "/book/" + babyDoc.id,
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
