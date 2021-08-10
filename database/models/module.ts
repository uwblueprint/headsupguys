import { models, model, Schema } from "mongoose";
import { ToolInterface } from "./tool";
import { SlideInterface } from "./slide";

enum StatusType {
    COMPLETE = "complete",
    DRAFT = "draft",
    PUBLISHED = "published",
}

export interface ModuleInterface {
    _id: Schema.Types.ObjectId;
    title: string;

    toolID: ToolInterface["_id"];
    slideIDs: SlideInterface["_id"][];

    status: StatusType;
    editing: boolean;
    createdBy: string[],

}

const ModuleSchema = new Schema<ModuleInterface>(
    {
        title: {
            type: String,
            required: true,
        },
        toolID: {
            type: Schema.Types.ObjectId,
            default: null,
        },
        slideIDs: {
            type: [{ type: Schema.Types.ObjectId, ref: "Slide" }],
            default: [],
        },
        status: {
            type: StatusType,
            default: "draft",
        },
        editing: {
            type: Boolean,
            default: false,
        },
        createdBy: {
            type: [String],
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const Module = models.Module || model<ModuleInterface>("Module", ModuleSchema);

export { Module, ModuleSchema };
