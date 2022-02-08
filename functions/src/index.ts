import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { EventContext, Request, Response } from "firebase-functions/v1";
import { UserRecord } from "firebase-functions/v1/auth";

admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

const db = admin.firestore();

export const helloWorld = functions.https.onRequest(
  (request: Request, response: Response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
  }
);

export const validateSigninRequest = functions.auth
  .user()
  .onCreate(async (user: UserRecord, context: EventContext) => {
    const authorizedEmails = await db.collection("app").doc("admin").get();

    if (authorizedEmails.data()?.whitelist.includes(user.email)) {
      // user is an admin
      await admin.auth().setCustomUserClaims(user.uid, { admin: true });
      console.log(`${user.email} - admin claim added`);
      return true;
    } else {
      // user is not an admin

      let babies: Baby[] = [];
      // check if user (caregiver) has baby associated to them
      const allBabies = await db.collection("babies").get();
      allBabies.docs.forEach(async (doc) => {
        if (user.email === doc.data().caregiverEmail) {
          babies.push(doc.data() as Baby);
        }
      });

      if (babies.length !== 0) {
        await admin.auth().setCustomUserClaims(user.uid, { caregiver: true });
      } else return false;
    }
  });

interface Baby {
  name: string;
  caregiverEmail: string;
}
