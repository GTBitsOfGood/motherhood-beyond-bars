import Modal from "@components/modal";
import ChildModal from "@components/modals/ChildModal";
import { getCaregiver } from "db/actions/admin/Caregiver";
import Image from "next/image";
import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useTable } from "react-table";
import book from "../../public/book.svg";
import dots from "../../public/dots.png";

function BabiesTable({ props }: any) {
  if (!props) {
    return <></>;
  }
  const { columns, data, onEdit, onDelete } = props;
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  const [editModal, toggleEditModal] = useState(false);
  const [babyData, setBabyData] = useState({});
  const [selectedOptionsPanel, setSelectedOptionsPanel] = useState(-1);
  const [open, setOpen] = useState(Array(data.length).fill(false));
  const [caretakerContacts, setCaretakerContacts] = useState<any[]>(
    Array(data.length).fill(null)
  );

  const editBaby = (data: any) => {
    toggleEditModal(true);
    setBabyData(data);
  };

  const metadata = {
    "Hospital Name": "hospitalName",
  };

  const getCaretakerContact = async (index: number) => {
    if (!caretakerContacts[index]) {
      const caretakerID = data[index].caretakerID;
      if (caretakerID) {
        const caretakerDoc = await getCaregiver(caretakerID);
        if (caretakerDoc?.exists()) {
          const contact = caretakerDoc.data();
          setCaretakerContacts((prevContacts) => {
            const newContacts = [...prevContacts];
            newContacts[index] = contact;
            return newContacts;
          });
        }
      }
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <div>
          <div className="inline-block">
            <div>
              <table {...getTableProps()}>
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      <th></th> {/* For dropdown arrow */}
                      {headerGroup.headers.map((column) => (
                        <th
                          scope="col"
                          className="py-3 px-6 text-base font-normal tracking-wider text-left text-slate-500"
                          {...column.getHeaderProps()}
                        >
                          {column.render("Header")}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                      <React.Fragment key={i}>
                        <tr
                          onClick={() => {
                            getCaretakerContact(i);
                            setOpen((prevOpen) => {
                              const newOpen = [...prevOpen];
                              newOpen[i] = !newOpen[i];
                              return newOpen;
                            });
                          }}
                          className="cursor-pointer hover:bg-[#B143781A]"
                          {...row.getRowProps()}
                        >
                          <td className="border-t">
                            <RiArrowDropDownLine
                              className={`text-2xl duration-300 cursor-pointer ${
                                open[i] && "rotate-180"
                              }`}
                            />
                          </td>
                          {row.cells.slice(0, -1).map((cell) => {
                            return (
                              <td
                                className="py-4 px-6 text-base border-t font-normal text-black whitespace-nowrap"
                                {...cell.getCellProps()}
                              >
                                {cell.render("Cell")}
                              </td>
                            );
                          })}
                          <td className="border-t">
                            <div className="flex flex-row">
                              <div className="pr-2 pt-1">
                                <Image src={book} />
                              </div>
                              <a
                                href={row.cells.slice(-1)[0].value}
                                className="text-mbb-pink"
                                target="_blank"
                                onClick={(event) => {
                                  event.stopPropagation();
                                }}
                              >
                                Baby Book
                              </a>
                            </div>
                          </td>
                          <td className="border-t">
                            <div className="p-4">
                              <div className="group relative">
                                <button>
                                  <Image
                                    src={dots}
                                    onClick={() => {
                                      if (i === selectedOptionsPanel)
                                        setSelectedOptionsPanel(-1);
                                      else setSelectedOptionsPanel(i);
                                    }}
                                  />
                                </button>
                                <nav
                                  tabIndex={0}
                                  className="absolute w-[127px] rounded-b bg-white border shadow-xl right-1 mt-1 shadow-slate-200 transition-all opacity-0 group-focus-within:visible group-focus-within:opacity-100"
                                  hidden={selectedOptionsPanel !== i}
                                >
                                  <ul className="py-1">
                                    <li>
                                      <div
                                        onClick={() => {
                                          editBaby(row.original);
                                        }}
                                        className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                      >
                                        Edit Profile
                                      </div>
                                    </li>
                                    <li>
                                      <div
                                        onClick={() => {
                                          confirm(
                                            "Are you sure you want to delete this baby?"
                                          ) &&
                                            onDelete(row.original) &&
                                            setSelectedOptionsPanel(-1);
                                        }}
                                        className="block px-4 py-2 text-error-red hover:bg-gray-100 cursor-pointer"
                                      >
                                        Remove
                                      </div>
                                    </li>
                                  </ul>
                                </nav>
                              </div>
                            </div>
                          </td>
                        </tr>

                        {/* TODO fix styles to match the Figma */}
                        {/* TODO either add loading state or serverside fetching */}
                        {/* Additional information section */}
                        {open[i] && (
                          <tr>
                            <td
                              colSpan={columns.length + 1}
                              className="border-b duration-300"
                            >
                              <div className="bg-secondary-background m-2 mx-auto p-4 self-center w-full">
                                <div className="grid grid-cols-3 gap-2">
                                  {Object.keys(metadata).map((key) => {
                                    const data: any = row.original;
                                    const val = data[(metadata as any)[key]];
                                    return val ? (
                                      <React.Fragment key={key}>
                                        <div className="uppercase text-dark-400 font-semibold text-sm">
                                          {key}
                                        </div>
                                        <div className="col-span-2 text-sm">
                                          {val}
                                        </div>
                                      </React.Fragment>
                                    ) : null;
                                  })}
                                  {caretakerContacts[i] && (
                                    <React.Fragment>
                                      <div className="uppercase text-dark-400 font-semibold text-sm">
                                        Caretaker Contact
                                      </div>
                                      <div className="col-span-2 text-sm">
                                        {`${caretakerContacts[i].phone}, ${caretakerContacts[i].email}`}
                                      </div>
                                    </React.Fragment>
                                  )}
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={editModal}
        content={
          <div className="h-screen flex flex-col items-center justify-center bg-gray-300 overflow-hidden">
            <ChildModal
              header="Edit a Child"
              buttonText="Save"
              setModal={toggleEditModal}
              onSubmit={(baby) => {
                onEdit(baby).then(() => {
                  toggleEditModal(false);
                });
              }}
              values={babyData}
            />
          </div>
        }
      />
    </>
  );
}

export default BabiesTable;
