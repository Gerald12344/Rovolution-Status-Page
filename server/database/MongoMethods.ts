import rovolutionAnalytica from './rovolutionAnalytica';

export async function inserToUtilsFolder(db: string, data: any) {
    let dbo = (await rovolutionAnalytica).db('utils').collection(db);
    await dbo.insertOne(data);
}

export async function deleteFromUtilsFolder(db: string, filter: any) {
    let dbo = (await rovolutionAnalytica).db('utils').collection(db);
    await dbo.deleteMany(filter);
}

export async function insertIfNoExists(db: string, data: any, filter: any) {
    let dbo = (await rovolutionAnalytica).db('utils').collection(db);
    await dbo.updateOne(filter, { $set: data }, { upsert: true });
}

export async function getManyFromUtilsFolder(db: string, filter: any) {
    let dbo = (await rovolutionAnalytica).db('utils').collection(db);
    return await dbo.find(filter, { projection: { _id: 0 } }).toArray();
}

export async function ClearOldDocumentsFromCache() {
    let dbo = (await rovolutionAnalytica).db('utils').collection('Cache');
    await dbo.deleteMany({
        createdAt: {
            $lt: new Date().getTime() - 1000 * 60 * 60 * 6,
        },
    });
}

export async function SendToCache(data: any) {
    await ClearOldDocumentsFromCache();
    let dbo = (await rovolutionAnalytica).db('utils').collection('cache');
    await dbo.insertOne(data);
}
export async function GetFromCache(filter: any, clear: boolean) {
    let dbo = (await rovolutionAnalytica).db('utils').collection('cache');
    await ClearOldDocumentsFromCache();
    let data = await dbo.find(filter).toArray();
    if (clear) {
        await dbo.deleteMany(filter);
    }

    return data[0];
}
