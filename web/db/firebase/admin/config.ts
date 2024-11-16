import { ServiceAccount } from "firebase-admin";

// Define the service account object with the correct types and camel-cased properties
const serviceAccount: ServiceAccount = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL!,
  privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n")!, // Handle escaped newlines in the private key
};

// Export the service account configuration
export default serviceAccount;
