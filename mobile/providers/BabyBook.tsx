import {
  query,
  collection,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import React from "react";
import { useContext, useEffect, useState } from "react";
import { db } from "../config/firebase";
import { Book } from "../types";
import { BabyContext } from "./Baby";

const BabyBookContext = React.createContext<Book[]>([]);

export const BabyBookProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [book, setBook] = useState<Book[]>([]);
  const babyContext = useContext(BabyContext);

  useEffect(() => {
    let unsubscribe: () => void;
    async function fetchBook() {
      if (babyContext != null) {
        const queryRef = query(
          collection(db, "babies", babyContext.id, "book"),
          orderBy("date", "desc"),
          limit(10)
        );
        unsubscribe = onSnapshot(queryRef, (snapshot) => {
          const books = snapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id } as unknown as Book;
          });

          setBook(books);
        });
        console.log("here");
      }
    }
    fetchBook();

    return () => {
      unsubscribe?.();
    };
  }, []);

  return (
    <BabyBookContext.Provider value={book}>{children}</BabyBookContext.Provider>
  );
};

export function useBabyBook() {
  return useContext(BabyBookContext);
}
