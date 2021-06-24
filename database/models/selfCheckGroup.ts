import { models, model, Schema, Types } from "mongoose";

interface SelfCheckGroupInterface {
    _id: Types.ObjectId;
    questionIDs: [Types.ObjectId];
}

const SelfCheckGroupSchema = new Schema<SelfCheckGroupInterface>(
    {
        questionIDs: {
            type: [{ type: Schema.Types.ObjectId, ref: "SelfCheckQuestion" }],
            default: [],
        },
    },
    {
        timestamps: true,
    },
);

const SelfCheckGroup =
    models.SelfCheckGroup ||
    model("SelfCheckGroup", SelfCheckGroupSchema, "self_check_groups");

export { SelfCheckGroup };
