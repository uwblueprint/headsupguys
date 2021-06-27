/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config({ path: ".env.local" });
const MongoClient = require("mongodb").MongoClient;
const faker = require("faker");

// seed config
const QUESTION_COUNT = 24;
const GROUP_COUNT = 5;
const COMPONENT_COUNT = 60;
const SLIDE_COUNT = 20;
const MODULE_COUNT = 5;
const TOOL_COUNT = 4;

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
        const questionCollection = db.collection("self_check_questions");
        const groupCollection = db.collection("self_check_groups");
        const componentCollection = db.collection("components");
        const slideCollection = db.collection("slides");
        const moduleCollection = db.collection("modules");
        const toolCollection = db.collection("tools");

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

        const questions = await questionCollection.insertMany(mockQuestions());
        const questionIDs = questions.ops.map((x) => x._id);

        const groups = await groupCollection.insertMany(
            mockGroups(questionIDs),
        );
        const groupIDs = groups.ops.map((x) => x._id);

        await componentCollection.insertMany(mockComponents());
        await slideCollection.insertMany(mockSlides());
        await moduleCollection.insertMany(mockModules());
        await toolCollection.insertMany(mockTools());

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
            type: questionTypes[i % questionTypes.length],
            question: faker.lorem.words() + faker.lorem.words() + "?",
            options: mockOptions[i % mockOptions.length],
            questionNumber: (i % QUESTIONS_PER_GROUP) + 1,
        });
    }
    return questions;
}

function mockGroups(questionIDs) {
    const groups = [];
    for (let i = 0; i < GROUP_COUNT; i++) {
        // when QUESTIONS_PER_GROUP = 4:
        // id: 0   questionIDs: [ questionIDs[0], questionIDs[1], questionIDs[2], questionIDs[3] ]
        // id: 1   questionIDs: [ questionIDs[4], questionIDs[5], questionIDs[6], questionIDs[7] ]
        // id: 2   questionIDs: [ questionIDs[8], questionIDs[9], questionIDs[10], questionIDs[11] ]
        groups.push({
            questionIDs: questionIDs.slice(
                QUESTIONS_PER_GROUP * i,
                QUESTIONS_PER_GROUP * (i + 1),
            ),
        });
    }
    return groups;
}

function mockComponents() {
    const componentTypes = ["text", "video", "audio"];
    const components = [];

    for (let i = 0; i < COMPONENT_COUNT; i++) {
        components.push({
            _id: i.toString(),
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
        // when COMPONENTS_PER_SLIDE = 3:
        // id: 0   componentIDs: [ 0, 1, 2 ]
        // id: 1   componentIDs: [ 3, 4, 5 ]
        // id: 2   componentIDs: [ 6, 7, 8 ]
        for (let j = 0; j < COMPONENTS_PER_SLIDE; j++) {
            componentIDs.push((i * COMPONENTS_PER_SLIDE + j).toString());
        }

        slides.push({
            _id: i.toString(),
            componentIDs,
            prevID: i > 0 ? (i - 1).toString() : null,
            nextID: i < SLIDE_COUNT - 1 ? (i + 1).toString() : null,
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
        // id: 0   slideIDs: [ '0', '1', '2', '3', '4' ]
        // id: 1   slideIDs: [ '5', '6', '7', '8', '9' ]
        // id: 2   slideIDs: [ '10', '11', '12', '13', '14' ]
        for (let j = 0; j < SLIDES_PER_MODULE; j++) {
            slideIDs.push((i * SLIDES_PER_MODULE + j).toString());
        }

        modules.push({
            _id: i.toString(),
            title: faker.lorem.words(),
            toolID: i < TOOL_COUNT ? i.toString() : null,
            slideIDs,
            status: statusTypes[i % statusTypes.length],
            editing: i == 2,
        });
    }
    return modules;
}

function mockTools() {
    const statusTypes = ["published", "draft"];
    const modules = [];

    for (let i = 0; i < TOOL_COUNT; i++) {
        const relatedToolsIDs = [];
        // generate random related tools:
        // id: 0   slideIDs: [ '3', '1' ]
        // id: 1   slideIDs: [ '0' ]
        // id: 2   slideIDs: []
        // id: 3   slideIDs: [ '1', '2', '0' ]
        while (
            relatedToolsIDs.length < Math.floor(Math.random() * TOOL_COUNT) // generate random number of related tools between 0 and (TOOL_COUNT - 1)
        ) {
            const toolID = Math.floor(Math.random() * TOOL_COUNT);
            // prevent a tool from relating to itself and another tool multiple times
            if (toolID != i && relatedToolsIDs.indexOf(toolID) === -1) {
                relatedToolsIDs.push(toolID.toString());
            }
        }

        modules.push({
            _id: i.toString(),
            title: faker.lorem.words(),
            video: faker.internet.url(),
            description: faker.lorem.sentences(),
            moduleID: i < MODULE_COUNT ? i.toString() : null,
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
            selfCheckGroupID: i < GROUP_COUNT ? i.toString() : null,
            relatedToolsIDs,
            status: statusTypes[i % statusTypes.length],
            editing: i == 1,
        });
    }
    return modules;
}
