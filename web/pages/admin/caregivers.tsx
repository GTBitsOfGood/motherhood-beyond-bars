import React, { useState } from "react";
import {
  addNewCaregiver,
  deleteCaretaker,
  getCaregiverPage,
} from "db/actions/admin/Caregiver";
import PaginatedTable from "@components/tables/PaginatedTable";
import { usePaginatedData } from "@components/molecules/Pagination/PaginationHooks";
import { CAREGIVERS_TAB } from "@lib/utils/consts";
import ButtonWithIcon from "@components/buttonWithIcon";
import { FaPlus } from "react-icons/fa";
import Modal from "@components/modal";
import CaretakerModal from "@components/modals/CaretakerModal";

const tab = CAREGIVERS_TAB;

export default function genCaregiversTab() {
  const {
    data: caretakers,
    totalRecords,
    currPage,
    setCurrPage,
    refresh,
  } = usePaginatedData(getCaregiverPage, tab);

  const columns = React.useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "Email", accessor: "email" },
      { Header: "Phone", accessor: "phone" },
      { Header: "Assigned to Child?", accessor: "assigned" },
    ],
    []
  );

  const handleDelete = async (caregiver: any) => {
    deleteCaretaker(caregiver).then(() => {
      refresh();
    });
  };

  const [addModal, toggleAddModal] = useState(false);
  const paginatedProps = { totalRecords: totalRecords, pageNumber: currPage };
  const tableProps = {
    columns: columns,
    data: caretakers,
    onDelete: handleDelete,
  };

  return (
    <div>
      <div className="absolute mt-20 border-t" />
      <div className="pt-6 px-8 flex h-full flex-col justify-left">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row">
            <h1 className="text-2xl mb-5 font-bold">Caregivers</h1>
            <h2 className="pl-4 pt-2 pb-8 text-sm text-slate-500">
              {totalRecords + " People"}
            </h2>
          </div>
          <div>
            <ButtonWithIcon
              icon={<FaPlus />}
              text="Add a caregiver"
              onClick={() => toggleAddModal(true)}
            />
          </div>
        </div>
        <div className="mt-4 overflow-auto w-full">
          <PaginatedTable
            type={tab}
            tableProps={tableProps}
            paginatedProps={paginatedProps}
            onNextPage={() => setCurrPage(currPage + 1)}
            onPrevPage={() => setCurrPage(currPage - 1)}
          />
        </div>
      </div>
      <Modal
        show={addModal}
        content={
          <div className="h-screen flex flex-col items-center justify-center overflow-hidden">
            <CaretakerModal
              setModal={toggleAddModal}
              onSubmit={(caregiver) =>
                addNewCaregiver(caregiver).then(() => {
                  toggleAddModal(false);
                  refresh();
                  alert(
                    `${caregiver.firstName} ${caregiver.lastName} has been added!`
                  );
                })
              }
            />
          </div>
        }
      />
    </div>
  );
}
