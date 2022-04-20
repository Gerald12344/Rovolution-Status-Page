import { Document } from 'mongodb';
import { NextApiRequest } from 'next';
import rovolutionAnalytica from './rovolutionAnalytica';

// Lets make this an object its easier
interface input {
    db: string;
    req: NextApiRequest;
    fetchValues: string[];
    pipeline: any;
    beforePipeLine?: any;
    group?: boolean;
    afterPipeLine?: any;
    diffDB?: string;
}

export async function CreateAndRunAggregation({
    db,
    req,
    pipeline,
    fetchValues,
    beforePipeLine,
    group,
    afterPipeLine,
    diffDB,
}: input): Promise<Document[]> {
    let ID = req.query.pid;
    let week = req.query.week;

    let buildValues = { timestamp: 1 };
    let currentDate = new Date();

    fetchValues.map((e) => {
        buildValues[e] = 1;
    });

    let mainPipeline: any = [
        {
            $match: {
                'data.projectId': ID,
                ...(week === 'true'
                    ? { timestamp: { $gte: new Date(currentDate.setDate(currentDate.getDate() - 7)) } }
                    : { timestamp: { $gte: new Date(currentDate.setFullYear(currentDate.getFullYear() - 1)) } }),
            },
        },
        {
            $project: {
                date: {
                    $dateToParts: { date: '$timestamp' },
                },
                date_iso: {
                    $dateToParts: { date: '$timestamp', iso8601: true },
                },

                // This is the only thing we need to fetch, looks cool but works :)
                ...buildValues,
            },
        },

        { $sort: { timestamp: -1 } },
    ];

    if (beforePipeLine) {
        mainPipeline.push(beforePipeLine);
    }

    if (group !== false) {
        mainPipeline.push({
            $group: {
                ...pipeline,
            },
        });
    }
    if (afterPipeLine) {
        mainPipeline.push(afterPipeLine);
    }

    // Perform aggregation on query
    let coll = (await rovolutionAnalytica).db(diffDB ?? 'RovolutionAnalytica').collection(db);
    let data = await coll.aggregate(mainPipeline).toArray();

    return data;
}

export function getOneYearAgo() {
    let currentDate = new Date();
    return new Date(currentDate.setFullYear(currentDate.getFullYear() - 1));
}
