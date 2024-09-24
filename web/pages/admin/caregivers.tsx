import React from "react";
import { deleteCaretaker, getCaregiverPage } from "db/actions/admin/Caregiver";
import PaginatedTable from "@components/tables/PaginatedTable";
import { usePaginatedData } from "@components/molecules/Pagination/PaginationHooks";
import { CAREGIVERS_TAB } from "@lib/utils/consts";

const tab = CAREGIVERS_TAB;

export default function genCaregiversTab() {
    const { data: caretakers, totalRecords, currPage, setCurrPage } = usePaginatedData(getCaregiverPage, tab);

    const columns = React.useMemo(() => [
        { Header: "Name", accessor: "name" },
        { Header: "Email", accessor: "email" },
        { Header: "Phone", accessor: "phone" },
    ], []);

    const handleDelete = async (caregiver: any) => {
        deleteCaretaker(caregiver.id).then(() => {
          alert("Caretaker deleted");
          setCurrPage(1)
        })
    };
    
    const paginatedProps = {totalRecords: totalRecords, pageNumber: currPage}
    const tableProps = {columns: columns, data: caretakers, onDelete: handleDelete}

    return (
      <div className="max-h-screen overflow-auto w-full">
        <div className="relative mt-20 border-t w-full " />
          <div className="pt-6 px-8 flex h-full flex-col justify-left">
            <div className="flex flex-row justify-between">
              <div className="flex flex-row">
                <h1 className="text-2xl mb-5 font-bold">Caregivers</h1>
                <h2 className="pl-4 pt-2 pb-8 text-sm text-slate-500">
                  {totalRecords + " People"}
                </h2>
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
    </div>
    );
}


