import { db } from '@lib/firebase';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

type Link = {
  id: string;
  title: string;
  description: string;
  url: string;
};

export default function Links(props: { links: Link[] }) {
  const [links, setLinks] = useState<Link[]>(props.links);
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const createLink = async (link: any) => {
    await addDoc(collection(db, 'links'), {
      ...link,
      createdAt: serverTimestamp(),
    });

    refreshData();
  };

  const deleteLink = async (id: string) => {
    await deleteDoc(doc(db, 'links', id));
    setLinks(links.filter((l) => l.id !== id));
    refreshData();
  };

  const updateLink = async (
    id: any,
    title: string,
    description: string,
    url: string
  ) => {
    await updateDoc(doc(db, 'links', id), {
      title,
      description,
      url,
    });
    refreshData();
  };

  return <>links go here</>;
}
