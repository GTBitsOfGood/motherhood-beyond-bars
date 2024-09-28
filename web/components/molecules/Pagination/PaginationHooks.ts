import { CollectionPath } from "@lib/types/db";
import { getTotalRecords } from "db/firebase/getSize";
import { useEffect, useState } from "react";

export function usePaginatedData<T>(fetchPage: (page: number, paginationReferences: Map<number, any>) => Promise<{ data: T[], paginationInfo: any }>, type: CollectionPath) {
    const [paginationReferences, setPaginationReferences] = useState<Map<number, any>>(new Map());
    const [currPage, setCurrPage] = useState(1);
    const [data, setData] = useState<T[]>([]);
    const [totalRecords, setTotalRecords] = useState<number>(0);

    const fetchTotalRecords = async () => {
        try {
            const numRecords = await getTotalRecords(type);
            if (numRecords) {
                setTotalRecords(numRecords);
            }
        } catch (error) {
            console.error('Error fetching records.');
        }
    };

    const updatePaginationReferences = async (paginationInfo: any) => {
        setPaginationReferences(prev => {
            const newRefs = new Map(prev);
            newRefs.set(currPage, paginationInfo);
            return newRefs;
        });
    };

    const fetchPageData = async () => {
        const newPageData = await fetchPage(currPage, paginationReferences);
        setData(newPageData.data);
        updatePaginationReferences(newPageData.paginationInfo);
    };

    useEffect(() => {
        fetchPageData();
        fetchTotalRecords();
    }, [currPage]);

    return {
        data,
        totalRecords,
        currPage,
        setCurrPage,
        onNextPage: () => setCurrPage(prev => prev + 1),
        onPrevPage: () => setCurrPage(prev => prev - 1)
    };
}
