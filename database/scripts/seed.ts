import faker from "faker";
import { MongoClient } from "mongodb";
import { ComponentInterface, ComponentType } from "database/models/component";

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

        const components = [];
        const componentTypes = Object.keys(ComponentType).map(function (type) {
            return ComponentType[type];
        });

        for (let i = 0; i < 50; i++) {
            const component: ComponentInterface = {
                type: componentTypes[i % componentTypes.length],
                properties: {},
            };

            components.push(component);
        }
        collection.insertMany(components);

        console.log("Successfully completed seeding");
        client.close();
    } catch (err) {
        console.log(err.stack);
    }
}

seedDB();
