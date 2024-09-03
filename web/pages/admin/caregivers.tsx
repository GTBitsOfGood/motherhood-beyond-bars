import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import React, { useMemo, useState } from "react";

import { Caregiver } from "@lib/types/users";
import { deleteCaretaker, getCaregivers } from "db/actions/caregiver/Caregiver";

import CaretakerTable from "@components/CaretakerTable";

export enum CommunicationType {
  "N/A" = "N/A",
  Email = "Email",
  Text = "Text",
  Phone = "Phone",
}

export type CaregiverDisplay = Caregiver & {
  name: string;
  phone: string;
  registeredDate?: Date;
  assigned: boolean;
  address: string;
  prefferedCommunication: CommunicationType;
  childName: string | null;
  houseHoldInfo: string;
  liabilityWaiver: string;
};

export default function genCaretakersTab({
  caregivers: caretakers,
}: {
  caregivers: any[];
}) {
  const [caregivers, setCaretakers] =
    useState<Partial<CaregiverDisplay>[]>(caretakers);

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Phone",
        accessor: "phone",
      },
    ],
    []
  );

  const data = React.useMemo(() => caregivers, [caregivers]);

  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  return (
    <div className="max-h-screen overflow-auto w-full">
      <div className="relative mt-20 border-t w-full " />
      <div className="pt-6 px-8 flex h-full flex-col justify-left">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row">
            <h1 className="text-2xl mb-5 font-bold">Caregivers</h1>
            <h2 className="pl-4 pt-2 pb-8 text-sm text-slate-500">
              {caregivers?.length + " People"}
            </h2>
          </div>
        </div>
        <div className="mt-4 overflow-auto w-full">
          <CaretakerTable
            columns={columns}
            data={data}
            onDelete={(caregiver: CaregiverDisplay) =>
              deleteCaretaker(caregiver.id).then(() => {
                setCaretakers(caretakers.filter((c) => c.id !== caregiver.id));
                alert("Caretaker deleted");
                refreshData();
              })
            }
          />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const caregivers: Partial<CaregiverDisplay>[] = await getCaregivers();

  return { props: { caregivers } };
};
