import { model, models, Schema, Types } from "mongoose";

enum StatusType {
    DRAFT = "draft",
    PUBLISHED = "published",
}

export interface ToolInterface {
    _id: Types.ObjectId;
    title: string;
    thumnbnail: string;
    type: string;
    video: string;
    description: string;
    linkedModuleID: string;
    relatedResources: string[][];
    relatedStories: string[][];
    externalResources: string[][];
    selfCheckGroupID: string;
    relatedToolsIDs: string[];
    status: StatusType;
    editing: boolean;
    createdBy: string[];
}

const ToolSchema = new Schema<ToolInterface>(
    {
        title: {
            type: String,
            default: "Untitled Tool",
            required: true,
        },
        thumbnail: { type: String, default: "" },
        type: { type: String, default: "" },
        video: { type: String, default: "" },
        description: { type: String, default: "" },
        linkedModuleID: { type: String, default: "" },
        relatedResources: [
            [String, String],
            [String, String],
            [String, String],
        ],
        relatedStories: [
            [String, String],
            [String, String],
            [String, String],
        ],
        externalResources: [
            [String, String],
            [String, String],
            [String, String],
        ],
        selfCheckGroupID: { type: String, default: "" },
        relatedToolsIDs: [{ type: String, default: "" }],
        status: {
            type: StatusType,
            default: StatusType.DRAFT,
        },
        editing: Boolean,
        createdBy: [String],
    },
    {
        timestamps: true,
    },
);

const Tool = models.Tool || model("Tool", ToolSchema);

export { Tool, ToolSchema };
