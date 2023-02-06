import { db } from '@lib/firebase';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  query,
  updateDoc,
} from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { HiOutlineTrash, HiX } from 'react-icons/hi';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { useTable } from 'react-table';
import Tooltip from './ToolTip';

function CaretakerTable({
  columns,
  data,
  onDelete,
  babies,
  assignCaretaker,
  unassignCaretaker,
}: any) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  const [open, setOpen] = React.useState(Array(data.length).fill(false));
  const [childSelectOpen, setChildSelectOpen] = React.useState(-1);

  const metadata = {
    Address: 'address',
    'Pref. Communication': 'prefferedCommunication',
    'Child Name': 'childName',
    'Household Info': 'houseHoldInfo',
    'Liability Waiver': 'liabilityWaiver',
  };

  return (
    <div className='flex flex-col'>
      <div className='sm:-mx-6 lg:-mx-8'>
        <div className='inline-block sm:px-6 lg:px-8 w-full'>
          <div>
            <table {...getTableProps()} className='w-full'>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    <th></th>
                    {headerGroup.headers.map((column) => (
                      <th
                        scope='col'
                        className='py-3 px-6 text-base font-normal tracking-wider text-slate-500 text-center'
                        {...column.getHeaderProps()}
                      >
                        {column.render('Header')}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                  prepareRow(row);
                  return (
                    <>
                      <tr {...row.getRowProps()}>
                        <td
                          className='border-t hover:cursor-pointer'
                          onClick={() => {
                            setOpen((prevOpen) => {
                              const newOpen = [...prevOpen];
                              newOpen[i] = !newOpen[i];
                              return newOpen;
                            });
                          }}
                        >
                          <RiArrowDropDownLine
                            className={`text-2xl duration-300 ${
                              open[i] && 'rotate-180'
                            }`}
                          />
                        </td>
                        {row.cells.map((cell) => {
                          return (
                            <>
                              <td
                                className='py-4 px-6 text-base border-t font-normal text-black whitespace-nowrap'
                                {...cell.getCellProps()}
                              >
                                {cell.column.id === 'status' ? (
                                  data[i].assigned ? (
                                    <div className='text-base bg-blue-200 text-center rounded-md p-2'>
                                      1 child
                                    </div>
                                  ) : (
                                    <div className='text-base bg-orange-200 text-center rounded-md p-2'>
                                      Not assigned
                                    </div>
                                  )
                                ) : cell.column.id === 'child' ? (
                                  <div
                                    className='relative text-base text-center rounded-md p-2 hover:cursor-pointer'
                                    onClick={() => {
                                      if (data[i].assigned)
                                        confirm(
                                          'Are you sure you want to unassign this child?'
                                        ) && unassignCaretaker(data[i].id);
                                      if (childSelectOpen === i)
                                        setChildSelectOpen(-1);
                                      else setChildSelectOpen(i);
                                    }}
                                  >
                                    {!data[i].assigned ? (
                                      <div className='flex w-full justify-between items-center'>
                                        <span>Assign a child</span>{' '}
                                        <RiArrowDropDownLine
                                          className={`text-2xl duration-300 cursor-pointer ${
                                            childSelectOpen === i &&
                                            'rotate-180'
                                          }`}
                                        />
                                      </div>
                                    ) : (
                                      <div className='flex w-full justify-between items-center'>
                                        <span>{data[i].childName}</span>
                                        <HiX className='text-lg cursor-pointer' />
                                      </div>
                                    )}
                                    {childSelectOpen === i &&
                                      !data[i].assigned && (
                                        <div className='absolute overflow-y-auto left-0 -right-10 max-h-60 rounded-md bg-white z-30 border-slate-200 border mt-2 py-2 divide-y divide-slate-200'>
                                          {babies.length === 0 ? (
                                            <div className='p-2'>
                                              No babies left to assign
                                            </div>
                                          ) : (
                                            babies.map((baby: any) => (
                                              <div
                                                className='flex flex-col text-center p-2 hover:bg-slate-100'
                                                onClick={() => {
                                                  confirm(
                                                    `Are you sure you want to assign ${baby.name} to this caretaker?`
                                                  ) &&
                                                    assignCaretaker(
                                                      data[i].id,
                                                      baby.id,
                                                      baby.firstName,
                                                      baby.lastName
                                                    );
                                                }}
                                              >
                                                {baby.firstName +
                                                  ' ' +
                                                  baby.lastName}
                                              </div>
                                            ))
                                          )}
                                        </div>
                                      )}
                                  </div>
                                ) : (
                                  cell.render('Cell')
                                )}
                              </td>
                            </>
                          );
                        })}
                        <td className='border-t'>
                          <div className='flex flex-row'>
                            <div
                              className='pr-2 pt-1 cursor-pointer'
                              onClick={() => {
                                confirm(
                                  'Are you sure you want to delete this caretaker?'
                                ) && onDelete(row.original);
                              }}
                            >
                              <Tooltip tooltipText='Delete'>
                                <HiOutlineTrash className='text-lg' />
                              </Tooltip>
                            </div>
                          </div>
                        </td>
                      </tr>
                      {open[i] && (
                        <tr>
                          <td
                            colSpan={columns.length + 1}
                            className='border-b duration-300'
                          >
                            <div>
                              <div className='m-2 bg-gray-200 p-4 self-center mx-auto w-full'>
                                <div className='grid grid-cols-3 gap-2'>
                                  {Object.keys(metadata).map((key) => {
                                    const data: any = row.original;
                                    const val = data[(metadata as any)[key]];
                                    return val ? (
                                      <>
                                        <div
                                          key={key}
                                          className='uppercase text-gray-600 font-semibold text-sm'
                                        >
                                          {key}
                                        </div>
                                        <div key={key} className='col-span-2'>
                                          {key === 'Liability Waiver' ? (
                                            <Link href={`/waivers/${val}`}>
                                              <a className='text-sm text-blue-400'>
                                                Link
                                              </a>
                                            </Link>
                                          ) : (
                                            <div className='text-sm'>{val}</div>
                                          )}
                                        </div>
                                      </>
                                    ) : null;
                                  })}
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CaretakerTable;
