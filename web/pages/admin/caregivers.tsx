import React, { useEffect, useState } from "react";
import {
  addNewCaregiver,
  deleteCaretaker,
  getCaregivers,
} from "db/actions/admin/Caregiver";
import PaginatedTable from "@components/tables/PaginatedTable";
import { CAREGIVERS_TAB } from "@lib/utils/consts";
import ButtonWithIcon from "@components/buttonWithIcon";
import { FaPlus } from "react-icons/fa";
import Modal from "@components/modal";
import CaretakerModal from "@components/modals/CaretakerModal";
import { PAGINATION_PAGE_SIZE } from "db/consts";

const tab = CAREGIVERS_TAB;

export default function genCaregiversTab() {
  const [caregivers, setCaregivers] = useState<any[]>([]);
  const [filteredCaregivers, setFilteredCaregivers] = useState<any[]>([]);
  const [currPage, setCurrPage] = useState(1);

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
    deleteCaretaker(caregiver);
    loadData();
  };

  const [addModal, toggleAddModal] = useState(false);

  const paginatedProps = {
    totalRecords: filteredCaregivers.length,
    pageNumber: currPage,
  };

  const tableProps = {
    columns: columns,
    data: filteredCaregivers.slice(
      (currPage - 1) * PAGINATION_PAGE_SIZE,
      currPage * PAGINATION_PAGE_SIZE
    ),
    onDelete: handleDelete,
  };

  async function loadData() {
    const caregivers = await getCaregivers();
    setCaregivers(caregivers);
    setFilteredCaregivers(caregivers);
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

  return (
    <div>
      <div className="flex flex-col border-t">
        <div className="flex flex-row justify-between mx-9 my-4">
          <div className="flex flex-row gap-6 items-center">
            <h1 className="text-2xl font-bold">Caregivers</h1>
            <h2 className="text-sm text-slate-500">
              {filteredCaregivers?.length + " People"}
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
        <hr className="border-t" />
        <div className="m-6">
          <PaginatedTable
            type={tab}
            tableProps={tableProps}
            paginatedProps={paginatedProps}
            onNextPage={() => setCurrPage(currPage + 1)}
            onPrevPage={() => setCurrPage(currPage - 1)}
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
