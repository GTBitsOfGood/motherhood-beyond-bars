import { formatPhoneNumber } from "./contactInfo";
import { FBDocs } from "@lib/types/db";

export default async function getCaregiversFromCaregiverDocs(
  caregiverDocs: FBDocs
) {
  // TODO update for multiple children
  const caregivers = await Promise.all(
    caregiverDocs?.docs.map(async (doc) => {
      const data = doc.data();
      const children = data.babies;
      return {
        id: doc.id,
        name: data.firstName + " " + data.lastName,
        email: data.email || "N/A",
        phone:
          (data.phoneNumber && formatPhoneNumber(data.phoneNumber)) || "N/A",
        registeredDate: data.createdAt
          ? data.createdAt.toDate().toLocaleDateString()
          : null,
        assigned: children && children.length > 0 ? true : false,
        address: `${data.address}, ${
          data.apartment ? `${data.apartment}, ` : ""
        }${data.city}, ${data.state}`,
        prefferedCommunication: data.prefferedCommunication || "N/A",
        babies: children,
        houseHoldInfo: `${data.numAdults} adults, ${data.numChildren} children`,
        // liabilityWaiver: data.signedWaivers?.at(-1).id || null,
        liabilityWaiver: "",
        createdAt: data.createdAt,
      };
    })
  );
  return caregivers;
}
