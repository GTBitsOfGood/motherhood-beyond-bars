import { formatDate } from "@lib/date";
import { db } from "@lib/firebase";
import { formatDoc } from "@lib/firebase/getDoc";
import { Waiver } from "@lib/types";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";

interface Props {
  waivers: Waiver[];
}

export default function Waivers({ waivers }: Props) {
  const router = useRouter();
  return (
    <div className="p-10">
      <h1 className="font-bold text-2xl my-6">Waivers</h1>

      {/* <pre>{JSON.stringify(waivers, null, 2)}</pre> */}
      <table className="w-full overflow-hidden rounded-lg">
        {waivers.map((waiver, i) => (
          <tr
            className={`bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer ${
              i === waivers.length - 1 ? "" : "border-b border-gray-300"
            }`}
            key={waiver.id}
            onClick={() => {
              router.push(`/waivers/${waiver.id}`);
            }}
          >
            <td className=" text-gray-800 text-lg">{waiver.name}</td>
            <td className="uppercase font-semibold text-xs text-gray-600">
              {formatDate(waiver.lastUpdated)}
            </td>
            <td className="text-xs text-gray-600">{waiver.description}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const queryRef = query(collection(db, "waivers"), orderBy("order", "asc"));
  const allWaivers = (await getDocs(queryRef)).docs.map(formatDoc) as Waiver[];

  return {
    props: {
      waivers: allWaivers,
    },
  };
};
