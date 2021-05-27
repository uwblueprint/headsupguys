import { Db, MongoClient } from "mongodb";

const { MONGODB_URI, MONGODB_DB } = process.env;

if (!MONGODB_URI) {
    throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local",
    );
}

if (!MONGODB_DB) {
    throw new Error(
        "Please define the MONGODB_DB environment variable inside .env.local",
    );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */

interface MongoConnection {
    client: MongoClient;
    db: Db;
}

interface MongoCache {
    conn: MongoConnection;
    promise: Promise<MongoConnection>;
}

// @ts-expect-error accessing global FIXME
let cached: MongoCache = global.mongo;
if (!cached) {
    // @ts-expect-error accessing global FIXME
    cached = global.mongo = { conn: null, promise: null };
}

export async function connectToDatabase(): Promise<MongoConnection> {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };

        cached.promise = MongoClient.connect(MONGODB_URI, opts).then(
            (client) => {
                return {
                    client,
                    db: client.db(MONGODB_DB),
                };
            },
        );
    }
    cached.conn = await cached.promise;
    return cached.conn;
}
