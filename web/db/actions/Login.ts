import {
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
} from 'firebase/auth';

import { SubmitHandler } from 'react-hook-form';

import { auth } from 'db/firebase';
import { AuthFormValues } from '@lib/types/common';

export const loginWithCredentials: SubmitHandler<AuthFormValues> = async (
	data,
) => {
	try {
		// TODO redirect user to correct home page with /admin or /caregiver
		// probably by checking if the login was successful then using router to route
		await signInWithEmailAndPassword(auth, data.email, data.password);
	} catch (error) {
		console.error(error);
		alert('Invalid credentials!');
	}
};

export const loginWithGoogle = async () => {
	await signInWithPopup(auth, new GoogleAuthProvider());
};
