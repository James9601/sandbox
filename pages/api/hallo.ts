import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../libs/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   const user = await client.user.findMany({});
   console.log(user);
   res.status(200).send(user);
}
