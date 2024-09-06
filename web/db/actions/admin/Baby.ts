import {
	addDoc,
	collection,
	deleteDoc,
	getDocs,
	doc,
	serverTimestamp,
	updateDoc,
	query,
	Timestamp,
} from 'firebase/firestore';

import { Baby } from '@lib/types/baby';
import { encrypt } from '@lib/utils/encryption';

import { db } from 'db/firebase';

export async function getBabies() {
	const itemsRef = query(collection(db, 'babies'));
	const babyDocs = await getDocs(itemsRef);

	const babies = await Promise.all(
		babyDocs?.docs.map(async (babyDoc: any) => {
			const data = babyDoc.data() as Baby;

			const dobDate = new Timestamp(
				data.dob.seconds,
				data.dob.nanoseconds,
			).toDate();

			const { iv, content } = encrypt(babyDoc.id);

			return {
				id: babyDoc.id,
				firstName: data.firstName,
				lastName: data.lastName,
				name: data?.firstName ?? '' + ' ' + data?.lastName ?? '',
				motherName: data?.motherName || null,
				birthday: dobDate?.toLocaleDateString('en-us') || null,
				sex: data?.sex || null,
				babyBook: `/admin/book/${content}?iv=${iv}`,
			};
		}),
	);

	return babies;
}

export async function getCaregiversInfo() {
	const q = query(collection(db, 'caregivers'));
	const res = await getDocs(q);

	const caregivers = res.docs.map((doc) => ({
		id: doc.id,
		name: doc.data()['firstName'] + ' ' + doc.data()['lastName'],
	}));

	return caregivers;
}

export const addNewChild = async (child: Baby) => {
	let caretakerRef = null;
	if (child.caretakerID) {
		caretakerRef = doc(db, 'caregivers', child.caretakerID);
	}

	const newBaby = await addDoc(collection(db, 'babies'), {
		...child,
		dob: child.dob,
		createdAt: serverTimestamp(),
		caretaker: caretakerRef,
		babyBookEntries: [],
	});

	if (caretakerRef) {
		await updateDoc(caretakerRef, {
			baby: newBaby,
		});
	}
};

export const editBaby = async (baby: any) => {
	// TODO find out why deleting baby.id and if needed
	const babyID = baby.id;
	delete baby.id;
	await updateDoc(doc(db, 'babies', babyID), baby);
};

export const deleteBaby = async (baby: any) => {
	const babyID = baby.id;
	await deleteDoc(doc(db, 'babies', babyID));
};
