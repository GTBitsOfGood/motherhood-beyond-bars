// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.query.imageURL || !req.query.name) {
    res.status(200).json({ message: "Image URL and name required." });
  } else {
    const response = await fetch(req.query.imageURL as string);
    // get the file information from image url
    const resBlob = await response.blob();
    const resBufferArray = await resBlob.arrayBuffer();
    const resBuffer = Buffer.from(resBufferArray);
    if (!response.ok)
      throw new Error(`unexpected response ${response.statusText}`);
    // write the file to the response (should prompt user to download or open the file)
    res.setHeader("Content-Type", resBlob.type);
    res.setHeader("Content-Length", resBlob.size);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${
        req.query.name + "." + resBlob.type.split("/")[1]
      }`
    );
    res.write(resBuffer, "binary");
    res.end();
  }
}
