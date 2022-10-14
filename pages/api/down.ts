import { NextApiRequest, NextApiResponse } from "next";
import { getManyFromUtilsFolder } from "../../server/database/MongoMethods";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const down = await getManyFromUtilsFolder('whats_down', {});
    res.status(200).json({ down })
}
