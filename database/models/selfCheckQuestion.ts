import { models, model, Schema, Types } from "mongoose";

enum QuestionType {
    MULTIPLE_CHOICE = "multiple_choice",
    MULTI_SELECT = "multi_select",
}

export interface SelfCheckQuestionInterface {
    _id: Types.ObjectId;
    type: QuestionType;
    question: string;
    options: [Schema.Types.Mixed];
    questionNumber: number;
}

const SelfCheckQuestionSchema = new Schema<SelfCheckQuestionInterface>(
    {
        type: {
            type: String,
            enum: Object.values(QuestionType),
            required: true,
        },
        question: {
            type: String,
            required: true,
            trim: true,
        },
        options: {
            type: [Schema.Types.Mixed],
            default: [],
        },
        questionNumber: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const SelfCheckQuestion =
    models.SelfCheckQuestion ||
    model("SelfCheckQuestion", SelfCheckQuestionSchema, "self_check_questions");

export { SelfCheckQuestion, QuestionType, SelfCheckQuestionSchema };
