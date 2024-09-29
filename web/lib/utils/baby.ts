import { encrypt } from "./encryption";
import { Baby } from "@lib/types/baby";
import { FBDocs } from "@lib/types/db";

export default async function getBabiesFromBabyDocs(babyDocs: FBDocs) {
    const babies = await Promise.all(
        babyDocs?.docs.map((babyDoc) => {
          const data = babyDoc.data() as Baby;
    
          const { iv, content } = encrypt(babyDoc.id);
    
          return {
            id: babyDoc.id,
            firstName: data.firstName,
            lastName: data.lastName,
            name: data?.firstName ?? "" + " " + data?.lastName ?? "",
            motherName: data?.motherName || null,
            birthday: data?.dob,
            sex: data?.sex || null,
            babyBook: `/admin/book/${content}?iv=${iv}`,
            hospitalName: data?.hospitalName,
            caretakerID: data?.caretakerID,
            caretakerName: data?.caretakerName
          };
        })
      );
    
    return babies;
}