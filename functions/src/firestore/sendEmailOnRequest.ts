import * as functions from 'firebase-functions';
import * as nodemailer from 'nodemailer';
import { receiverEmails } from '../config/emails';
import db from '../shared/db';

const arrayDiff = (a1: Array<any>, a2: Array<any>) =>
	a1.filter((x) => !a2.includes(x));

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
});

const sendEmailOnRequest = functions.firestore
	.document('app/requestItems')
	.onUpdate(async (change, context) => {
		const newValue = change.after.data();

		const previousValue = change.before.data();

		const diff = arrayDiff(previousValue.requests, newValue.requests);

		const user = await db.collection('caregivers').doc(diff[0].user).get();

		const message = `
      <h1>New Items Request</h1>
      <p>
        There are new items requested.
        <br />
        Requested by: ${user.data()?.name || 'Unknown'}
      </p>
      <p>
        ${diff.map((item) => `${item.name} - ${item.quantity}`).join('<br>')}
      </p>
    `;

		const mailOptions = {
			from: process.env.EMAIL_USER,
			to: receiverEmails.join(' '),
			subject: 'New Items Request',
			text: message,
		};

		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log('Email sent: ' + info.response);
			}
		});
	});

export default sendEmailOnRequest;
