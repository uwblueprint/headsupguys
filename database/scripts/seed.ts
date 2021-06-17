/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config({ path: ".env.local" });
const MongoClient = require("mongodb").MongoClient;
const faker = require("faker");

// seed config
const FIRST_RUN = false;
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

        if (!FIRST_RUN) {
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

        await questionCollection.insertMany(mockQuestions(QUESTION_COUNT));
        await groupCollection.insertMany(mockGroups(GROUP_COUNT));
        await componentCollection.insertMany(mockComponents(COMPONENT_COUNT));
        await slideCollection.insertMany(mockSlides(SLIDE_COUNT));
        await moduleCollection.insertMany(mockModules(MODULE_COUNT));
        await toolCollection.insertMany(mockTools(TOOL_COUNT));

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
            question: faker.lorem.words() + faker.lorem.words() + "?",
            options: mockOptions[i % mockOptions.length],
            questionNumber: (i % QUESTIONS_PER_GROUP) + 1,
        });
    }
    return questions;
}

function mockGroups(count) {
    const groups = [];

    for (let i = 0; i < count; i++) {
        const questionIDs = [];

        for (let j = 0; j < QUESTIONS_PER_GROUP; j++) {
            questionIDs.push(i * QUESTIONS_PER_GROUP + j);
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

function mockModules(count) {
    const statusTypes = ["complete", "published", "draft"];
    const modules = [];

    for (let i = 0; i < count; i++) {
        const slideIDs = [];

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
function mockTools(count) {
    const statusTypes = ["published", "draft"];
    const modules = [];

    for (let i = 0; i < count; i++) {
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
            ],
            selfCheckGroupID: i < GROUP_COUNT ? i : null,
            relatedToolsIDs: i > 0 ? [0] : null,
            status: statusTypes[i % statusTypes.length],
            editing: i % statusTypes.length == 1,
        });
    }
    return modules;
}
