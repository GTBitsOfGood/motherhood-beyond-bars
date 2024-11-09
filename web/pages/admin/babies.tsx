import React, { useEffect, useLayoutEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import {
  addNewChild,
  editBaby,
  deleteBaby,
  getBabies,
} from "db/actions/admin/Baby";

import PaginatedTable from "@components/tables/PaginatedTable";
import ButtonWithIcon from "@components/buttonWithIcon";
import Modal from "@components/modal";
import ChildModal from "@components/modals/ChildModal";
import { BABIES_TAB } from "@lib/utils/consts";
import { PAGINATION_PAGE_SIZE } from "db/consts";
import { useRouter } from "next/router";
import { getBabiesFromCaregiver } from "db/actions/shared/babyCaregiver";

const tab = BABIES_TAB;

export default function genChildrenAndBabyBooksTab() {
  const router = useRouter();
  const { caregiver } = router.query;
  const [babies, setBabies] = useState<any[]>([]);
  const [filteredBabies, setFilteredBabies] = useState<any[]>([]); // Store filtered babies
  const [currPage, setCurrPage] = useState(1);
  const [addModal, toggleAddModal] = useState(false);

  const columns = React.useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "Caretaker's Name", accessor: "caretakerName" },
      { Header: "Mother's Name", accessor: "motherName" },
      { Header: "Date of Birth", accessor: "birthday" },
      { Header: "Sex", accessor: "sex" },
      { Header: "", accessor: "babyBook" },
    ],
    []
  );

  const [paginationSize, setPaginationSize] = useState(5);

  useEffect(() => {
    const tableHeight = window.innerHeight - (44 + 16 * 2) - (24 * 2) - (20 * 2) - (42) - (32) - 72.5; 
    // Header and its margin, margin of PaginatedTable, gaps within PaginatedTable, SearchBar height, Pagination height, Table Header row height
    const entryHeight = 97;
    const numEntries = Math.max(Math.floor(tableHeight / entryHeight), 3);
    setPaginationSize(numEntries);
  })

  const handleEdit = async (baby: any) => {
    await editBaby(baby);
    alert("Baby has been updated!");
    loadData();
  };

  const handleDelete = async (baby: any) => {
    await deleteBaby(baby);
    alert("Baby has been deleted!");
    loadData();
  };

  const tableProps = {
    columns: columns,
    data: filteredBabies.slice(
      (currPage - 1) * paginationSize,
      currPage * paginationSize
    ),
    onEdit: handleEdit,
    onDelete: handleDelete,
  };

  const paginatedProps = {
    totalRecords: filteredBabies.length, // Use filtered data for pagination
    pageNumber: currPage,
    pageSize: paginationSize,
  };

  async function loadData() {
    let babies;
    if (caregiver && typeof caregiver === "string") {
      babies = await getBabiesFromCaregiver(caregiver);
    }
    if (!babies) {
      babies = await getBabies();
    }
    setBabies(babies);
    setFilteredBabies(babies);
  }

  // TODO add some intuitive way to either go back or clear search
  // Filter babies based on the search query
  const handleSearch = (input: string) => {
    const filtered = babies.filter((baby) =>
      baby.name.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredBabies(filtered);
  };

  useEffect(() => {
    loadData();
  }, [caregiver]);

  return (
    <div>
      <div className="w-full h-full flex flex-col border-t">
        <div className="flex flex-row justify-between mx-9 my-4">
          <div className="flex flex-row gap-6 items-center">
            <h1 className="text-2xl font-bold">Children</h1>
            <h2 className="text-sm text-slate-500">
              {filteredBabies?.length + " Children"}
            </h2>
          </div>
          <div>
            <ButtonWithIcon
              icon={<FaPlus />}
              text="Add a child"
              onClick={() => toggleAddModal(true)}
            />
          </div>
        </div>
        <hr className="border-t" />
        <div className="m-6">
          <PaginatedTable
            type={tab}
            paginatedProps={paginatedProps}
            tableProps={tableProps}
            onEdit={handleEdit}
            onDelete={handleDelete}
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
            <ChildModal
              header="Add a Child"
              setModal={toggleAddModal}
              onSubmit={(baby) =>
                addNewChild(baby).then(() => {
                  toggleAddModal(false);
                  alert(`${baby.firstName} ${baby.lastName} has been added!`);
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
