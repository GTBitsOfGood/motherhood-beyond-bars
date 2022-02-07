import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { EventContext, Request, Response } from "firebase-functions/v1";
import { UserRecord } from "firebase-functions/v1/auth";
import { auth } from "firebase-admin";

admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

const db = admin.firestore();

const configureAdminCustomClaims = async (uid: string, email: string) => {
  const authorizedEmails = await db.collection("app").doc("admin").get();

  if (authorizedEmails.data()?.whitelist.includes(email)) {
    await admin.auth().setCustomUserClaims(uid, { admin: true });
    console.log(`${email} - admin claim added`);
    return true;
  } else {
    await admin.auth().setCustomUserClaims(uid, { admin: false });
    console.log(`${email} - admin claim not added`);
    return false;
  }
};

export const validateSigninRequest = functions.auth
  .user()
  .onCreate(async (user: UserRecord, context: EventContext) => {
    configureAdminCustomClaims(user.uid, user.email as string);
  });

export const refreshAdminAccess = functions.firestore
  .document("app/admin")
  .onWrite(async (change, context) => {
    const authorizedEmails = change.after.data()?.whitelist;
    const before = change.before.data()?.whitelist;

    authorizedEmails
      .filter((email: string) => !before?.includes(email))
      .map(async (email: string) => {
        const uid = (await auth().getUserByEmail(email)).uid;
        configureAdminCustomClaims(uid, email);
      });

    before
      ?.filter((email: string) => !authorizedEmails?.includes(email))
      .map(async (email: string) => {
        const uid = (await auth().getUserByEmail(email)).uid;

        configureAdminCustomClaims(uid, email);
      });
  });

export const refreshCaregiverAccess = functions.firestore
  .document("babies/{babyId}")
  .onWrite(async (change, context) => {
    const after = change.after.data();
    const before = change.before.data();

    if (after?.caregiverEmail !== before?.caregiverEmail) {
      //   const email = change.after.data()?.caregiverEmail;
      //   const { uid } = await auth().getUserByEmail(email);
      //TODO: add admin to the app
    }
  });
