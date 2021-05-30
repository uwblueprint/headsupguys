import { model, Schema } from "mongoose";

enum StatusType {
    COMPLETE = "complete",
    DRAFT = "draft",
    PUBLISHED = "published",
}

export interface ModuleInterface {
    _id: Schema.Types.ObjectId;
    title: string;
    tool: Schema.Types.ObjectId;
    slides: [Schema.Types.ObjectId];
    status: StatusType;
    editing: boolean;
}

const ModuleSchema = new Schema<ModuleInterface>({
    title: {
        type: String,
        required: true,
    },
    tool: {
        type: Schema.Types.ObjectId,
    },
    slides: {
        type: [{ type: Schema.Types.ObjectId, ref: "Slides" }],
        default: [],
    },
    status: {
        type: StatusType,
    },
    editing: {
        type: Boolean,
    },
});

const Module = model("Module", ModuleSchema);

export { Module };
