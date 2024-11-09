import { CollectionPath } from "@lib/types/db";

export const BABIES_COLLECTION_PATH = "babies";
export const CAREGIVERS_COLLECTION_PATH = "caregivers";

export const PAGINATION_PAGE_SIZE = 5;

export const COLLECTION_ORDER_KEYS: Record<CollectionPath, string> = {
  [BABIES_COLLECTION_PATH]: "firstName",
  [CAREGIVERS_COLLECTION_PATH]: "babyCount",
};
