import { model, Schema } from "mongoose";
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
    tool: ToolInterface["_id"];
    slides: [SlideInterface["_id"]];
    status: StatusType;
    editing: boolean;
}

const ModuleSchema = new Schema<ModuleInterface>(
    {
        title: {
            type: String,
            required: true,
        },
        tool: {
            type: Schema.Types.ObjectId,
        },
        slides: {
            type: [{ type: Schema.Types.ObjectId, ref: "Slide" }],
        },
        status: {
            type: StatusType,
            default: "draft",
        },
        editing: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

const Module = model("Module", ModuleSchema);

export { Module, ModuleSchema };
