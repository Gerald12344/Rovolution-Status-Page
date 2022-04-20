import { MongoClient } from 'mongodb';

let rovolutionAnalytica: Promise<MongoClient> = null;
let client: MongoClient = null;

if (!process.env.MONGODB_ANALYTICA) {
    throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._RovolutionAnalyticaPromise) {
        client = new MongoClient(process.env.MONGODB_ANALYTICA);
        global._RovolutionAnalyticaPromise = client.connect();
    }
    rovolutionAnalytica = global._RovolutionAnalyticaPromise;
} else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(process.env.MONGODB_ANALYTICA);
    rovolutionAnalytica = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default rovolutionAnalytica;
