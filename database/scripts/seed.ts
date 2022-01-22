/* eslint-disable @typescript-eslint/no-var-requires */
import mongoose from "mongoose";
require("dotenv").config({ path: ".env.local" });
const ObjectId = require("mongodb").ObjectId;
const faker = require("faker");

// import { Section as sectionCollection } from "../models/section";
import { Module as moduleCollection } from "../models/module";
import { Slide as slideCollection } from "../models/slide";
import { Tool as toolCollection } from "../models/tool";
import { SelfCheckGroup as groupCollection } from "../models/selfCheckGroup";
import { SelfCheckQuestion as questionCollection } from "../models/selfCheckQuestion";
import { User as userCollection } from "../models/user";

// seed config
const QUESTION_COUNT = 24;
const GROUP_COUNT = 5;
const SECTION_COUNT = 60;
const SLIDE_COUNT = 20;
const MODULE_COUNT = 5;
const TOOL_COUNT = 4;
const USER_COUNT = 5;

const QUESTIONS_PER_GROUP = Math.floor(QUESTION_COUNT / GROUP_COUNT);
const SECTIONS_PER_SLIDE = Math.floor(SECTION_COUNT / SLIDE_COUNT);
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
                // db.collection("components").drop(),
                // db.collection("sections").drop(),
                db.collection("slides").drop(),
                db.collection("modules").drop(),
                db.collection("tools").drop(),
                db.collection("users").drop(),
            ]);
            console.log("Successfully cleared database");
        }

        const groups = await groupCollection.insertMany(mockGroups());
        const groupIDs = groups.map((x) => x._id);

        // const sections = await sectionCollection.insertMany(
        //     mockSections(),
        // );
        const sections = mockSections();
        // const sectionIDs = sections.map((x) => x._id);

        const slides = await slideCollection.insertMany(mockSlides(sections));
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
    const questionTypes = [
        "multiple_choice",
        "multi_select",
        "short_answer",
        "long_answer",
        "slider",
    ];
    const mockOptions = [
        [
            ["yes", 1],
            ["no", 2],
            ["maybe", 3],
        ],
        [
            ["bad", 0],
            ["okay", 2],
            ["good", 4],
        ],
    ];

    const alphanumericOptions = [true, false];

    const questions = [];

    for (let i = 0; i < QUESTION_COUNT; i++) {
        questions.push({
            type: questionTypes[i % questionTypes.length],
            question: faker.lorem.words() + faker.lorem.words() + "?",
            options: mockOptions[i % mockOptions.length],
            alphanumericInput:
                alphanumericOptions[i % alphanumericOptions.length],
            questionNumber: (i % QUESTIONS_PER_GROUP) + 1,
        });
    }
    return questions;
}

function mockGroups() {
    const groups = [];
    const questions = mockQuestions();
    for (let i = 0; i < GROUP_COUNT; i++) {
        groups.push({
            questions: questions.slice(
                QUESTIONS_PER_GROUP * i,
                QUESTIONS_PER_GROUP * (i + 1),
            ),
        });
    }
    return groups;
}

function mockSections() {
    const sectionTypes = ["markdown", "mc", "ms", "sa"];
    const paddingTypes = ["top", "right", "bottom", "left"];
    const sections = [];

    for (let i = 0; i < SECTION_COUNT; i++) {
        sections.push({
            type: sectionTypes[i % sectionTypes.length],
            padding: paddingTypes[i % paddingTypes.length],
            markdown: " ",
            multipleChoice: {},
            multiSelect: {},
            alignment: " ",
            properties: {},
        });
    }
    return sections;
}

function mockSlides(sections) {
    const slides = [];

    for (let i = 0; i < SLIDE_COUNT; i++) {
        slides.push({
            // componentIDs: componentIDs.slice(
            //     COMPONENTS_PER_SLIDE * i,
            //     COMPONENTS_PER_SLIDE * (i + 1),
            // ),
            sections: sections.slice(
                SECTIONS_PER_SLIDE * i,
                SECTIONS_PER_SLIDE * (i + 1),
            ),
            buttons: {
                save: !!(i % 2),
                print: !!(i % 3),
                previous: !!(i > 0),
                next: !!(i < SLIDE_COUNT + 1),
            },
            progressBarEnabled: !!(i % 2),
            checkpoint: !!(i % 3),
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
    const toolTypes = ["Problem", "Skill"];
    const tools = [];

    for (let i = 0; i < TOOL_COUNT; i++) {
        const relatedToolsIDs = [];
        while (
            relatedToolsIDs.length < 3 // generate random number of related tools between 0 and (TOOL_COUNT - 1)
        ) {
            const index = Math.floor(Math.random() * TOOL_COUNT);
            // prevent a tool from relating to itself and another tool multiple times
            if (
                index != i &&
                relatedToolsIDs.indexOf(String(toolIDs[index])) === -1
            ) {
                relatedToolsIDs.push(String(toolIDs[index]));
            } else {
                relatedToolsIDs.push("");
            }
        }

        tools.push({
            _id: toolIDs[i],
            title: faker.lorem.words(),
            thumbnail: faker.internet.url(),
            type: toolTypes[i % toolTypes.length],
            video: faker.internet.url(),
            description: faker.lorem.sentences(),
            linkedModuleID: i < MODULE_COUNT ? String(moduleIDs[i]) : undefined,
            relatedResources: [
                [faker.lorem.words(), faker.internet.url()],
                [faker.lorem.words(), faker.internet.url()],
                [faker.lorem.words(), faker.internet.url()],
            ],

            relatedStories: [
                [faker.lorem.words(), faker.internet.url()],
                [faker.lorem.words(), faker.internet.url()],
                [faker.lorem.words(), faker.internet.url()],
            ],
            externalResources: [
                [faker.lorem.words(), faker.internet.url()],
                [faker.lorem.words(), faker.internet.url()],
                [faker.lorem.words(), faker.internet.url()],
            ],
            selfCheckGroupID: i < GROUP_COUNT ? String(groupIDs[i]) : null,
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
