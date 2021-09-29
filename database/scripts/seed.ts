/* eslint-disable @typescript-eslint/no-var-requires */
import mongoose from "mongoose";
require("dotenv").config({ path: ".env.local" });
const ObjectId = require("mongodb").ObjectId;
const faker = require("faker");

import { Component as componentCollection } from "../models/component";
import { Module as moduleCollection } from "../models/module";
import { Slide as slideCollection } from "../models/slide";
import { Tool as toolCollection } from "../models/tool";
import { SelfCheckGroup as groupCollection } from "../models/selfCheckGroup";
import { SelfCheckQuestion as questionCollection } from "../models/selfCheckQuestion";

// seed config
const QUESTION_COUNT = 24;
const GROUP_COUNT = 5;
const COMPONENT_COUNT = 60;
const SLIDE_COUNT = 20;
const MODULE_COUNT = 5;
const TOOL_COUNT = 4;
const USER_COUNT = 5;

const QUESTIONS_PER_GROUP = Math.floor(QUESTION_COUNT / GROUP_COUNT);
const COMPONENTS_PER_SLIDE = Math.floor(COMPONENT_COUNT / SLIDE_COUNT);
const SLIDES_PER_MODULE = Math.floor(SLIDE_COUNT / MODULE_COUNT);

(async function () {
    await mongoose
        .connect(process.env.MONGODB_URI, {
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
            useNewUrlParser: true,
        })
        .then(() => console.log("Successfully connected to database"))
        .catch((err) => console.log(err));

    try {
        if (process.argv[2] != "--init") {
            // destroy previous data
            const db = mongoose.connection.db;
            await Promise.all([
                db.collection("self_check_questions").drop(),
                db.collection("self_check_groups").drop(),
                db.collection("components").drop(),
                db.collection("slides").drop(),
                db.collection("modules").drop(),
                db.collection("tools").drop(),
            ]);
            console.log("Successfully cleared database");
        }

        const questions = await questionCollection.insertMany(mockQuestions());
        const questionIDs = questions.map((x) => x._id);

        const groups = await groupCollection.insertMany(
            mockGroups(questionIDs),
        );
        const groupIDs = groups.map((x) => x._id);

        const components = await componentCollection.insertMany(
            mockComponents(),
        );
        const componentIDs = components.map((x) => x._id);

        const slides = await slideCollection.insertMany(
            mockSlides(componentIDs),
        );
        const slideIDs = (slides as any[]).map((x) => x._id);

        // need to generate toolIDs beforehand to avoid a circular dependency
        const toolIDs = [];
        for (let i = 0; i < TOOL_COUNT; i++) {
            toolIDs[i] = ObjectId();
        }

        const modules = await moduleCollection.insertMany(
            mockModules(slideIDs, toolIDs),
        );
        const moduleIDs = (modules as any[]).map((x) => x._id);

        await toolCollection.insertMany(
            mockTools(moduleIDs, groupIDs, toolIDs),
        );

        await userCollection.insertMany(mockUsers());

        console.log("Successfully completed seeding");
        mongoose.connection.close();
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
            type: componentTypes[i % componentTypes.length],
            properties: {},
        });
    }
    return components;
}

function mockSlides(componentIDs) {
    const slides = [];

    for (let i = 0; i < SLIDE_COUNT; i++) {
        slides.push({
            componentIDs: componentIDs.slice(
                COMPONENTS_PER_SLIDE * i,
                COMPONENTS_PER_SLIDE * (i + 1),
            ),
        });
    }
    return slides;
}

function mockModules(slideIDs, toolIDs) {
    const statusTypes = ["complete", "published", "draft"];
    const modules = [];

    for (let i = 0; i < MODULE_COUNT; i++) {
        modules.push({
            title: faker.lorem.words(),
            slideIDs: slideIDs.slice(
                SLIDES_PER_MODULE * i,
                SLIDES_PER_MODULE * (i + 1),
            ),
            status: statusTypes[i % statusTypes.length],
            editing: i == 2,
            createdBy: ["John Doe"],
            toolID: i < TOOL_COUNT ? toolIDs[i] : null,
        });
    }
    return modules;
}

function mockTools(moduleIDs, groupIDs, toolIDs) {
    const statusTypes = ["published", "draft"];
    const tools = [];

    for (let i = 0; i < TOOL_COUNT; i++) {
        const relatedToolsIDs = [];
        while (
            relatedToolsIDs.length < Math.floor(Math.random() * TOOL_COUNT) // generate random number of related tools between 0 and (TOOL_COUNT - 1)
        ) {
            const index = Math.floor(Math.random() * TOOL_COUNT);
            // prevent a tool from relating to itself and another tool multiple times
            if (index != i && relatedToolsIDs.indexOf(toolIDs[index]) === -1) {
                relatedToolsIDs.push(toolIDs[index]);
            }
        }

        tools.push({
            _id: toolIDs[i],
            title: faker.lorem.words(),
            video: faker.internet.url(),
            description: faker.lorem.sentences(),
            moduleID: i < MODULE_COUNT ? moduleIDs[i] : null,
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
            selfCheckGroupID: i < GROUP_COUNT ? groupIDs[i] : null,
            relatedToolsIDs,
            status: statusTypes[i % statusTypes.length],
            editing: i == 1,
            createdBy: ["John Doe"],
        });
    }
    return tools;
}

function mockUsers() {
    const userTypes = ["USER", "ADMIN", "SUPER ADMIN"];
    const users = [];

    for (let i = 0; i < USER_COUNT; i++) {
        users.push({
            email: faker.internet.email(),
            name: faker.name.findName(),
            role: userTypes[i % userTypes.length],
            waiverSigned: i == 0,
            demographicInfo: {},
        });
    }
    return users;
}
