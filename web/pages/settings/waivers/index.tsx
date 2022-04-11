import { formatDate } from "@lib/date";
import { db } from "@lib/firebase";
import { formatDoc } from "@lib/firebase/getDoc";
import { Waiver } from "@lib/types";
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
} from "firebase/firestore";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";

interface Props {
  waivers: Waiver[];
}

export default function Waivers({ waivers }: Props) {
  const router = useRouter();
  return (
    <div className="">
      <div className="flex flex-row justify-between">
        <h1 className="font-bold text-2xl my-6">Waivers</h1>
        <button
          className={`p-2 bg-black  transition-colors text-white rounded-md m-4 px-6 `}
          onClick={async () => {
            const settingsRef = doc(db, "app", "settings");
            const newDoc = await addDoc(collection(settingsRef, "waivers"), {
              name: "New Waiver",
              content: "*Put the waiver body here*",
              lastUpdated: serverTimestamp(),
              description: "Waiver Description",
              order: waivers.length,
            } as Waiver);

            router.push(`settings/waivers/${newDoc.id}`);
          }}
        >
          + New
        </button>
      </div>

      {/* <pre>{JSON.stringify(waivers, null, 2)}</pre> */}
      <table className="w-full overflow-hidden rounded-lg">
        {waivers.map((waiver, i) => (
          <tr
            className={`bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer ${
              i === waivers.length - 1 ? "" : "border-b border-gray-300"
            }`}
            key={waiver.id}
            onClick={() => {
              router.push(`settings/waivers/${waiver.id}`);
            }}
          >
            <td className=" text-gray-800 text-lg">{waiver.name}</td>
            <td className="uppercase font-semibold text-xs text-gray-600">
              {formatDate(waiver.lastUpdated as string)}
            </td>
            <td className="text-xs text-gray-600">{waiver.description}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

// export const getStaticProps: GetStaticProps<Props> = async () => {
//   const queryRef = query(collection(db, "waivers"), orderBy("order", "asc"));
//   const allWaivers = (await getDocs(queryRef)).docs.map(formatDoc) as Waiver[];

//   console.log(allWaivers.length);

//   return {
//     props: {
//       waivers: allWaivers,
//     },
//   };
// };
