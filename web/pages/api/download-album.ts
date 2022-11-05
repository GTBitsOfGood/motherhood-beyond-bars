// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from '@lib/firebase';
import {
  collection,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  orderBy,
  query,
  Timestamp,
} from 'firebase/firestore';
import JSZip from 'jszip';
import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 } from 'uuid';

interface RawBabyImage {
  caption: string;
  date: Timestamp;
  imageURL: string;
  caregiverID: DocumentReference;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.query.babyId) {
    res.status(200).json({ message: 'baby ID required.' });
  } else {
    const babyBookRef = query(
      collection(db, `babies/${req.query.babyId}/book`)
    );
    const babyBookDocs = await getDocs(babyBookRef);
    const babyBooks = babyBookDocs.docs.map((doc) => ({
      id: v4(),
      ...(doc.data() as RawBabyImage),
    }));

    const responses = await Promise.all(
      babyBooks.map((babyBook) =>
        fetch(babyBook.imageURL)
          .then((res) => res.blob())
          .then((resBlob) => resBlob.arrayBuffer())
      )
    );
    const zip = new JSZip();
    for (let i = 0; i < responses.length; i++) {
      const response = responses[i];
      const babyBook = babyBooks[i];
      zip.file(babyBook.id, response);
    }
    const content = await zip.generateAsync({
      type: 'blob',
    });
    res.setHeader('Content-Type', content.type);
    res.setHeader('Content-Length', content.size);
    res.setHeader('Content-Disposition', `attachment; filename=babybook.zip`);
    res.write(Buffer.from(await content.arrayBuffer()), 'binary');
    res.end();
  }
}
