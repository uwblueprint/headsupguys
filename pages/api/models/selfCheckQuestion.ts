import { model, Schema } from "mongoose";

enum QuestionType {
    MULTIPLE_CHOICE = "multiple_choice",
    MULTI_SELECT = "multi_select",
}

interface SelfCheckQuestionInterface {
    _id: Schema.Types.ObjectId;
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
            type: [{ type: Schema.Types.Mixed, ref: "Options" }],
        },
        questionNumber: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: {
            currentTime: Date.now,
            updatedAt: "dateUpdated",
            createdAt: "dateCreated",
        },
    },
);

const SelfCheckQuestion = model("SelfCheckQuestion", SelfCheckQuestionSchema);

export { SelfCheckQuestion };
