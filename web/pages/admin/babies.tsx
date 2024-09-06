import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

import { Baby } from "@lib/types/baby";
import {
  addNewChild,
  editBaby,
  deleteBaby,
  getBabies,
  getCaregiversInfo,
} from "db/actions/admin/Baby";

import BabiesTable from "@components/BabiesTable";
import ButtonWithIcon from "@components/buttonWithIcon";
import Modal from "@components/modal";
import ChildModal from "@components/modals/addChildModal";

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

  // TODO this doesn't work, need better way to update table after adding/deleting objects
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const data = React.useMemo(() => getData(), []);

  const [addModal, toggleAddModal] = useState(false);

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
            onEdit={(baby: any) =>
              editBaby(baby).then(() => {
                toggleAddModal(false);
                alert("Baby has been updated!");
                refreshData();
              })
            }
            onDelete={(baby: any) =>
              deleteBaby(baby).then(() => {
                alert("Baby has been deleted!");
                refreshData();
              })
            }
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
              onSubmit={(baby) =>
                addNewChild(baby).then(() => {
                  toggleAddModal(false);
                  alert(`${baby.firstName} ${baby.lastName} has been added!`);
                  refreshData();
                })
              }
              caretakers={caregivers}
            />
          </div>
        }
      />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const babies = await getBabies();
  const caregivers = await getCaregiversInfo();

  return {
    props: {
      babies,
      caregivers,
    },
  };
};
