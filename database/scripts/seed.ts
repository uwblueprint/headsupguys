/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config({ path: ".env.local" });
const MongoClient = require("mongodb").MongoClient;
const faker = require("faker");

// seed config
const FIRST_RUN = true;

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

        const questionsCollection = client
            .db(process.env.MONGODB_DB)
            .collection("SelfCheckQuestion");

        if (!FIRST_RUN) {
            // destroy previous data
            await Promise.all([
                componentsCollection.drop(),
                questionsCollection.drop(),
            ]);
        }

        await componentsCollection.insertMany(mockComponents(50));
        await questionsCollection.insertMany(mockQuestions(18));

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

function mockQuestions(count) {
    const questionTypes = ["multiple_choice", "multi_select"];
    const mockOptions = [
        [1, 2, 3],
        ["yes", "no", "maybe"],
    ];
    const questions = [];

    for (let i = 0; i < count; i++) {
        questions.push({
            type: questionTypes[i % questionTypes.length],
            question: faker.lorem.sentence(),
            options: mockOptions[i % mockOptions.length],
            questionNumber: (i % 5) + 1,
        });
    }
    return questions;
}
