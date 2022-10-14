import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import { getManyFromUtilsFolder } from "../../server/database/MongoMethods";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    const down = await getManyFromUtilsFolder('whats_down', {});
    res.status(200).json({ down })
}
