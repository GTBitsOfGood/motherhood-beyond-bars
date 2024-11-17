import React, { useEffect, useState } from "react";
import {
  addNewCaregiver,
  deleteCaretaker,
  getCaregivers,
} from "db/actions/admin/Caregiver";
import { CAREGIVERS_TAB } from "@lib/utils/consts";

import Modal from "@components/modal";
import CaretakerModal from "@components/modals/CaretakerModal";
import PaginatedTable from "@components/tables/PaginatedTable";

import Button from "@components/atoms/Button";
import PlusIcon from "@components/Icons/PlusIcon";

const tab = CAREGIVERS_TAB;

export default function GenCaregiversTab() {
  const [caregivers, setCaregivers] = useState<any[]>([]);
  const [filteredCaregivers, setFilteredCaregivers] = useState<any[]>([]);
  const [currPage, setCurrPage] = useState(1);
  const [open, setOpen] = React.useState<any[]>([]);

  const columns = React.useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "Email", accessor: "email" },
      { Header: "Phone", accessor: "phone" },
      { Header: "Assigned to Child?", accessor: "assigned" },
    ],
    []
  );

  const [paginationSize, setPaginationSize] = useState(5);

  useEffect(() => {
    const tableHeight = window.innerHeight - (44 + 16 * 2) - (24 * 2) - (20 * 2) - (42) - (32) - 48.5 - 6; 
    // Header and its margin, margin of PaginatedTable, gaps within PaginatedTable, SearchBar height, Pagination height, Table Header row height, Table scroll bar height
    // TODO check if better way than hardcoding
    const entryHeight = 71;
    const numEntries = Math.max(Math.floor(tableHeight / entryHeight), 3);
    setPaginationSize(numEntries);
  })

  const handleDelete = async (caregiver: any) => {
    deleteCaretaker(caregiver);
    loadData();
  };

  const [addModal, toggleAddModal] = useState(false);

  const paginatedProps = {
    totalRecords: filteredCaregivers.length,
    pageNumber: currPage,
    pageSize: paginationSize,
  };

  const tableProps = {
    columns: columns,
    data: filteredCaregivers.slice(
      (currPage - 1) * paginationSize,
      currPage * paginationSize
    ),
    onDelete: handleDelete,
  };

  async function loadData() {
    const caregivers = await getCaregivers();
    setCaregivers(caregivers);
    setFilteredCaregivers(caregivers);
    setOpen(Array(caregivers.length).fill(false));
  }

  const handleSearch = (input: string) => {
    const filtered = caregivers.filter((caregiver) =>
      caregiver.name.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredCaregivers(filtered);
  };

  useEffect(() => {
    loadData();
  }, []);

  const onNextPage = () => {
    setCurrPage(currPage + 1);
    setOpen(Array(caregivers.length).fill(false));
  };

  const onPrevPage = () => {
    setCurrPage(currPage - 1);
    setOpen(Array(caregivers.length).fill(false));
  };

  return (
    <div className="h-auto">
      <div className="flex flex-col border-t">
        <div className="flex flex-row justify-between mx-9 my-4">
          <div className="flex flex-row gap-6 items-center">
            <h1 className="text-2xl font-bold">Caregivers</h1>
            <h2 className="text-sm text-slate-500">
              {filteredCaregivers?.length + " People"}
            </h2>
          </div>
          <div>
            <Button
              icon={<PlusIcon small={true} />}
              text="Add a caregiver"
              onClick={() => toggleAddModal(true)}
            />
          </div>
        </div>
        <hr className="border-t" />
        <div className="m-6">
          <PaginatedTable
            open={open}
            setOpen={setOpen}
            type={tab}
            tableProps={tableProps}
            paginatedProps={paginatedProps}
            onNextPage={onNextPage}
            onPrevPage={onPrevPage}
            onSearch={handleSearch}
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
                  alert(
                    `${caregiver.firstName} ${caregiver.lastName} has been added!`
                  );
                  loadData();
                })
              }
            />
          </div>
        }
      />
    </div>
  );
}
