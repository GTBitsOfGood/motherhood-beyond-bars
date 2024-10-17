import React, { useEffect, useState } from "react";
import {
  addNewCaregiver,
  deleteCaretaker,
  getCaregiverPage,
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
  const [filteredCaregivers, setFilteredCaregivers] = useState<any[]>([]); // Store filtered caregivers
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
    loadData(); // Refresh data after deletion
  };

  const [addModal, toggleAddModal] = useState(false);

  const paginatedProps = {
    totalRecords: filteredCaregivers.length, // Use filtered data for pagination
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

  // Load caregivers from the API
  async function loadData() {
    const caregivers = await getCaregivers();
    setCaregivers(caregivers);
    setFilteredCaregivers(caregivers); // Initially set filteredCaregivers to the full dataset
  }

  // Filter caregivers based on the search query
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
      <div className="absolute mt-20 border-t" />
      <div className="pt-6 px-9 flex h-full flex-col justify-left">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row">
            <h1 className="text-2xl mb-5 font-bold">Caregivers</h1>
            <h2 className="pl-4 pt-2 pb-8 text-sm text-slate-500">
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
        <div>
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
                })
              }
            />
          </div>
        }
      />
    </div>
  );
}
