import * as functions from 'firebase-functions';
import { requestItemApp } from './https';
import * as dotenv from 'dotenv';

dotenv.config();

// HTTPS Functions
export const items = functions.https.onRequest(requestItemApp);

// Auth Functions
export { validateSigninRequest } from './auth';

// Firestore Functions
export { sendEmailOnRequest, updateLinks } from './firestore';
