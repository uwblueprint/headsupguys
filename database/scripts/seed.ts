/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config({ path: ".env.local" });
const MongoClient = require("mongodb").MongoClient;

(async function () {
    const client = new MongoClient(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        await client.connect();
        console.log("Successfully connected to database");

        const componentsCollection = client
            .db(process.env.MONGODB_DB)
            .collection("components");
        await componentsCollection.drop(); // destroy previous data
        await componentsCollection.insertMany(mockComponents(50));

        // TODO add data to other collections

        console.log("Successfully completed seeding");
        client.close();
    } catch (err) {
        console.log(err.stack);
    }
})(); // immediately-invoked function expression

function mockComponents(count) {
    const componentTypes = ["text", "video", "audio"];
    const components = [];

    for (let i = 0; i < count; i++) {
        components.push({
            type: componentTypes[i % componentTypes.length],
            properties: {},
        });
    }
    return components;
}
