import { model, Schema } from "mongoose";

enum QuestionType {
    //Revisit - add more types
    MULTIPLE_CHOICE = "multiple_choice",
    MULTI_SELECT = "multi_select",
    SHORT_ANSWER = "short_answer",
    LONG_ANSWER = "long_answer",
}

interface SelfCheckQuestionInterface {
    _id: Schema.Types.ObjectId;
    type: QuestionType;
    question: string;
    options: [Schema.Types.Mixed]; //Type of questions
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
