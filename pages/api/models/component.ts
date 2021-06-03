import { Document, model, Schema, Types } from "mongoose";

export enum ComponentType {
    TEXT = "text",
    VIDEO = "video",
    AUDIO = "audio",
}

export interface ComponentInterface {
    _id: Types.ObjectId;
    type: ComponentType;
    properties: any;
}

export type ComponentDocument = ComponentInterface & Document;

const ComponentSchema = new Schema<ComponentDocument>(
    {
        type: {
            type: ComponentType,
            required: true,
        },
        properties: {
            type: Schema.Types.Mixed,
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

export { Component, ComponentSchema };
