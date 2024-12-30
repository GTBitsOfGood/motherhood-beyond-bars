// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { decrypt } from "@lib/utils/encryption";
import { db } from "db/firebase";
import {
  collection,
  DocumentReference,
  getDocs,
  query,
  Timestamp,
} from "firebase/firestore";
import JSZip from "jszip";
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 } from "uuid";

interface RawBabyImage {
  caption: string;
  date: Timestamp;
  imageURL: string;
  caregiverID: DocumentReference;
}

export default async function downloadSelected(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.query.content || !req.query.iv || !req.query.ids) {
    res.status(200).json({ message: "baby ID, iv, and ids required." });
  } else {
    const babyId = decrypt({
      content: req.query.content as string,
      iv: req.query.iv as string,
    });

    const babyBookRef = query(collection(db, `babies/${babyId}/book`));
    const babyBookDocs = await getDocs(babyBookRef);
    const babyBooks = babyBookDocs.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        name: (data.caption !== "" ? data.caption : v4()) + ".png",
        ...(data as RawBabyImage),
      };
    });

    const ids = new Set(decodeURIComponent(req.query.ids as string).split(","));

    const responses = await Promise.all(
      babyBooks
        .filter((book) => ids.has(book.id))
        .map((babyBook) =>
          fetch(babyBook.imageURL)
            .then((res) => res.arrayBuffer())
            .then((data) => [babyBook, data] as const)
        )
    );

    if (responses.length === 1) {
      // Only selected 1 image to download, so don't bother ZIPing
      const [book, data] = responses[0];
      const url = new URL(book.imageURL);
      const fileExt = url.pathname.split(".").findLast(() => true);

      res.setHeader("Content-Type", `image/${fileExt}`);
      res.setHeader("Content-Length", data.byteLength);
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${book.name}.${fileExt}`
      );
      res.write(Buffer.from(data), "binary");
      res.end();
      return;
    }

    const zip = new JSZip();
    for (const [book, data] of responses) {
      zip.file(book.name, data);
    }

    const content = await zip.generateAsync({
      type: "blob",
    });
    res.setHeader("Content-Type", content.type);
    res.setHeader("Content-Length", content.size);
    res.setHeader("Content-Disposition", `attachment; filename=babybook.zip`);
    res.write(Buffer.from(await content.arrayBuffer()), "binary");
    res.end();
  }
}
