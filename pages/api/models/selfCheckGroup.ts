import { model, Schema, Types } from "mongoose";

interface SelfCheckGroupInterface {
    _id: Types.ObjectId;
    questionIDs: [Types.ObjectId];
}

const SelfCheckGroupSchema = new Schema<SelfCheckGroupInterface>(
    {
        questionIDs: {
            type: [{ type: Types.ObjectId, ref: "SelfCheckQuestion" }],
            default: [],
        },
    },
    {
        timestamps: true,
    },
);

const SelfCheckGroup = model("SelfCheckGroup", SelfCheckGroupSchema);

export { SelfCheckGroup };
