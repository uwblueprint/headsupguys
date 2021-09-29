import { models, model, Schema, Types } from "mongoose";

interface SelfCheckGroupInterface {
    _id: Types.ObjectId;
    questionIDs: string[];
}

const SelfCheckGroupSchema = new Schema<SelfCheckGroupInterface>(
    {
        questionIDs: [String],
    },
    {
        timestamps: true,
    },
);

const SelfCheckGroup =
    models.SelfCheckGroup || model("SelfCheckGroup", SelfCheckGroupSchema);

export { SelfCheckGroup, SelfCheckGroupSchema };
