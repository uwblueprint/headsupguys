/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config({ path: ".env.local" });
const MongoClient = require("mongodb").MongoClient;
const faker = require("faker");

// seed config
const FIRST_RUN = false;
const QUESTION_COUNT = 18;
const QUESTION_GROUP_SIZE = 5;

(async function () {
    const client = new MongoClient(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        await client.connect();
        console.log("Successfully connected to database");

        const db = client.db(process.env.MONGODB_DB);
        const componentsCollection = db.collection("components");
        const questionsCollection = db.collection("SelfCheckQuestion");
        const groupsCollection = db.collection("SelfCheckGroup");

        if (!FIRST_RUN) {
            // destroy previous data
            await Promise.all([
                questionsCollection.drop(),
                groupsCollection.drop(),
                componentsCollection.drop(),
            ]);
        }

        await questionsCollection.insertMany(mockQuestions(QUESTION_COUNT));
        await groupsCollection.insertMany(
            mockGroups(Math.floor(QUESTION_COUNT / QUESTION_GROUP_SIZE)),
        );

        await componentsCollection.insertMany(mockComponents(50));

        // TODO add data to other collections

        console.log("Successfully completed seeding");
        client.close();
    } catch (err) {
        console.log(err.stack);
    }
})(); // immediately-invoked function expression

function mockQuestions(count) {
    const questionTypes = ["multiple_choice", "multi_select"];
    const mockOptions = [
        [1, 2, 3],
        ["yes", "no", "maybe"],
    ];
    const questions = [];

    for (let i = 0; i < count; i++) {
        questions.push({
            _id: i,
            type: questionTypes[i % questionTypes.length],
            question: faker.lorem.sentence(),
            options: mockOptions[i % mockOptions.length],
            questionNumber: (i % QUESTION_GROUP_SIZE) + 1,
        });
    }
    return questions;
}

function mockGroups(count) {
    const groups = [];

    for (let i = 0; i < count; i++) {
        const questionIDs = [];

        for (let j = 0; j < QUESTION_GROUP_SIZE; j++) {
            questionIDs.push(i * QUESTION_GROUP_SIZE + j);
        }

        groups.push({ questionIDs });
    }
    return groups;
}

function mockComponents(count) {
    const componentTypes = ["text", "video", "audio"];
    const components = [];

    for (let i = 0; i < count; i++) {
        components.push({
            _id: i,
            type: componentTypes[i % componentTypes.length],
            properties: {},
        });
    }
    return components;
}
