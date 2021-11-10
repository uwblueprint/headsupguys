import { models, model, Schema, Types } from "mongoose";
import { SelfCheckQuestionSchema } from "./selfCheckQuestion";

interface SelfCheckGroupInterface {
    _id: Types.ObjectId;
    questions: Record<string, unknown>[];
}

const SelfCheckGroupSchema = new Schema<SelfCheckGroupInterface>(
    {
        questions: [SelfCheckQuestionSchema],
    },
    {
        timestamps: true,
    },
);

const SelfCheckGroup =
    models.SelfCheckGroup ||
    model("SelfCheckGroup", SelfCheckGroupSchema, "self_check_groups");

export { SelfCheckGroup, SelfCheckGroupSchema };
