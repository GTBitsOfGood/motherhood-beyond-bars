import admin from 'firebase-admin';
import config from './config';

try {
	admin.initializeApp({
		credential: admin.credential.cert(config),
	});
	console.log('Initialized.');
} catch (error) {
	/*
	 * We skip the "already exists" message which is
	 * not an actual error when we're hot-reloading.
	 */
	if (error instanceof Error && !/already exists/.test(error.message)) {
		console.error('Firebase admin initialization error', error.stack);
	}
}

export default admin;
