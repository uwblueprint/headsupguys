import { model, Schema, Types } from "mongoose";

enum QuestionType {
    MULTIPLE_CHOICE = "multiple_choice",
    MULTI_SELECT = "multi_select",
}

interface SelfCheckQuestionInterface {
    _id: Types.ObjectId;
    type: QuestionType;
    question: string;
    options: [Schema.Types.Mixed];
    questionNumber: number;
}

const SelfCheckQuestionSchema = new Schema<SelfCheckQuestionInterface>(
    {
        type: {
            type: QuestionType,
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

const SelfCheckQuestion = model("SelfCheckQuestion", SelfCheckQuestionSchema);

export { SelfCheckQuestion };
