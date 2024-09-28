import { BABIES_COLLECTION_PATH, CAREGIVERS_COLLECTION_PATH } from "db/consts"
import { DocumentData, QuerySnapshot } from "firebase/firestore";

export type CollectionPath = typeof BABIES_COLLECTION_PATH | typeof CAREGIVERS_COLLECTION_PATH;

export type FBDocs = QuerySnapshot<DocumentData>;