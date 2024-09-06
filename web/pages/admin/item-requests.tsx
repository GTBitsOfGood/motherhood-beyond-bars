import React, { useState, useEffect } from 'react';
import ItemRequestsTable from '@components/itemRequestsTable/ItemRequestsTable';
import Ellipse from '@components/Icons/Ellipse';
import DownChevron from '@components/Icons/DownChevron';
import Line31 from '@components/Icons/Line31';
import TrashCan from '@components/Icons/TrashCan';
import {
	collection,
	doc,
	query,
	onSnapshot,
	setDoc,
	Timestamp,
} from 'firebase/firestore';
import { db } from 'db/firebase';

export interface Caregiver {
	firstName: string;
	lastName: string;
	phoneNumber: string;
	email: string;
	id: string;
	numAdults: string;
	numChildren: string;
	agesOfChildren: string;
	signedWaivers: Waiver[];
	itemsRequested: ItemRequest;
	address: string;
	apartment?: string;
	city: string;
	state: string;
	zipCode: string;
	contact: string;
}

export interface Waiver {
	content: string;
	id: string;
	description: string;
	lastUpdated: string;
	name: string;
}

export interface Item {
	name: string;
	gender?: string;
	size?: string;
}

export interface ItemRequest {
	created: Timestamp;
	updated: Timestamp;
	additionalComments: string[];
	status: string;
	items: Item[];
}

export default function genItemRequestsTab() {
	const [selectedSectionIndex, setSelectedSectionIndex] = useState<number>(0);
	const [data, setData] = useState<Caregiver[]>([]);
	const [selectedRows, setSelectedRows] = useState<string[]>([]);
	const [statusExpanded, setStatusExpanded] = useState<boolean>(false);

	const status: { [index: string]: string } = {
		Pending: '#FD8033',
		Approved: '#FFBE4C',
		Completed: '#13B461',
	};

	useEffect(() => {
		const q = query(collection(db, 'caregivers'));

		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			let tempData: any = [];
			querySnapshot.forEach((doc) => {
				const data = doc.data();
				const temp = { ...data, id: doc.id };
				tempData.push(temp);
			});
			tempData = tempData.filter(
				(x: Caregiver) => x.itemsRequested && x.itemsRequested.items,
			);
			setData([...tempData]);
		});

		return unsubscribe;
	}, []);

	const columns = [
		{
			Header: '',
		},
		{
			Header: 'Name',
		},
		{
			Header: 'Items Requested',
		},
		{
			Header: 'Created',
		},
		{
			Header: 'Updated',
		},
		{
			Header: 'Status',
		},
	];

	const changeStatus = async (status: string) => {
		for (const id of selectedRows) {
			let row = data.find((x: Caregiver) => x.id == id);
			if (row) {
				row = {
					...row,
					itemsRequested: { ...row.itemsRequested, status: status },
				};
				updateCaregiver(id, row);
			}
		}
	};

	function updateCaregiver(id: string, row: Caregiver) {
		setDoc(doc(db, 'caregivers', id), row);
	}

	function compareCreated(c1: Caregiver, c2: Caregiver) {
		return c1.itemsRequested.created > c2.itemsRequested.created
			? 1
			: c1.itemsRequested.created < c2.itemsRequested.created
				? -1
				: 0;
	}

	const sections = [
		{
			title: 'All',
			component: (
				<ItemRequestsTable
					columns={columns}
					data={data
						.filter((x: Caregiver) => x.itemsRequested.status == 'Pending')
						.sort((c1: Caregiver, c2: Caregiver) => compareCreated(c1, c2))
						.concat(
							data
								.filter((x: Caregiver) => x.itemsRequested.status == 'Approved')
								.sort((c1: Caregiver, c2: Caregiver) => compareCreated(c1, c2)),
						)
						.concat(
							data
								.filter(
									(x: Caregiver) => x.itemsRequested.status == 'Completed',
								)
								.sort((c1: Caregiver, c2: Caregiver) => compareCreated(c1, c2)),
						)}
					selectedRows={selectedRows}
					setSelectedRows={setSelectedRows}
				/>
			),
		},
		{
			title: 'Pending',
			component: (
				<ItemRequestsTable
					columns={columns}
					data={data
						.filter((x: Caregiver) => x.itemsRequested.status == 'Pending')
						.sort((c1: Caregiver, c2: Caregiver) => compareCreated(c1, c2))}
					selectedRows={selectedRows}
					setSelectedRows={setSelectedRows}
				/>
			),
		},
		{
			title: 'Approved',
			component: (
				<ItemRequestsTable
					columns={columns}
					data={data
						.filter((x: Caregiver) => x.itemsRequested.status == 'Approved')
						.sort((c1: Caregiver, c2: Caregiver) => compareCreated(c1, c2))}
					selectedRows={selectedRows}
					setSelectedRows={setSelectedRows}
				/>
			),
		},
		{
			title: 'Completed',
			component: (
				<ItemRequestsTable
					columns={columns}
					data={data
						.filter((x: Caregiver) => x.itemsRequested.status == 'Completed')
						.sort((c1: Caregiver, c2: Caregiver) => compareCreated(c1, c2))}
					selectedRows={selectedRows}
					setSelectedRows={setSelectedRows}
				/>
			),
		},
		{
			title: 'Deleted',
			component: (
				<ItemRequestsTable
					columns={columns}
					data={data
						.filter((x: Caregiver) => x.itemsRequested.status == 'Deleted')
						.sort((c1: Caregiver, c2: Caregiver) => compareCreated(c1, c2))}
					selectedRows={selectedRows}
					setSelectedRows={setSelectedRows}
				/>
			),
		},
	];

	return (
		<div className='w-full flex flex-col overflow-y-scroll'>
			<div className='flex flex-row items-center py-6 border-b w-full px-10'>
				<h1 className='text-2xl font-bold w-full'>Resource Library</h1>
			</div>
			<section className='flex flex-col flex-grow relative px-10'>
				<div className='border-b flex gap-x-1 mt-8 w-full justify-between'>
					{/* Segmented Control */}
					<div className='flex gap-x-1'>
						{sections.map((section, i) => (
							<button
								className={`py-3 px-6 font-medium rounded-t-md transition-colors border translate-y-px ${
									selectedSectionIndex === i
										? 'bg-blue-700 text-white'
										: 'bg-gray-100 text-gray-400'
								}`}
								onClick={() => {
									setSelectedSectionIndex(i);
								}}
								key={section.title}
							>
								{section.title}
							</button>
						))}
					</div>
					<div className='flex flex-col items-center relative z-10'>
						<div className='flex items-center gap-x-5'>
							<div className='text-[#666666]'>Mark as</div>
							<div className='w-[200px]'>
								<div
									className='flex items-center gap-x-2 cursor-pointer relative z-1 border-[#D9D9D9] border-[1px] py-2 px-2 bg-[#FAFBFC] rounded w-full justify-between'
									onClick={() => {
										setStatusExpanded(!statusExpanded);
									}}
								>
									<div className='text-[#8C8C8C]'>Status</div>
									<DownChevron></DownChevron>
								</div>
								<div
									className={`${
										statusExpanded == true ? 'flex' : 'hidden'
									} shadow-md flex-col font-normal bg-white absolute w-[200px] py-2`}
								>
									{Object.keys(status).map((stat: string) => {
										return (
											<div
												className='flex items-center gap-x-2 cursor-pointer px-3 py-1 hover:bg-[#304CD1]/10'
												key={stat}
												onClick={() => {
													changeStatus(stat);
													setStatusExpanded(false);
													setSelectedRows([]);
												}}
											>
												<Ellipse color={status[stat]}></Ellipse>
												<div>{stat}</div>
											</div>
										);
									})}
								</div>
							</div>
							<Line31 />
							<div
								className='cursor-pointer'
								onClick={() => {
									changeStatus('Deleted');
									setStatusExpanded(false);
									setSelectedRows([]);
								}}
							>
								<TrashCan />
							</div>
						</div>
					</div>
				</div>
				<div className='w-full'>
					{data ? sections[selectedSectionIndex].component : <></>}
				</div>
			</section>
		</div>
	);
}
