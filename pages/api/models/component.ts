import { Document, model, Schema, Types } from "mongoose";

enum ComponentType {
    TEXT = "text",
    VIDEO = "video",
    AUDIO = "audio",
}

interface ComponentInterface {
    _id: Types.ObjectId;
    type: ComponentType;
    properties: any;
}

type ComponentDocument = ComponentInterface & Document;

const ComponentSchema = new Schema<ComponentDocument>(
    {
        type: {
            type: ComponentType,
            required: true,
        },
        properties: {
            type: any,
            required: false,
        },
    },
    {
        timestamps: {
            currentTime: Date.now,
            updatedAt: "dateUpdated",
            createdAt: "dateCreated",
        },
    },
);

const Component = model("Component", ComponentSchema);

export { Component, ComponentDocument, ComponentInterface };
