import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { EventContext, Request, Response } from "firebase-functions/v1";
import { UserRecord } from "firebase-functions/v1/auth";

admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest(
    (request: Request, response: Response) => {
        functions.logger.info("Hello logs!", { structuredData: true });
        response.send("Hello from Firebase!");
    }
);

export const validateSigninRequest = functions.auth
    .user()
    .onCreate(async (user: UserRecord, context: EventContext) => {
        const authorizedEmails = await admin
            .firestore()
            .collection("app")
            .doc("admin")
            .get();

        if (authorizedEmails.data()?.whitelist.includes(user.email)) {
            await admin.auth().setCustomUserClaims(user.uid, { admin: true });
            console.log(`${user.email} - admin claim added`);
            return true;
        } else {
            console.log(`${user.email} - admin claim not added`);
            return false;
        }
    });
