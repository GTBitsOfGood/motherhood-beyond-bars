import { Timestamp } from "@firebase/firestore";
import { BrowserWaiver } from "@lib/types/common";
import { caregiverFromAuthToken } from "db/actions/admin/Caregiver";
import { setSignedWaivers } from "db/actions/caregiver/Waiver";
import { NextApiRequest, NextApiResponse } from "next";

export default async function signWaiver(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const caregiver = await caregiverFromAuthToken(req.cookies.authToken);

  if (!caregiver) return res.status(403).json({ message: "Not authorized." });

  const waiver: BrowserWaiver = JSON.parse(req.body);
  setSignedWaivers(caregiver, {
    ...waiver,
    lastUpdated: Timestamp.fromDate(new Date(waiver.lastUpdated)),
  });

  res.status(200).json({ message: `Successfully signed "${waiver.name}"` });
}
