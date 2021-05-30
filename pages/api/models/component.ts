import { model, Schema, Types } from "mongoose";

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

const ComponentSchema = new Schema<ComponentInterface>(
    {
        type: {
            type: ComponentType,
            required: true,
        },
        properties: {
            type: Schema.Types.Mixed,
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

export { Component };
