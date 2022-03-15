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
} from "firebase/firestore";
import ButtonWithIcon from "@components/buttonWithIcon";
import Modal from "@components/modal";
import AddChildModal from "modals/addChildModal";

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

  const data = React.useMemo(() => getData(), []);

  const [addModal, toggleAddModal] = useState(false);

  const addNewChild = async (child: Baby) => {
    const caretakerRef = doc(db, "caregivers", child.caretaker.id);

    const newBaby = await addDoc(collection(db, "babies"), {
      ...child,
      dob: child.dob,
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
    <div>
      <div className="absolute mt-20 border-t w-full" />
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
          <BabiesTable columns={columns} data={data} />
        </div>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const itemsRef = query(collection(db, "babies"));
  let babyDocs = await getDocs(itemsRef);

  let babies = await Promise.all(
    babyDocs?.docs.map(async (babyDoc: any) => {
      const data = babyDoc.data() as Baby;
      let caretaker: {
        firstName: string;
        lastName: string;
      } = { firstName: "No Caregiver Assigned", lastName: "" };
      try {
        caretaker = (await getDoc(data?.caretaker))?.data() as {
          firstName: string;
          lastName: string;
        };
      } catch (e) {
        console.log(`Couldn't get caretaker for ${data.firstName}`);
      }
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
