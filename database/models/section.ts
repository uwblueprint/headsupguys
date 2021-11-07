import { models, model, Schema, Types } from "mongoose";
enum SectionType {
    MARKDOWN = "markdown",
    MULTIPLECHOICE = "mc",
    MULTISELECT = "ms",
    SHORTANSWER = "sa",
}

export interface SectionInterface {
    _id: Types.ObjectId;
    type: SectionType;
    padding: string;
    markdown: string;
    alignment: string;
    properties: any;
}

const SectionSchema = new Schema<SectionInterface>(
    {
        type: {
            type: SectionType,
            required: true,
        },
        padding: {
            top: Number,
            bottom: Number,
            right: Number,
            left: Number,
        },
        markdown: {
            type: String,
        },
        alignment: {
            type: String,
        },
        properties: {
            type: Schema.Types.Mixed,
        },
    },
    {
        timestamps: true,
    },
);

export { SectionSchema };
