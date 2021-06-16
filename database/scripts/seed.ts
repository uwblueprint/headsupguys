/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config({ path: ".env.local" });
const MongoClient = require("mongodb").MongoClient;
const faker = require("faker");

// seed config
const FIRST_RUN = false;
const QUESTION_COUNT = 24;
const QUESTION_GROUP_SIZE = 5;
const COMPONENT_COUNT = 50;
const COMPONENTS_PER_SLIDE = 8;

(async function () {
    const client = new MongoClient(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        await client.connect();
        console.log("Successfully connected to database");

        const db = client.db(process.env.MONGODB_DB);
        const questionCollection = db.collection("SelfCheckQuestion");
        const groupCollection = db.collection("SelfCheckGroup");
        const componentCollection = db.collection("Component");
        const slideCollection = db.collection("Slide");

        if (!FIRST_RUN) {
            // destroy previous data
            await Promise.all([
                questionCollection.drop(),
                groupCollection.drop(),
                componentCollection.drop(),
                slideCollection.drop(),
            ]);
        }

        await questionCollection.insertMany(mockQuestions(QUESTION_COUNT));
        await groupCollection.insertMany(
            mockGroups(Math.floor(QUESTION_COUNT / QUESTION_GROUP_SIZE)),
        );

        await componentCollection.insertMany(mockComponents(COMPONENT_COUNT));
        await slideCollection.insertMany(
            mockSlides(Math.floor(COMPONENT_COUNT / COMPONENTS_PER_SLIDE)),
        );

        // TODO add data for other collections

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

function mockSlides(count) {
    const slides = [];

    for (let i = 0; i < count; i++) {
        const componentIDs = [];

        for (let j = 0; j < COMPONENTS_PER_SLIDE; j++) {
            componentIDs.push(i * COMPONENTS_PER_SLIDE + j);
        }

        slides.push({
            _id: i,
            componentIDs,
            prevID: i > 0 ? i - 1 : null,
            nextID: i < count - 1 ? i + 1 : null,
        });
    }
    return slides;
}
