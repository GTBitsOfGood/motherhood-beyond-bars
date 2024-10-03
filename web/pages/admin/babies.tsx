import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import {
  addNewChild,
  editBaby,
  deleteBaby,
  getBabyPage,
} from "db/actions/admin/Baby";

import PaginatedTable from "@components/tables/PaginatedTable";
import ButtonWithIcon from "@components/buttonWithIcon";
import Modal from "@components/modal";
import ChildModal from "@components/modals/ChildModal";
import { usePaginatedData } from "@components/molecules/Pagination/PaginationHooks";
import { BABIES_TAB } from "@lib/utils/consts";

const tab = BABIES_TAB;

export default function genChildrenAndBabyBooksTab() {

  const { data: babies, totalRecords, currPage, setCurrPage, refresh } = usePaginatedData(getBabyPage, tab);

  const columns = React.useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "Caretaker's Name", accessor: "caretakerName"},
      { Header: "Mother's Name", accessor: "motherName" },
      { Header: "Date of Birth", accessor: "birthday" },
      { Header: "Sex", accessor: "sex" },
      { Header: "", accessor: "babyBook" },
    ],
    []
  );

  const [addModal, toggleAddModal] = useState(false);

  const handleEdit = async (baby: any) => {
    await editBaby(baby);
    refresh();
    alert("Baby has been updated!");
  };

  const handleDelete = async (baby: any) => {
    await deleteBaby(baby);
    refresh();
    alert("Baby has been deleted!");
  };

  const paginatedProps = {totalRecords: totalRecords, pageNumber: currPage}
  const tableProps = {columns: columns, data: babies, onEdit: handleEdit, onDelete: handleDelete}

  return (
    <div>
      <div className="absolute mt-20 border-t" />
      <div className="pt-6 px-8 flex h-full flex-col justify-left">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row">
            <h1 className="text-2xl mb-5 font-bold">Children</h1>
            <h2 className="pl-4 pt-2 pb-8 text-sm text-slate-500">
              {totalRecords + " Children"}
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
          <PaginatedTable
            type={tab}
            paginatedProps={paginatedProps}
            tableProps={tableProps}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onNextPage={() => setCurrPage(currPage + 1)}
            onPrevPage={() => setCurrPage(currPage - 1)}
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
                  refresh();
                  alert(`${baby.firstName} ${baby.lastName} has been added!`);
                })
              }
            />
          </div>
        }
      />
    </div>
  );
}