import * as functions from 'firebase-functions';
import admin from '../shared/admin';
import { EventContext } from 'firebase-functions/v1';
import { UserRecord } from 'firebase-functions/v1/auth';

import db from '../shared/db';

interface Baby {
	name: string;
	caregiverEmail: string;
}

const validateSigninRequest = functions.auth
	.user()
	.onCreate(async (user: UserRecord, _context: EventContext) => {
		const authorizedEmails = await db.collection('app').doc('admin').get();

		if (authorizedEmails.data()?.whitelist.includes(user.email)) {
			// user is an admin
			await admin.auth().setCustomUserClaims(user.uid, { admin: true });
			console.log(`${user.email} - admin claim added`);
			return true;
		} else {
			// user is not an admin

			let babies: Baby[] = [];
			// check if user (caregiver) has baby associated to them
			const allBabies = await db.collection('babies').get();
			allBabies.docs.forEach(async (doc) => {
				if (user.email === doc.data().caregiverEmail) {
					babies.push(doc.data() as Baby);
				}
			});

			if (babies.length !== 0) {
				await admin.auth().setCustomUserClaims(user.uid, { caregiver: true });
				return true;
			} else return false;
		}
	});

export default validateSigninRequest;
