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
    linkedModuleID: Schema.Types.ObjectId;
    relatedResources: [{ title: string; url: string }];
    relatedStories: [{ title: string; url: string }];
    externalResources: [{ title: string; url: string }];
    selfCheckGroupID: Schema.Types.ObjectId;
    relatedToolsIDs: [Schema.Types.ObjectId];
    status: StatusType;
    editing: boolean;
    createdBy: string[];
}

const ToolSchema = new Schema<ToolInterface>(
    {
        title: {
            type: String,
            required: true,
        },
        thumbnail: String,
        type: String,
        video: String,
        description: String,
        linkedModuleID: {
            type: Schema.Types.ObjectId,
            ref: "Module",
            default: null,
        },
        relatedResources: [{ title: String, url: String }],
        relatedStories: [{ title: String, url: String }],
        externalResources: [{ title: String, url: String }],
        selfCheckGroupID: {
            type: Schema.Types.ObjectId,
            ref: "SelfCheckGroup",
        },
        relatedToolsIDs: [
            {
                type: Schema.Types.ObjectId,
                ref: "Tool",
            },
        ],
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
