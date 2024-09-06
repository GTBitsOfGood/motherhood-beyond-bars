import PictureArray from '@components/BabyBook/PictureArray';
import PictureModal from '@components/BabyBook/PictureModal';
import SideBar from '@components/BabyBook/Sidebar';
import TopBar from '@components/BabyBook/Topbar';
import { db } from 'db/firebase';
import {
	collection,
	doc,
	DocumentReference,
	getDoc,
	getDocs,
	orderBy,
	query as doQuery,
	Timestamp,
} from 'firebase/firestore';
import { GetServerSideProps } from 'next';
import { Baby } from 'pages/admin/babies';
import { useState } from 'react';
import { decrypt } from '@lib/utils/encryption';

export default function BabyBook({
	babyBook,
	totImages,
	baby,
	content,
	iv,
}: Props) {
	const [isPictureSelected, setIsPictureSelected] = useState<boolean>(false);
	const [selectedImage, setSelectedImage] = useState<BabyImage>();
	const [currIndexes, setCurrIndexes] = useState({ i: -1, j: -1, k: -1 });
	const selectImage = (i: number, j: number, k: number) => {
		setIsPictureSelected(true);
		setSelectedImage(babyBook[i].months[j].images[k]);
		setCurrIndexes({ i, j, k });
	};
	const selectImageOffset = (
		i: number,
		j: number,
		k: number,
		forward: boolean,
	) => {
		const current = babyBook[i].months[j].images;
		k += forward ? 1 : -1;
		if (k === current.length || k < 0) {
			if (forward) {
				k = 0;
				j += 1;
			} else j -= 1;
			const currMonths = babyBook[i].months;
			if (j < 0 || j === currMonths.length) {
				if (forward) {
					j = 0;
					i += 1;
				} else {
					i -= 1;
					j = babyBook[i]?.months.length - 1;
					k = babyBook[i]?.months[j]?.images.length - 1;
				}
				if (i < 0 || i === babyBook.length) return;
			}
		}
		selectImage(i, j, k);
	};
	const deselectImage = () => {
		setIsPictureSelected(false);
	};
	return (
		<div className='flex flex-col w-full h-full'>
			<TopBar
				number={totImages}
				name={baby.name}
				motherName={baby.mother}
				content={content}
				iv={iv}
			/>
			<div className='relative flex grow-0 overflow-hidden'>
				<SideBar babyBook={babyBook} />
				<PictureArray babyBook={babyBook} select={selectImage} />
				{isPictureSelected && (
					<PictureModal
						image={selectedImage}
						selectImage={selectImageOffset}
						currentIndexs={currIndexes}
						deselect={deselectImage}
					/>
				)}
			</div>
		</div>
	);
}

interface Props {
	babyBook: BabyBookYear[];
	totImages: number;
	baby: {
		name: string;
		mother: string;
	};
	content: string;
	iv: string;
}

export interface BabyBookYear {
	year: number;
	months: BabyBookMonth[];
}

export interface BabyBookMonth {
	month: number;
	images: BabyImage[];
}

export interface BabyImage {
	caption: string;
	date: {
		seconds: number;
		nanoseconds: number;
	};
	imageUrl: string;
	caregiverId: string;
}

interface RawBabyImage {
	caption: string;
	date: Timestamp;
	imageURL: string;
	caregiverID: DocumentReference;
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
	params,
	query,
}) => {
	const props = {
		babyBook: [] as BabyBookYear[],
		totImages: 0,
		baby: { name: '', mother: '' },
		content: '',
		iv: '',
	};
	if (!params || !params.babyId || !query.iv) return { props };
	props.content = params?.babyId as string;
	props.iv = query.iv as string;
	const babyId = decrypt({
		content: params?.babyId as string,
		iv: query.iv as string,
	});

	const babyRef = doc(db, 'babies', babyId as string);
	const baby = await getDoc(babyRef);
	const babyData = baby.data() as Baby;
	props.baby = {
		name: babyData.firstName + ' ' + babyData.lastName,
		mother: babyData.motherName,
	};
	const babyBookRef = doQuery(
		collection(db, `babies/${babyId}/book`),
		orderBy('date', 'desc'),
	);
	const babyBookDocs = await getDocs(babyBookRef);
	babyBookDocs.docs.forEach((book) => {
		props.totImages = props.totImages + 1;
		const raw = book.data() as RawBabyImage;
		const date = raw.date.toDate();

		const currYear = date.getFullYear();
		if (
			props.babyBook.length < 1 ||
			props.babyBook[props.babyBook.length - 1].year !== currYear
		)
			props.babyBook.push({ year: currYear, months: [] });
		const year = props.babyBook[props.babyBook.length - 1];

		const currMonth = date.getMonth();
		if (
			year.months.length < 1 ||
			year.months[year.months.length - 1].month !== currMonth
		)
			year.months.push({ month: currMonth, images: [] });
		year.months[year.months.length - 1].images.push({
			caption: raw.caption || '',
			imageUrl: raw.imageURL,
			caregiverId: raw.caregiverID?.id || '',
			date: {
				seconds: raw.date.seconds,
				nanoseconds: raw.date.nanoseconds,
			},
		});
	});

	return {
		props,
	};
};
