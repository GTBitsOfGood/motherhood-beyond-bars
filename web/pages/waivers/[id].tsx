import { db } from "@lib/firebase";
import { formatDoc } from "@lib/firebase/getDoc";
import { Waiver } from "@lib/types";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

import { useState } from "react";
interface Props {
  waiver: Waiver;
}

type Params = {
  id: string;
} & ParsedUrlQuery;

export default function WaiverPage({ waiver }: Props) {
  return (
    <div className="p-10">
      <h1 className="font-bold text-2xl my-6">{waiver.name}</h1>
    </div>
  );
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const waiverRef = doc(db, "waivers", params?.id as string);
  const waiver = formatDoc<Waiver>(await getDoc(waiverRef));

  return {
    props: {
      waiver,
    },
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const queryRef = query(collection(db, "waivers"));
  const allWaivers = (await getDocs(queryRef)).docs.map(formatDoc) as Waiver[];
  return {
    paths: allWaivers.map((waiver) => ({
      params: {
        id: waiver.id,
      },
    })),
    fallback: false,
  };
};
