import { CollectionPath } from "@lib/types/db";
import { COLLECTION_ORDER_KEYS, PAGINATION_PAGE_SIZE } from "db/consts";
import { limit, orderBy, QueryConstraint, startAfter } from "firebase/firestore";

export function getQueryConstraintsFromPagination(path: CollectionPath, pageNumber: number, paginationReferences: Map<number, any>): QueryConstraint[] {
    const constraints: QueryConstraint[] = [
        orderBy(COLLECTION_ORDER_KEYS[path]),
        limit(PAGINATION_PAGE_SIZE)
    ];

    if (pageNumber != 1 && paginationReferences) {
        const prevPage = paginationReferences.get(pageNumber - 1);
        if (prevPage?.startAfter) {
            constraints.push(startAfter(prevPage.startAfter));
        }
    }

    return constraints;
}
