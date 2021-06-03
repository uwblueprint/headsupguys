import { model, Schema } from "mongoose";

interface SelfCheckGroupInterface {
    _id: Schema.Types.ObjectId;
    questionIDs: [Schema.Types.ObjectId];
}

const SelfCheckGroupSchema = new Schema<SelfCheckGroupInterface>(
    {
        questionIDs: {
            type: [{ type: Schema.Types.ObjectId, ref: "Questions" }],
            default: [],
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

const SelfCheckGroup = model("SelfCheckGroup", SelfCheckGroupSchema);

export { SelfCheckGroup };
