import { models, model, Schema, Types } from "mongoose";
enum ComponentType {
    TEXT = "text",
    VIDEO = "video",
    AUDIO = "audio",
}

export interface ComponentInterface {
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
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const Component = models.Component || model("Component", ComponentSchema);

export { Component, ComponentSchema };
