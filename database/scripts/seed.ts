/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config({ path: ".env.local" });
const MongoClient = require("mongodb").MongoClient;
const faker = require("faker");

// seed config
const QUESTION_COUNT = 24;
const GROUP_COUNT = 5;
const COMPONENT_COUNT = 64;
const SLIDE_COUNT = 16;
const MODULE_COUNT = 3;
const TOOL_COUNT = 2;

const QUESTIONS_PER_GROUP = Math.floor(QUESTION_COUNT / GROUP_COUNT);
const COMPONENTS_PER_SLIDE = Math.floor(COMPONENT_COUNT / SLIDE_COUNT);
const SLIDES_PER_MODULE = Math.floor(SLIDE_COUNT / MODULE_COUNT);

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
        const moduleCollection = db.collection("Module");
        const toolCollection = db.collection("Tool");

        if (process.argv[2] != "--init") {
            // destroy previous data
            await Promise.all([
                questionCollection.drop(),
                groupCollection.drop(),
                componentCollection.drop(),
                slideCollection.drop(),
                moduleCollection.drop(),
                toolCollection.drop(),
            ]);
        }

        await Promise.all([
            questionCollection.insertMany(mockQuestions()),
            groupCollection.insertMany(mockGroups()),
            componentCollection.insertMany(mockComponents()),
            slideCollection.insertMany(mockSlides()),
            moduleCollection.insertMany(mockModules()),
            toolCollection.insertMany(mockTools()),
        ]);

        console.log("Successfully completed seeding");
        client.close();
    } catch (err) {
        console.log(err.stack);
    }
})(); // immediately-invoked function expression

function mockQuestions() {
    const questionTypes = ["multiple_choice", "multi_select"];
    const mockOptions = [
        [1, 2, 3],
        ["yes", "no", "maybe"],
    ];
    const questions = [];

    for (let i = 0; i < QUESTION_COUNT; i++) {
        questions.push({
            _id: i,
            type: questionTypes[i % questionTypes.length],
            question: faker.lorem.words() + faker.lorem.words() + "?",
            options: mockOptions[i % mockOptions.length],
            questionNumber: (i % QUESTIONS_PER_GROUP) + 1,
        });
    }
    return questions;
}

function mockGroups() {
    const groups = [];

    for (let i = 0; i < GROUP_COUNT; i++) {
        const questionIDs = [];
        // when QUESTIONS_PER_GROUP = 4:
        // id: 0   questionIDs: [ 0, 1, 2, 3 ]
        // id: 1   questionIDs: [ 4, 5, 6, 7 ]
        // id: 2   questionIDs: [ 8, 9, 10, 11 ]
        for (let j = 0; j < QUESTIONS_PER_GROUP; j++) {
            questionIDs.push(i * QUESTIONS_PER_GROUP + j);
        }

        groups.push({
            _id: i,
            questionIDs,
        });
    }
    return groups;
}

function mockComponents() {
    const componentTypes = ["text", "video", "audio"];
    const components = [];

    for (let i = 0; i < COMPONENT_COUNT; i++) {
        components.push({
            _id: i,
            type: componentTypes[i % componentTypes.length],
            properties: {},
        });
    }
    return components;
}

function mockSlides() {
    const slides = [];

    for (let i = 0; i < SLIDE_COUNT; i++) {
        const componentIDs = [];
        // when COMPONENTS_PER_SLIDE = 5:
        // id: 0   componentIDs: [ 0, 1, 2, 3, 4 ]
        // id: 1   componentIDs: [ 5, 6, 7, 8, 9 ]
        // id: 2   componentIDs: [ 10, 11, 12, 13, 14 ]
        for (let j = 0; j < COMPONENTS_PER_SLIDE; j++) {
            componentIDs.push(i * COMPONENTS_PER_SLIDE + j);
        }

        slides.push({
            _id: i,
            componentIDs,
            prevID: i > 0 ? i - 1 : null,
            nextID: i < SLIDE_COUNT - 1 ? i + 1 : null,
        });
    }
    return slides;
}

function mockModules() {
    const statusTypes = ["complete", "published", "draft"];
    const modules = [];

    for (let i = 0; i < MODULE_COUNT; i++) {
        const slideIDs = [];
        // when SLIDES_PER_MODULE = 5:
        // id: 0   slideIDs: [ 0, 1, 2, 3, 4 ]
        // id: 1   slideIDs: [ 5, 6, 7, 8, 9 ]
        // id: 2   slideIDs: [ 10, 11, 12, 13, 14 ]
        for (let j = 0; j < SLIDES_PER_MODULE; j++) {
            slideIDs.push(i * SLIDES_PER_MODULE + j);
        }

        modules.push({
            _id: i,
            title: faker.lorem.words(),
            toolID: i < TOOL_COUNT ? i : null,
            slideIDs,
            status: statusTypes[i % statusTypes.length],
            editing: i % statusTypes.length == 2,
        });
    }
    return modules;
}

function mockTools() {
    const statusTypes = ["published", "draft"];
    const modules = [];

    for (let i = 0; i < TOOL_COUNT; i++) {
        const slideIDs = [];

        for (let j = 0; j < SLIDES_PER_MODULE; j++) {
            slideIDs.push(i * SLIDES_PER_MODULE + j);
        }

        modules.push({
            _id: i,
            title: faker.lorem.words(),
            video: faker.internet.url(),
            description: faker.lorem.sentences(),
            moduleID: i < MODULE_COUNT ? i : null,
            resources: [
                {
                    title: faker.lorem.words(),
                    description: faker.lorem.sentences(),
                    url: faker.internet.url(),
                },
                {
                    title: faker.lorem.words(),
                    description: faker.lorem.sentences(),
                    url: faker.internet.url(),
                },
            ],
            selfCheckGroupID: i < GROUP_COUNT ? i : null,
            relatedToolsIDs: i > 0 ? [0] : null,
            status: statusTypes[i % statusTypes.length],
            editing: i % statusTypes.length == 1,
        });
    }
    return modules;
}
