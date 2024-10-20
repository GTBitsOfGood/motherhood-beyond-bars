// db/firebase/admin/index.js
import admin from "firebase-admin";
import config from "./config";

try {
  admin.initializeApp({
    credential: admin.credential.cert(config),
  });
} catch (error) {
  if (error instanceof Error && !/already exists/.test(error.message)) {
    console.error("Firebase admin initialization error", error.stack);
  }
}

export default admin;
