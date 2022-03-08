import * as functions from "firebase-functions";
import * as nodemailer from "nodemailer";
import db from "../shared/db";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmailOnNewBaby = functions.firestore
  .document("babies/{babyId}")
  .onCreate(async (snap, _context) => {
    const baby = snap.data();

    const caregiver = (
      await db.collection("caregivers").doc(baby.caretaker).get()
    ).data();

    if (!caregiver) {
      console.error("No caregiver found for baby");
      return;
    }

    const message = `
      <h1>Hi ${caregiver.firstName}!</h1>
      <p>
        <strong>Good news!</strong>
        <br />
        You now have access to ${baby.firstName} ${baby.lastName}'s baby book.
      </p>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: caregiver.email,
      subject: "New Baby Added 👶",
      text: message,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  });

export default sendEmailOnNewBaby;
