import React, { useEffect, useState } from "react";
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

  const handleEdit = async (baby: any) => {
    await editBaby(baby);
    alert("Baby has been updated!");
  };

  const handleDelete = async (baby: any) => {
    await deleteBaby(baby);
    alert("Baby has been deleted!");
  };

  const tableProps = {
    columns: columns,
    data: filteredBabies.slice(
      (currPage - 1) * PAGINATION_PAGE_SIZE,
      currPage * PAGINATION_PAGE_SIZE
    ),
    onEdit: handleEdit,
    onDelete: handleDelete,
  };

  const paginatedProps = {
    totalRecords: filteredBabies.length, // Use filtered data for pagination
    pageNumber: currPage,
  };

  async function loadData() {
    let babies;
    console.log("here");
    console.log(caregiver);
    if (caregiver && typeof caregiver === "string") {
      console.log("attempting to fetch babies from caregiver id");
      babies = await getBabiesFromCaregiver(caregiver);
      console.log(babies);
    }
    if (!babies) {
      babies = await getBabies();
    }
    setBabies(babies);
    setFilteredBabies(babies); // Initially set filteredBabies to full dataset
  }

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
      <div className="flex flex-col border-t">
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
              text="Add a Child"
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
                })
              }
            />
          </div>
        }
      />
    </div>
  );
}
