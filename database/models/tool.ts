import { model, models, Schema, Types } from "mongoose";

enum StatusType {
    DRAFT = "draft",
    PUBLISHED = "published",
}

export interface ToolInterface {
    _id: Types.ObjectId;
    title: string;
    video: string;
    description: string;
    moduleID: Schema.Types.ObjectId;
    resources: [{ title: string; description: string; url: string }];
    selfCheckGroupID: Schema.Types.ObjectId;
    relatedToolsIDs: [Schema.Types.ObjectId];
    status: StatusType;
    editing: boolean;
    createdBy: string[];
    updatedAt: Date;
}

const ToolSchema = new Schema<ToolInterface>(
    {
        title: {
            type: String,
            required: true,
        },
        video: String,
        description: String,
        moduleID: { type: Schema.Types.ObjectId, ref: "Module", default: null },
        resources: [{ title: String, description: String, url: String }],
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
        updatedAt: String,
    },
    {
        timestamps: true,
    },
);

const Tool = models.Tool || model("Tool", ToolSchema);

export { Tool, ToolSchema };
