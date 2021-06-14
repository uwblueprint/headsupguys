/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config({ path: ".env.local" });
const MongoClient = require("mongodb").MongoClient;

const client = new MongoClient(process.env.MONGODB_URI, {
    useNewUrlParser: true,
});

(async function () {
    try {
        await client.connect();
        console.log("Successfully connected to server");

        const componentsCollection = client
            .db(process.env.MONGODB_DB)
            .collection("components");
        componentsCollection.drop(); // destroy previous data
        componentsCollection.insertMany(mockComponents(50));

        console.log("Successfully completed seeding");
        client.close();

        // TODO add data to other collections
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
