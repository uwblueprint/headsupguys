import faker from "faker";
import { MongoClient } from "mongodb";
const { MONGODB_URI, MONGODB_DB } = process.env;

async function seedDB() {
    const client = new MongoClient(MONGODB_URI, {
        useNewUrlParser: true,
        // useUnifiedTopology: true,
    });

    try {
        await client.connect();
        console.log("Successfully connected to server");

        const collection = client.db(MONGODB_DB).collection("components");

        // The drop() command destroys all data from a collection.
        // Make sure you run it against proper database and collection.
        collection.drop();

        // CREATE SEED DATA

        console.log("Successfully completed seeding");
        client.close();
    } catch (err) {
        console.log(err.stack);
    }
}

seedDB();
