import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

import ButtonWithIcon from "@components/buttonWithIcon";
import AddChildModal from "modals/addChildModal";
import Modal from "@components/modal";
import { GetServerSideProps } from "next";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@lib/firebase";

type Caregivers = {
  id: string;
  name: string;
};

enum BabyGender {
  male,
  female,
}

type Baby = {
  firstName: string;
  lastName: string;
  dob: string;
  sex: BabyGender;
  caretaker: string;
  motherName: string;
  hospitalName?: string;
};

function genChildrenAndBabyBooksTab({
  caregivers,
}: {
  caregivers: Caregivers[];
}) {
  const [addModal, toggleAddModal] = useState(false);

  const addNewChild = async (child: Baby) => {
    const caretakerRef = doc(db, "caregivers", child.caretaker);

    const newBaby = await addDoc(collection(db, "babies"), {
      ...child,
      dob: Timestamp.fromDate(new Date(child.dob)),
      createdAt: serverTimestamp(),
      caretaker: caretakerRef,
      babyBookEntries: [],
    });

    await updateDoc(caretakerRef, {
      baby: newBaby,
    });

    toggleAddModal(false);
    alert(`${child.firstName} ${child.lastName} has been added!`);
  };

  return (
    <div className="px-8 h-full w-full">
      <div className="flex justify-between">
        <h1 className="text-2xl mb-5 font-bold">Children and Baby Books</h1>
        <ButtonWithIcon
          icon={<FaPlus />}
          text="Add a Child"
          onClick={() => toggleAddModal(true)}
        />
      </div>

      <Modal
        show={addModal}
        content={
          <div className="h-screen flex flex-col items-center justify-center bg-gray-300 overflow-hidden">
            <AddChildModal
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

export const getServerSideProps: GetServerSideProps = async (_context) => {
  const q = query(collection(db, "caregivers"));
  const res = await getDocs(q);

  const caregivers = res.docs.map((doc) => ({
    id: doc.id,
    name: doc.data()["firstName"] + " " + doc.data()["lastName"],
  }));

  return {
    props: {
      caregivers,
    },
  };
};
