import ButtonWithIcon from '@components/ButtonWithIcon';
import CaretakerTable from '@components/CaretakerTable';
import Modal from '@components/Modal';
import { db } from '@lib/firebase';
import { clearGlobalAppDefaultCred } from 'firebase-admin/lib/app/credential-factory';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { GetServerSideProps } from 'next';
import router, { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Baby } from './babies';

export enum CommunicationType {
  'N/A' = 'N/A',
  Email = 'Email',
  Text = 'Text',
  Phone = 'Phone',
}

type Caretaker = {
  id: string;
  name: string;
  email: string;
  phone: string;
  registeredDate?: Date;
  assigned: boolean;
  address: string;
  prefferedCommunication: CommunicationType;
  childName: string | null;
  houseHoldInfo: string;
  liabilityWaiver: string;
};

function genCaretakersTab({
  caregivers: caretakers,
  babies: babies,
}: {
  caregivers: any[];
  babies: any[];
}) {
  const [caregivers, setCaretakers] = useState<Caretaker[]>(caretakers);

  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Phone',
        accessor: 'phone',
      },
      { Header: 'Child', accessor: 'child' },
      { Header: 'Status', accessor: 'status' },
    ],
    []
  );

  const data = React.useMemo(() => caregivers, [caregivers]);

  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const deleteCaretaker = async (caretaker: Caretaker) => {
    await deleteDoc(doc(db, 'caregivers', caretaker.id));
    setCaretakers(caretakers.filter((c) => c.id !== caretaker.id));
    alert('Caretaker deleted');
    refreshData();
  };

  const assignCaretaker = async (
    caretakerId: any,
    babyId: any,
    firstName: any,
    lastName: any
  ) => {
    const caretakerRef = doc(db, 'caregivers', caretakerId);
    const babyRef = doc(db, 'babies', babyId);
    await updateDoc(caretakerRef, {
      baby: babyRef,
    });
    const index = caretakers.findIndex(
      (caretaker) => caretaker.id === caretakerId
    );
    const newCaretakers = [...caretakers];
    newCaretakers[index].assigned = true;
    newCaretakers[index].childName = firstName + ' ' + lastName;
    setCaretakers(newCaretakers);
    alert('Baby successfully assigned');
    refreshData();
  };

  const unassignCaretaker = async (caretakerId: any) => {
    const caretakerRef = doc(db, 'caregivers', caretakerId);
    await updateDoc(caretakerRef, {
      baby: null,
    });
    const index = caretakers.findIndex(
      (caretaker) => caretaker.id === caretakerId
    );
    const newCaretakers = [...caretakers];
    newCaretakers[index].assigned = false;
    setCaretakers(newCaretakers);

    alert('Baby successfully unassigned');
    refreshData();
  };

  return (
    <div className='max-h-screen overflow-auto w-full'>
      <div className='absolute mt-20 border-t w-full ' />
      <div className='pt-6 px-8 flex h-full flex-col justify-left'>
        <div className='flex flex-row justify-between'>
          <div className='flex flex-row'>
            <h1 className='text-2xl mb-5 font-bold'>Caretakers</h1>
            <h2 className='pl-4 pt-2 pb-8 text-sm text-slate-500'>
              {caregivers?.length + ' People'}
            </h2>
          </div>
        </div>
        <div className='mt-4 overflow-auto w-full'>
          <CaretakerTable
            columns={columns}
            data={data}
            babies={babies}
            onDelete={deleteCaretaker}
            assignCaretaker={assignCaretaker}
            unassignCaretaker={unassignCaretaker}
          />
        </div>
      </div>
    </div>
  );
}

export default genCaretakersTab;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const itemsRef = query(collection(db, 'caregivers'));
  const babyDocs = await getDocs(query(collection(db, 'babies')));
  const caregiverDocs = await getDocs(itemsRef);

  const caregivers: Caretaker[] = [];
  const babies: any[] = [];

  const formatPhoneNumber = (phoneNumberString: string) => {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      const intlCode = match[1] ? '+1 ' : '';
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return null;
  };

  const datas: any[] = [];
  caregiverDocs.forEach(async (doc) => {
    const data = doc.data();
    datas.push(data);
  });
  const foundBabies = await Promise.all(
    datas.map(async (data) => {
      if (!data.baby) return null;
      const doc: any = await (await getDoc(data.baby)).data();
      return {
        firstName: doc.firstName,
        lastName: doc.lastName,
        id: data.baby.id,
      };
    })
  );

  let i = 0;
  caregiverDocs.forEach(async (doc) => {
    const data = doc.data();
    const child: any = foundBabies[i];
    caregivers.push({
      id: doc.id,
      name: data.firstName + ' ' + data.lastName,
      email: data.email || 'N/A',
      phone: (data.phoneNumber && formatPhoneNumber(data.phoneNumber)) || 'N/A',
      registeredDate: data.createdAt
        ? data.createdAt.toDate().toLocaleDateString()
        : null,
      assigned: child ? true : false,
      address: `${data.address}, ${
        data.apartment ? `${data.apartment}, ` : ''
      }${data.city}, ${data.state}`,
      prefferedCommunication: data.prefferedCommunication || 'N/A',
      childName: child ? child.firstName + ' ' + child.lastName : null,
      houseHoldInfo: `${data.numAdults} adults, ${data.numChildren} children`,
      liabilityWaiver: data.signedWaivers?.at(-1).id || null,
    });
    i++;
  });
  babyDocs.forEach((doc) => {
    const data = doc.data();
    if (!foundBabies.find((baby: any) => baby && baby.id === doc.id))
      babies.push({
        id: doc.id,
        firstName: data?.firstName,
        lastName: data?.lastName,
      });
  });

  return { props: { caregivers, babies } };
};
